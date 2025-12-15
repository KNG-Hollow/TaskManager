package services

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/TaskManager/models"
	"github.com/go-sql-driver/mysql"
)

func Connect() (*sql.DB, error) {
	fmt.Println("Attempting To Connect To Database...")

	cfg := mysql.NewConfig()
	cfg.User = os.Getenv("DBUSER")
	cfg.Passwd = os.Getenv("DBPASS")
	cfg.Net = "tcp"
	cfg.Addr = "127.0.0.1:3306"
	cfg.DBName = "taskmanager"

	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}

	fmt.Println("Connected To Database!")

	return db, err
}

func GetAccounts() []models.Account {

}

func GetAccount() models.Account {

}

func GetTasks() []models.Task {

}

func GetTask() models.Task {

}

func AddAccount() bool {

}

func AddTask() bool {

}

func UpdateAccount() bool {

}

func UpdateTask() bool {

}

func DeleteAccount() bool {

}

func DeleteTask() bool {

}
