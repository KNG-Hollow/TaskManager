package main

import (
	router "github.com/TaskManager/routers"
)

func main() {
	router := router.InitRouter()

	router.Run("0.0.0.0:8081")
}
