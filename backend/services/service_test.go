package services

import (
	"testing"
	//"regexp"

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
		Name:     "test",
		Username: "test",
		Password: "test",
		Admin:    true,
		Active:   true,
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
	assert.True(t, account != nil, "Account Exists!")

	// UpdateAccount
	updateAccount := models.Account{
		Name:     "test1",
		Username: "test1",
		Password: "test1",
		Admin:    true,
		Active:   true,
	}
	stat1, err := UpdateAccount(1, updateAccount)
	assert.Nil(t, err)
	assert.True(t, stat1)

	// DeleteAccount
	stat2, err := DeleteAccount(1)
	assert.Nil(t, err)
	assert.True(t, stat2)
}
