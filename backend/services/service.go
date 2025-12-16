package services

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/TaskManager/models"
	"github.com/go-sql-driver/mysql"
)

func Connect() (*sql.DB, error) {
	fmt.Println("Attempting To [Connect] To Database...")

	cfg := mysql.NewConfig()
	cfg.Net = "tcp"
	cfg.User = os.Getenv("DBUSER")
	cfg.Passwd = os.Getenv("DBPASS")

	host := os.Getenv("DBHOST")
	port := os.Getenv("DBPORT")
	cfg.Addr = fmt.Sprintf("%s:%s", host, port)

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
	return db, nil
}

func AddAccount(account models.Account) (bool, error) {
	stat := true
	db, err := Connect()
	if err != nil {
		stat = false
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	fmt.Println("Attempting To [Insert] Account Into Database:", account.Username)
	insert, err := db.Exec(
		"INSERT INTO account (id,name,username,password,admin,active) VALUES (?,?,?,?,?,?)",
		account.ID, account.Name, account.Username, account.Password, boolToBit(account.Admin), boolToBit(account.Active),
	)
	if insert == nil || err != nil {
		stat = false
		panic(err.Error())
	}

	fmt.Printf("Successfully [Inserted] [%s] Into Database!\n", account.Username)
	return stat, nil
}

func AddTask(task models.Task) (bool, error) {
	stat := true
	db, err := Connect()
	if err != nil {
		stat = false
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	fmt.Println("Attempting To [Insert] Task Into Database:", task.Name)
	insert, err := db.Exec(
		"INSERT INTO task (id,name,description,created,createdby,active) VALUES (?,?,?,?,?,?)",
		task.ID, task.Name, task.Description, task.Created, task.CreatedBy, boolToBit(task.Active),
	)
	if insert == nil || err != nil {
		stat = false
		panic(err.Error())
	}

	fmt.Printf("Successfully [Inserted] [%s] Into Database!\n", task.Name)
	return stat, nil
}

func GetAccounts() ([]models.Account, error) {
	db, err := Connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	fmt.Println("Attempting To [Get] Accounts...")
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

	fmt.Println("Successfully [Gathered] Accounts")
	return accounts, nil
}

func GetAccount(id int) (*models.Account, error) {
	db, err := Connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	fmt.Println("Attempting To [Get] Account:", id)
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

	fmt.Println("Successfully [Gathered] Account:", id)
	return account, nil
}

func GetTasks() ([]models.Task, error) {
	db, err := Connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	fmt.Println("Attempting To [Get] Tasks...")
	results, err := db.Query("SELECT * FROM task")

	if err != nil {
		log.Panicln("Failed To Get Tasks From Database:", err.Error())
	}

	tasks := []models.Task{}
	var activeBit []byte

	for results.Next() {
		var task models.Task
		var createdRaw []byte
		err = results.Scan(
			&task.ID,
			&task.Name,
			&task.Description,
			&createdRaw,
			&task.CreatedBy,
			&activeBit,
		)
		if err != nil {
			panic(err.Error())
		}

		if createdRaw != nil {
			const layout = "2006-01-02 15:04:05"
			createdTime, err := time.Parse(layout, string(createdRaw))
			if err != nil {
				return nil, err
			}
			task.Created = createdTime
		}

		if len(activeBit) > 0 && activeBit[0] == 1 {
			task.Active = true
		} else {
			task.Active = false
		}

		tasks = append(tasks, task)
	}

	fmt.Println("Successfully [Gathered] Tasks!")
	return tasks, nil

}

func GetTask(id int64) (*models.Task, error) {
	db, err := Connect()
	if err != nil {
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	results, err := db.Query("SELECT * FROM task WHERE id=?", id)
	if err != nil {
		log.Panicln("Failed To Task From Database:", err)
	}

	task := &models.Task{}
	var activeBit []byte
	var createdRaw []byte

	if results.Next() {
		err = results.Scan(
			&task.ID,
			&task.Name,
			&task.Description,
			&createdRaw,
			&task.CreatedBy,
			&activeBit,
		)
		if err != nil {
			panic(err.Error())
		}
	} else {
		return nil, fmt.Errorf("results from query of id [%d] is empty", id)
	}

	if createdRaw != nil {
		const layout = "2006-01-02 15:04:05"
		createdTime, err := time.Parse(layout, string(createdRaw))
		if err != nil {
			return nil, err
		}
		task.Created = createdTime
	}

	if len(activeBit) > 0 && activeBit[0] == 1 {
		task.Active = true
	} else {
		task.Active = false
	}

	fmt.Println("Successfully [Gathered] Task:", id)
	return task, nil
}

func UpdateAccount(id int64, newData models.Account) (bool, error) {
	stat := true
	db, err := Connect()
	if err != nil {
		stat = false
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	fmt.Println("Attempting To [Update] Account At:", id)
	update, err := db.Exec(
		"UPDATE account SET name=?, username=?, password=?, admin=?, active=? WHERE id=?",
		newData.Name, newData.Username, newData.Password, newData.Admin, newData.Active, id,
	)
	if update == nil || err != nil {
		stat = false
		panic(err.Error())
	}

	fmt.Println("Successfully [Updated] Account At:", id)
	return stat, nil
}

func UpdateTask(id int64, newData models.Task) (bool, error) {
	stat := true
	db, err := Connect()
	if err != nil {
		stat = false
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	fmt.Println("Attempting To [Update] Task At:", id)
	update, err := db.Exec(
		"UPDATE task SET name=?, description=?, active=? WHERE id=?",
		newData.Name, newData.Description, newData.Active, id,
	)
	if update == nil || err != nil {
		stat = false
		panic(err.Error())
	}

	fmt.Println("Successfully [Updated] Task At:", id)
	return stat, nil
}

func DeleteAccount(id int64) (bool, error) {
	stat := true
	db, err := Connect()
	if err != nil {
		stat = false
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	fmt.Println("Attempting To [Delete] Account At:", id)
	delete, err := db.Exec(
		"DELETE FROM account WHERE id=?",
		id,
	)
	if delete == nil || err != nil {
		stat = false
		panic(err.Error())
	}

	fmt.Println("Successfully [Deleted] Account:", id)
	return stat, nil

}

func DeleteTask(id int64) (bool, error) {
	stat := true
	db, err := Connect()
	if err != nil {
		stat = false
		log.Panicln("Failed To Connect To Database:", err)
	}

	defer db.Close()
	fmt.Println("Attempting To [Delete] Task At:", id)
	delete, err := db.Exec(
		"DELETE FROM task WHERE id=?",
		id,
	)
	if delete == nil || err != nil {
		stat = false
		panic(err.Error())
	}

	fmt.Println("Successfully [Deleted] Task:", id)
	return stat, nil
}

func boolToBit(b bool) []byte {
	if b {
		return []byte{1}
	}
	return []byte{0}
}
