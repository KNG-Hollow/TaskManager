package controllers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/TaskManager/models"
	service "github.com/TaskManager/services"
	"github.com/gin-gonic/gin"
)

func AddAccount(c *gin.Context) {
	var account models.Account

	if err := c.BindJSON(&account); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		res, err := service.AddAccount(account)
		if !res && err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
			log.Panicln("Service Failed To Add Account To Database:", err.Error())
		}
		c.JSON(http.StatusCreated, account)
	}
}

func AddTask(c *gin.Context) {
	var task models.Task

	if err := c.BindJSON(&task); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		res, err := service.AddTask(task)
		if !res && err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
			log.Panicln("Service Failed To Add Task To Database:", err.Error())
		}
		c.JSON(http.StatusCreated, task)
	}
}

func GetAccounts(c *gin.Context) {
	accounts, err := service.GetAccounts()
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
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
		c.AbortWithStatus(http.StatusBadRequest)
		log.Panicln("Failed To Get Account ID:", err.Error())
	}

	account, err := service.GetAccount(id)
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		log.Panicf("Service Failed To Get Account With ID: %d\n%q", id, err)
	}

	if account == nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, account)
	}
}

func GetTasks(c *gin.Context) {
	tasks, err := service.GetTasks()
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		log.Panicln("Service Failed To Get Tasks:", err)
	}

	if len(tasks) == 0 {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, tasks)
	}
}

func GetTask(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		log.Panicln("Failed To Get Task ID:", err)
	}

	task, err := service.GetTask(int64(id))
	if err != nil {
		log.Panicf("Service Failed To Get Task With ID: %d\n%q", id, err)
	}

	if task == nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, task)
	}

}

func UpdateAccount(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		log.Panicln("Failed To Convert idParam To Int:", err)
	}
	var newAccount models.Account

	if err := c.BindJSON(&newAccount); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		res, err := service.UpdateAccount(int64(id), newAccount)
		if !res && err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
			log.Panicln("Service Failed To Update Task With Id:", id)
		}
		c.JSON(http.StatusAccepted, newAccount)
	}
}

func UpdateTask(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		log.Panicln("Failed To Convert idParam To Int:", err)
	}
	var newTask models.Task

	if err := c.BindJSON(&newTask); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		res, err := service.UpdateTask(int64(id), newTask)
		if !res && err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
			log.Panicln("Service Failed To Update Task With Id:", id)
		}
		c.JSON(http.StatusAccepted, newTask)
	}
}

func DeleteAccount(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		log.Panicln("Failed To Convert idParam To Int:", err)
	}

	res, err := service.DeleteAccount(int64(id))
	if !res && err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		log.Panicln("Service Failed To Delete Account With Id:", id)
	}
	c.JSON(http.StatusAccepted, id)

}

func DeleteTask(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		log.Panicln("Failed To Convert idParam To Int:", err)
	}

	res, err := service.DeleteTask(int64(id))
	if !res && err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		log.Panicln("Service Failed To Delete Task With Id:", id)
	}
	c.JSON(http.StatusAccepted, id)
}
