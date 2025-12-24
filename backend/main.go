package main

import (
	"log"

	router "github.com/TaskManager/routers"
)

// TODO Implement TLS Into Router

func main() {
	router := router.InitRouter()

	//router.Run(":8081")
	err := router.RunTLS(":8443", "taskmanager-backend.crt", "taskmanager-backend.key")
	if err != nil {
		log.Fatal("Failed To Run Server: ", err)
	}
}
