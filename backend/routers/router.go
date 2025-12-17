package routers

import (
	"net/http"
	"time"

	ctrl "github.com/TaskManager/controllers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	router := gin.Default()

	// Define CORS settings
	corsConfig := cors.Config{
		AllowAllOrigins: true,
		//AllowOrigins:     []string{"http://localhost:5173"}, // Adjust this to your React app's URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	router.Use(cors.New(corsConfig))

	router.POST("/api/auth", ctrl.ValidateLogin)
	router.POST("/api/accounts", ctrl.AddAccount)
	router.POST("/api/tasks", ctrl.AddTask)
	router.GET("/api/accounts", ctrl.GetAccounts)
	router.GET("/api/accounts/:id", ctrl.GetAccount)
	router.GET("/api/tasks", ctrl.GetTasks)
	router.GET("/api/tasks/:id", ctrl.GetTask)
	router.PUT("/api/accounts/:id", ctrl.UpdateAccount)
	router.PUT("/api/tasks/:id", ctrl.UpdateTask)
	router.DELETE("/api/accounts/:id", ctrl.DeleteAccount)
	router.DELETE("/api/tasks/:id", ctrl.DeleteTask)

	router.NoRoute(func(c *gin.Context) {
		if c.Request.Method == "OPTIONS" {
			c.Header("Access-Control-Allow-Origin", "*") // You can specify specific origins if needed
			c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
			c.Status(204) // No Content
			c.Status(http.StatusNoContent)
		}
	})

	return router
}
