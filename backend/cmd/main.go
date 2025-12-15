package main

import (
	"log"

	"github.com/TaskManager/service"
	"github.com/gin-gonic/gin"
)

func main() {
	//var db *sql.DB
	//var err error

	router := gin.Default()
	router.GET("/api/accounts", getAccounts)
	//router.GET("/api/accounts/:id", getAccount)
	//router.GET("/api/tasks", getTasks)
	//router.GET("/api/tasks/:id", getTask)
	//router.POST("/api/accounts/:id", addAccount)
	//router.POST("/api/tasks/:id", addTask)
	//router.PUT("/api/accounts/:id", updateAccount)
	//router.PUT("/api/tasks/:id", updateTask)
	//router.DELETE("/api/accounts/:id", deleteAccount)
	//router.DELETE("/api/tasks/:id", deleteTask)

	router.Run("localhost:8081")
}

func getAccounts(c *gin.Context) {
	db, err := service.Connect()
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

}

func getAccount(c *gin.Context) {

}

func getTasks(c *gin.Context) {

}

func getTask(c *gin.Context) {

}

func addAccount(c *gin.Context) {

}

func addTask(c *gin.Context) {

}

func updateAccount(c *gin.Context) {

}

func updateTask(c *gin.Context) {

}

func deleteAccount(c *gin.Context) {

}

func deleteTask(c *gin.Context) {

}
