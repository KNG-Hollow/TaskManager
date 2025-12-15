package controllers

import (
	"log"

	service "github.com/TaskManager/services"
	"github.com/gin-gonic/gin"
)

func GetAccounts(c *gin.Context) {
	db, err := service.Connect()
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

}

func GetAccount(c *gin.Context) {

}

func GetTasks(c *gin.Context) {

}

func GetTask(c *gin.Context) {

}

func GddAccount(c *gin.Context) {

}

func AddTask(c *gin.Context) {

}

func UpdateAccount(c *gin.Context) {

}

func UpdateTask(c *gin.Context) {

}

func DeleteAccount(c *gin.Context) {

}

func DeleteTask(c *gin.Context) {

}
