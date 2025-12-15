package models

import "time"

type Account struct {
	ID       int64  `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Password string `json:"password"`
	Admin    bool   `json:"admin"`
	Active   bool   `json:"active"`
}

type Task struct {
	ID          int64     `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Created     time.Time `json:"created"`
	CreatedBy   string    `json:"username"`
	Active      bool      `json:"active"`
}
