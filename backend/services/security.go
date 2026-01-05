package services

import (
	"crypto/rand"
	"crypto/subtle"
	"encoding/base64"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/TaskManager/models"
	jwt "github.com/appleboy/gin-jwt/v3"
	"github.com/gin-gonic/gin"
	gojwt "github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/argon2"
)

type Argon2Config struct {
	HashRaw    []byte
	Salt       []byte
	TimeCost   uint32
	MemoryCost uint32
	Threads    uint8
	KeyLength  uint32
}

func generateCryptographicSalt(saltSize uint32) ([]byte, error) {
	salt := make([]byte, saltSize)
	_, err := rand.Read(salt)
	if err != nil {
		return nil, fmt.Errorf("salt generation failed: %w", err)
	}
	return salt, nil
}

func hashPassword(password string) (string, error) {
	config := &Argon2Config{
		TimeCost:   2,
		MemoryCost: 64 * 1024,
		Threads:    4,
		KeyLength:  32,
	}

	salt, err := generateCryptographicSalt(16)
	if err != nil {
		return "", fmt.Errorf("password hashing failed: %w", err)
	}
	config.Salt = salt

	config.HashRaw = argon2.IDKey(
		[]byte(password),
		config.Salt,
		config.TimeCost,
		config.MemoryCost,
		config.Threads,
		config.KeyLength,
	)

	encodedHash := fmt.Sprintf(
		"$argon2id$v=%d$m=%d,t=%d,p=%d$%s$%s",
		argon2.Version,
		config.MemoryCost,
		config.TimeCost,
		config.Threads,
		base64.RawStdEncoding.EncodeToString(config.Salt),
		base64.RawStdEncoding.EncodeToString(config.HashRaw),
	)

	return encodedHash, nil
}

func parseArgon2Hash(encodedHash string) (*Argon2Config, error) {
	log.Printf("received hash %s\n", encodedHash)
	components := strings.Split(encodedHash, "$")
	if len(components) != 6 {
		return nil, errors.New("invalid hash format structure")
	}

	if !strings.HasPrefix(components[1], "argon2id") {
		return nil, errors.New("unsupported algorithm variant")
	}

	var version int
	fmt.Sscanf(components[2], "v=%d", &version)

	config := &Argon2Config{}
	fmt.Sscanf(components[3], "m=%d,t=%d,p=%d", &config.MemoryCost, &config.TimeCost, &config.Threads)

	salt, err := base64.RawStdEncoding.DecodeString(components[4])
	if err != nil {
		return nil, fmt.Errorf("salt decoding failed: %w", err)
	}
	config.Salt = salt

	hash, err := base64.RawStdEncoding.DecodeString(components[5])
	if err != nil {
		return nil, fmt.Errorf("hash decoding failed: %w", err)
	}
	config.HashRaw = hash
	config.KeyLength = uint32(len(hash))

	return config, nil
}

func verifyPassword(storedHash, providedPassword string) (bool, error) {
	config, err := parseArgon2Hash(storedHash)
	if err != nil {
		return false, fmt.Errorf("hash parsing failed: %w", err)
	}

	computedHash := argon2.IDKey(
		[]byte(providedPassword),
		config.Salt,
		config.TimeCost,
		config.MemoryCost,
		config.Threads,
		config.KeyLength,
	)

	match := subtle.ConstantTimeCompare(config.HashRaw, computedHash)

	if match == 0 {
		return false, fmt.Errorf("verification failed: match returned false")
	}
	return true, nil
}

func ValidateLogin(username string, password string) (*models.Account, error) {
	db, err := Connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	fmt.Println("Attempting To [Authorize] Account:", username)
	results, err := db.Query("SELECT * FROM account WHERE username=?", username)
	if err != nil {
		log.Panicln("Failed To Find Account", err.Error())
	}

	account := &models.Account{}
	var adminBit []byte
	var activeBit []byte

	if results.Next() {
		err = results.Scan(
			&account.ID,
			&account.Name,
			&account.Username,
			&account.Password,
			&adminBit,
			&activeBit,
		)
		if err != nil {
			panic(err.Error())
		}
	} else {
		return nil, fmt.Errorf("failed to authenticate account with username: [%s]", username)
	}

	isValid, err := verifyPassword(account.Password, password)
	if err != nil {
		return nil, fmt.Errorf("authentication process failed: %w", err)
	}

	if !isValid {
		return nil, errors.New("authentication credentials invalid")
	}

	if len(adminBit) > 0 && adminBit[0] == 1 {
		account.Admin = true
	} else {
		account.Admin = false
	}

	if len(activeBit) > 0 && activeBit[0] == 1 {
		account.Active = true
	} else {
		account.Active = false
	}

	fmt.Println("Successfully [Authenticated] Account:", username)
	return account, nil
}

func boolToBit(b bool) []byte {
	if b {
		return []byte{1}
	}
	return []byte{0}
}

func InitJWT() *jwt.GinJWTMiddleware {
	jwtKey, err := os.ReadFile("taskmanager-jwt.key")
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("JWT KEY: %v", jwtKey)

	return &jwt.GinJWTMiddleware{
		Realm:       "gin jwt",
		Key:         jwtKey,
		Timeout:     time.Hour,
		MaxRefresh:  time.Hour,
		IdentityKey: "id",
		PayloadFunc: payloadFunc(),

		IdentityHandler: identityHandler(),
		Authenticator:   authenticator(),
		Authorizer:      authorizer(), // TODO
		Unauthorized:    unauthorized(),
		LogoutResponse:  logoutResponse(), // TODO
		TokenLookup:     "header: Authorization, query: token, cookie: jwt",
		// TokenLookup: "query:token",
		// TokenLookup: "cookie:token",
		TokenHeadName: "Bearer",
		TimeFunc:      time.Now,
	}
}

func payloadFunc() func(data any) gojwt.MapClaims {
	return func(data any) gojwt.MapClaims {
		if v, ok := data.(*models.Account); ok {
			return gojwt.MapClaims{
				"id":     v.ID,
				"name":   v.Name,
				"admin":  v.Admin,
				"active": v.Active,
			}
		}
		return gojwt.MapClaims{}
	}
}

func identityHandler() func(c *gin.Context) any {
	return func(c *gin.Context) any {
		claims := jwt.ExtractClaims(c)
		log.Printf("Claims extracted: %+v\n", claims)
		return &models.Account{
			ID:     int64(claims["id"].(float64)),
			Name:   claims["name"].(string),
			Admin:  claims["admin"].(bool),
			Active: claims["active"].(bool),
		}
	}
}

func authenticator() func(c *gin.Context) (any, error) {
	return func(c *gin.Context) (any, error) {
		var loginVals models.LoginDetails
		if err := c.ShouldBind(&loginVals); err != nil {
			return "", jwt.ErrMissingLoginValues
		}
		username := loginVals.Username
		password := loginVals.Password

		acc, err := ValidateLogin(username, password)
		if err != nil {
			log.Panicf("failed to authenticate account: %s\n%s", username, err.Error())
			return nil, err
		}

		if acc.Active {
			log.Printf("Authenticated User: %v\n", acc)
			return acc, nil
		}

		return nil, jwt.ErrFailedAuthentication
	}
}

func authorizer() func(c *gin.Context, data any) bool {
	return func(c *gin.Context, data any) bool {
		log.Println("Authorizer Received This Raw Data:", data)
		if v, ok := data.(*models.Account); ok {
			log.Printf("User ID: %d, Active: %v, Admin: %v\n", v.ID, v.Active, v.Admin)
			return v.Active
		}
		return false
	}
}

func unauthorized() func(c *gin.Context, code int, message string) {
	return func(c *gin.Context, code int, message string) {
		c.JSON(code, gin.H{
			"code":    code,
			"message": message,
		})
	}
}

func logoutResponse() func(c *gin.Context) {
	return func(c *gin.Context) {
		claims := jwt.ExtractClaims(c)
		user, exists := c.Get("id")

		response := gin.H{
			"code":    http.StatusOK,
			"message": "Successfully logged out",
		}

		if len(claims) > 0 {
			response["logged_out_user"] = claims["id"]
		}
		if exists {
			response["user_info"] = user.(*models.Account).Username
		}

		c.JSON(http.StatusOK, response)
	}
}
