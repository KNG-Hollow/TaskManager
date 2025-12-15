package controllers

import (
	"log"
	"net/http"
	"strconv"

	service "github.com/TaskManager/services"
	"github.com/gin-gonic/gin"
)

func GetAccounts(c *gin.Context) {
	accounts := service.GetAccounts()

	if accounts == nil || len(accounts) == 0 {
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

	account := service.GetAccount(id)

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
