package controllers

import (
	"log"
	"net/http"
	"strconv"

	service "github.com/TaskManager/services"
	"github.com/gin-gonic/gin"
)

func GetAccounts(c *gin.Context) {
	accounts, err := service.GetAccounts()
	if err != nil {
		log.Panicln("Service Failed To Get Accounts:", err)
	}

	if len(accounts) == 0 {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, accounts)
	}
}

func GetAccount(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		log.Panicln("Failed To Get Account:", err.Error())
	}

	account, err := service.GetAccount(id)
	if err != nil {
		log.Panicf("Service Failed To Get Account With Id: %d\n%q", id, err)
	}

	if account == nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, account)
	}
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
