package main

import (
	router "github.com/TaskManager/routers"
)

func main() {
	router := router.InitRouter()

	router.Run("localhost:8081")
}
