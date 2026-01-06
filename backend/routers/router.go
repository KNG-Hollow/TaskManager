package routers

import (
	"net/http"

	ctrl "github.com/TaskManager/controllers"
	jwt "github.com/appleboy/gin-jwt/v3"
	"github.com/gin-gonic/gin"
)

func InitRouter(engine *gin.Engine) *gin.Engine {
	// NON-JWT Routing
	engine.POST("/api/auth", ctrl.ValidateLogin) // NON-JWT Authorization

	engine.POST("/api/accounts", ctrl.AddAccount)
	engine.POST("/api/tasks", ctrl.AddTask)
	engine.GET("/api/accounts", ctrl.GetAccounts)
	engine.GET("/api/accounts/:id", ctrl.GetAccount)
	engine.GET("/api/tasks", ctrl.GetTasks)
	engine.GET("/api/tasks/:id", ctrl.GetTask)
	engine.PUT("/api/accounts/:id", ctrl.UpdateAccount)
	engine.PUT("/api/tasks/:id", ctrl.UpdateTask)
	engine.DELETE("/api/accounts/:id", ctrl.DeleteAccount)
	engine.DELETE("/api/tasks/:id", ctrl.DeleteTask)

	engine.NoRoute(func(c *gin.Context) {
		if c.Request.Method == "OPTIONS" {
			c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
			c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			c.AbortWithStatus(http.StatusNoContent) // No Content
			return
		}
	})

	return engine
}

func InitSecureRouter(engine *gin.Engine, jwt *jwt.GinJWTMiddleware) *gin.Engine {
	// Public Routes
	engine.POST("/api/login", jwt.LoginHandler)
	engine.POST("/api/refresh", jwt.RefreshHandler)
	engine.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"message": "The api service is running!",
		})
	})

	// Protected Routes
	auth := engine.Group("/api/auth", jwt.MiddlewareFunc())
	auth.POST("/accounts", ctrl.AddAccount)
	auth.POST("/tasks", ctrl.AddTask)
	auth.GET("/accounts", ctrl.GetAccounts)
	auth.GET("/accounts/:id", ctrl.GetAccount)
	auth.GET("/tasks", ctrl.GetTasks)
	auth.GET("/tasks/:id", ctrl.GetTask)
	auth.PUT("/accounts/:id", ctrl.UpdateAccount)
	auth.PUT("/tasks/:id", ctrl.UpdateTask)
	auth.DELETE("/accounts/:id", ctrl.DeleteAccount)
	auth.DELETE("/tasks/:id", ctrl.DeleteTask)
	auth.POST("/logout", jwt.LogoutHandler)

	engine.NoRoute(jwt.MiddlewareFunc(), func(c *gin.Context) {
		if c.Request.Method == "OPTIONS" {
			c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
			c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			c.AbortWithStatus(http.StatusNoContent) // No Content
			return
		}
	})

	return engine
}
