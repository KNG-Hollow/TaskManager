package main

import (
	"log"
	"time"

	router "github.com/TaskManager/routers"
	"github.com/TaskManager/services"
	jwt "github.com/appleboy/gin-jwt/v3"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	engine := gin.Default()

	// JWT Middleware
	authMiddleware, err := jwt.New(services.InitJWT())
	if err != nil {
		log.Fatal("JWT Error:" + err.Error())
	}
	// Initialize JWT component
	errInit := authMiddleware.MiddlewareInit()
	if errInit != nil {
		log.Fatal("authMiddleware.MiddlewareInit() Error:" + errInit.Error())
	}

	// CORS Middleware
	corsConfig := cors.Config{
		AllowCredentials: true,
		AllowAllOrigins:  true,
		//AllowOrigins:  []string{"http://127.0.0.1", "https://127.0.0.1"}, // Adjust this to your React app's URL
		AllowMethods:  []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:  []string{"Origin", "Content-Type", "Authorization", "Accept", "AllowOrigins"},
		ExposeHeaders: []string{"Content-Length"},
		MaxAge:        12 * time.Hour,
	}
	engine.Use(cors.New(corsConfig))

	// Logger Middleware
	engine.Use(func(c *gin.Context) {
		log.Printf("Request: %s %s", c.Request.Method, c.Request.URL)
		c.Next()
		log.Printf("Response status: %d", c.Writer.Status())
	})

	// Security Headers
	engine.Use(func(c *gin.Context) {
		c.Header("X-Frame-Options", "DENY")
		c.Header("Content-Security-Policy", "default-src 'self'; connect-src *; font-src *; script-src-elem * 'unsafe-inline'; img-src * data:; style-src * 'unsafe-inline';")
		c.Header("X-XSS-Protection", "1; mode=block")
		c.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
		c.Header("Referrer-Policy", "strict-origin")
		c.Header("X-Content-Type-Options", "nosniff")
		c.Header("Permissions-Policy", "geolocation=(),midi=(),sync-xhr=(),microphone=(),camera=(),magnetometer=(),gyroscope=(),fullscreen=(self),payment=()")
		c.Next()
	})

	//server := router.InitRouter(engine)
	server := router.InitSecureRouter(engine, authMiddleware)

	//server.Run(":8081")		// HTTP Server
	err = server.RunTLS(":8443", "taskmanager-backend.crt", "taskmanager-backend.key")
	if err != nil {
		log.Fatal("Failed To Run Server: ", err)
	}
}
