package service

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/go-sql-driver/mysql"
)

type Account struct {
	ID       int64  `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Password string `json:"password"`
	Admin    bool   `json:"admin"`
	Active   bool   `json:"active"`
}

type Task struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Created     string `json:"created"`
	CreatedBy   string `json:"username"`
	Active      bool   `json:"active"`
}

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

func GetAccounts() {

}

func GetAccount() {

}

func GetTasks() {

}

func GetTask() {

}

func AddAccount() {

}

func AddTask() {

}

func UpdateAccount() {

}

func UpdateTask() {

}

func DeleteAccount() {

}

func DeleteTask() {

}
