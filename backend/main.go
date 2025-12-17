package main

import (
	"time"

	router "github.com/TaskManager/routers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Define CORS settings
	corsConfig := cors.Config{
		AllowAllOrigins: true,
		//AllowOrigins:     []string{"http://localhost:5173"}, // Adjust this to your React app's URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}

	// Use CORS middleware
	router := router.InitRouter()
	router.Use(cors.New(corsConfig))

	router.NoRoute(func(c *gin.Context) {
		if c.Request.Method == "OPTIONS" {
			c.Header("Access-Control-Allow-Origin", "*") // You can specify specific origins if needed
			c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
			c.Status(204) // No Content
		}
	})

	router.Run("0.0.0.0:8081")
}
