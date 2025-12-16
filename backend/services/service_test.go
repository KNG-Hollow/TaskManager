package services

import (
	"testing"
	"time"

	"github.com/TaskManager/models"
	"github.com/stretchr/testify/assert"
)

func TestConnection(t *testing.T) {
	db, err := Connect()
	assert.Nil(t, err, "Check Database Connection!")
	assert.Nil(t, db.Ping(), "Check Active Connection!")
}

func TestAccountService(t *testing.T) {
	// AddAccount
	newAccount := models.Account{
		ID:       1,
		Name:     "test",
		Username: "test",
		Password: "test",
		Admin:    false,
		Active:   false,
	}
	stat, err := AddAccount(newAccount)
	assert.Nil(t, err)
	assert.True(t, stat)

	// GetAccounts
	accounts, err := GetAccounts()
	assert.Nil(t, err)
	assert.True(t, len(accounts) > 0, "Accounts Greater Than Zero!")

	// GetAccount
	account, err := GetAccount(1)
	assert.Nil(t, err)
	assert.NotNil(t, account, "Account Exists!")

	// UpdateAccount
	updateAccount := models.Account{
		Name:     "test1",
		Username: "test1",
		Password: "test1",
		Admin:    false,
		Active:   false,
	}
	stat1, err := UpdateAccount(1, updateAccount)
	assert.Nil(t, err)
	assert.True(t, stat1)

	// DeleteAccount
	stat2, err := DeleteAccount(1)
	assert.Nil(t, err)
	assert.True(t, stat2)
}

func TestTaskService(t *testing.T) {
	// AddTask
	newTask := models.Task{
		ID:          1,
		Name:        "test",
		Description: "test",
		Created:     time.Now(),
		CreatedBy:   "test",
		Active:      false,
	}
	stat, err := AddTask(newTask)
	assert.Nil(t, err)
	assert.True(t, stat)

	// GetTasks
	tasks, err := GetTasks()
	assert.Nil(t, err)
	assert.True(t, len(tasks) > 0, "Tasks Greater Than Zero!")

	// GetTask
	task, err := GetTask(1)
	assert.Nil(t, err)
	assert.NotNil(t, task, "Task Exists!")

	// UpdateTask
	updateTask := models.Task{
		Name:        "test1",
		Description: "test1",
		Created:     time.Now(),
		CreatedBy:   "test1",
		Active:      false,
	}
	stat1, err := UpdateTask(1, updateTask)
	assert.Nil(t, err)
	assert.True(t, stat1)

	// DeleteTask
	stat2, err := DeleteTask(1)
	assert.Nil(t, err)
	assert.True(t, stat2)
}
