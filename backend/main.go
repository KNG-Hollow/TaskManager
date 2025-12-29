package main

import (
	"log"

	router "github.com/TaskManager/routers"
	"github.com/gin-gonic/gin"
)

func main() {
	router := router.InitRouter()

	router.Use(func(c *gin.Context) {
		log.Printf("Request: %s %s", c.Request.Method, c.Request.URL)
		c.Next()
		log.Printf("Response status: %d", c.Writer.Status())
	})

	//router.Run(":8081")		// HTTP Server
	err := router.RunTLS(":8443", "taskmanager-backend.crt", "taskmanager-backend.key")
	if err != nil {
		log.Fatal("Failed To Run Server: ", err)
	}
}
