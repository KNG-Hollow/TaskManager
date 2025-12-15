package routers

import (
	ctrl "github.com/TaskManager/controllers"
	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	router := gin.Default()

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

	return router
}
