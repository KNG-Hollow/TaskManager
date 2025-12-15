package services

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/TaskManager/models"
	"github.com/go-sql-driver/mysql"
)

func connect() (*sql.DB, error) {
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
	db, err := connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	results, err := db.Query("SELECT * FROM accounts")

	if err != nil {
		log.Panicln("Failed To Get Accounts From Database:", err.Error())
		return nil
	}

	accounts := []models.Account{}
	for results.Next() {
		var account models.Account
		err = results.Scan(
			&account.ID,
			&account.Name,
			&account.Username,
			&account.Password,
			&account.Admin,
			&account.Active,
		)
		if err != nil {
			panic(err.Error())
		}

		accounts = append(accounts, account)
	}

	return accounts
}

func GetAccount(id int) *models.Account {
	db, err := connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	results, err := db.Query("SELECT * FROM account WHERE id=?", id)
	if err != nil {
		log.Panicln("Failed To Get Account From Database:", err.Error())
	}

	account := &models.Account{}
	if results.Next() {
		err = results.Scan(
			&account.ID,
			&account.Name,
			&account.Username,
			&account.Password,
			&account.Admin,
			&account.Active,
		)
		if err != nil {
			panic(err.Error())
		}
	} else {
		return nil
	}

	return account
}

func GetTasks() []models.Task {
	db, err := connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
}

func GetTask(id int64) models.Task {
	db, err := connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
}

func AddAccount(account models.Account) bool {
	db, err := connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
}

func AddTask(task models.Task) bool {
	db, err := connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
}

func UpdateAccount(id int64, newData models.Account) bool {
	db, err := connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
}

func UpdateTask(id int64, newData models.Task) bool {
	db, err := connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
}

func DeleteAccount(id int64, newData models.Account) bool {
	db, err := connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
}

func DeleteTask(id int64, newData models.Task) bool {
	db, err := connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
}
