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

func GetAccounts() ([]models.Account, error) {
	db, err := Connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	results, err := db.Query("SELECT * FROM account")

	if err != nil {
		log.Panicln("Failed To Get Accounts From Database:", err.Error())
	}

	accounts := []models.Account{}
	var adminBit []byte
	var activeBit []byte

	for results.Next() {
		var account models.Account
		err = results.Scan(
			&account.ID,
			&account.Name,
			&account.Username,
			&account.Password,
			&adminBit,
			&activeBit,
		)
		if err != nil {
			panic(err.Error())
		}

		if len(adminBit) > 0 && adminBit[0] == 1 {
			account.Admin = true
		} else {
			account.Admin = false
		}

		if len(activeBit) > 0 && activeBit[0] == 1 {
			account.Active = true
		} else {
			account.Active = false
		}

		accounts = append(accounts, account)
	}

	return accounts, err
}

func GetAccount(id int) (*models.Account, error) {
	db, err := Connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	results, err := db.Query("SELECT * FROM account WHERE id=?", id)
	if err != nil {
		log.Panicln("Failed To Get Account From Database:", err.Error())
	}

	account := &models.Account{}
	var adminBit []byte
	var activeBit []byte

	if results.Next() {
		err = results.Scan(
			&account.ID,
			&account.Name,
			&account.Username,
			&account.Password,
			&adminBit,
			&activeBit,
		)
		if err != nil {
			panic(err.Error())
		}
	} else {
		return nil, fmt.Errorf("failed to get account with ID: [%d]", id)
	}

	if len(adminBit) > 0 && adminBit[0] == 1 {
		account.Admin = true
	} else {
		account.Admin = false
	}

	if len(activeBit) > 0 && activeBit[0] == 1 {
		account.Active = true
	} else {
		account.Active = false
	}

	return account, err
}

/*
	func GetTasks() []models.Task {
		db, err := Connect()
		if err != nil {
			log.Panicln("Failed To Connect To Database:", err)
		}

		defer db.Close()
	}

	func GetTask(id int64) models.Task {
		db, err := Connect()
		if err != nil {
			log.Panicln("Failed To Connect To Database:", err)
		}

		defer db.Close()
	}
*/
func AddAccount(account models.Account) (bool, error) {
	stat := true
	db, err := Connect()
	if err != nil {
		stat = false
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	insert, err := db.Exec(
		"INSERT INTO account (id,name,username,password,admin,active) VALUES (?,?,?,?,?,?)",
		account.ID, account.Name, account.Username, account.Password, boolToBit(account.Admin), boolToBit(account.Active),
	)
	if insert == nil || err != nil {
		stat = false
		panic(err.Error())
	}

	return stat, err
}

/*
	func AddTask(task models.Task) bool {
		db, err := Connect()
		if err != nil {
			log.Panicln("Failed To Connect To Database:", err)
		}

		defer db.Close()
	}
*/
func UpdateAccount(id int64, newData models.Account) (bool, error) {
	stat := true
	db, err := Connect()
	if err != nil {
		stat = false
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	update, err := db.Exec(
		//"INSERT INTO account (name,username,password,admin,active) VALUES (?,?,?,?,?) WHERE id=?",
		"UPDATE account SET name=?, username=?, password=?, admin=?, active=? WHERE id=?",
		newData.Name, newData.Username, newData.Password, newData.Admin, newData.Active, id,
	)
	if update == nil || err != nil {
		stat = false
		panic(err.Error())
	}

	return stat, err
}

/*
	func UpdateTask(id int64, newData models.Task) bool {
		db, err := Connect()
		if err != nil {
			log.Panicln("Failed To Connect To Database:", err)
		}

		defer db.Close()
	}
*/
func DeleteAccount(id int64) (bool, error) {
	stat := true
	db, err := Connect()
	if err != nil {
		stat = false
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	delete, err := db.Exec(
		"DELETE FROM account WHERE id=?",
		id,
	)
	if delete == nil || err != nil {
		stat = false
		panic(err.Error())
	}

	return stat, err

}

/*
func DeleteTask(id int64, newData models.Task) bool {
	db, err := Connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
}
*/

func boolToBit(b bool) []byte {
	if b {
		return []byte{1}
	}
	return []byte{0}
}
