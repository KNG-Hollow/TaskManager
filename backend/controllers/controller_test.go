package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/TaskManager/models"
	router "github.com/TaskManager/routers"
	"github.com/stretchr/testify/assert"
)

func TestAccountController(t *testing.T) {
	router := router.InitRouter()

	testAcc := models.Account{
		ID:       1,
		Name:     "test",
		Username: "test",
		Password: "test",
		Admin:    false,
		Active:   false,
	}
	accJson, err := json.Marshal(testAcc)
	if err != nil {
		t.Fatal("could not encode account into JSON:", err)
	}

	updateAcc := models.Account{
		ID:       1,
		Name:     "test1",
		Username: "test1",
		Password: "test1",
		Admin:    false,
		Active:   false,
	}
	updateJson, err := json.Marshal(updateAcc)
	if err != nil {
		t.Fatal("could not encode account into JSON:", err)
	}

	// AddAccount
	req2, err := http.NewRequest(
		http.MethodPost,
		"/api/accounts",
		bytes.NewBuffer([]byte(accJson)),
	)
	if err != nil {
		t.Fatalf("could not create request: %v\n", err)
	}

	w2 := httptest.NewRecorder()
	router.ServeHTTP(w2, req2)

	assert.Equal(t, http.StatusCreated, w2.Code)
	//assert.JSONEq(t, "true", w2.Body.String())

	// GetAccounts
	req, err := http.NewRequest(http.MethodGet, "/api/accounts", nil)
	if err != nil {
		t.Fatalf("could not create request: %v\n", err)
	}

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	//assert.JSONEq(t, string(accJson), w.Body.String())

	// GetAccount
	req1, err := http.NewRequest(http.MethodGet, "/api/accounts/1", nil)
	if err != nil {
		t.Fatalf("could not create request: %v\n", err)
	}

	w1 := httptest.NewRecorder()
	router.ServeHTTP(w1, req1)

	assert.Equal(t, http.StatusOK, w1.Code)
	assert.JSONEq(t, string(accJson), w1.Body.String())

	// UpdateAccount
	req3, err := http.NewRequest(
		http.MethodPut,
		"/api/accounts/1",
		bytes.NewBuffer([]byte(updateJson)),
	)
	if err != nil {
		t.Fatalf("could not create request: %v\n", err)
	}

	w3 := httptest.NewRecorder()
	router.ServeHTTP(w3, req3)

	assert.Equal(t, http.StatusAccepted, w3.Code)
	//assert.JSONEq(t, "true", w3.Body.String())

	// DeleteAccount
	req4, err := http.NewRequest(
		http.MethodDelete,
		"/api/accounts/1",
		nil,
	)
	if err != nil {
		t.Fatalf("could not create request: %v\n", err)
	}

	w4 := httptest.NewRecorder()
	router.ServeHTTP(w4, req4)

	assert.Equal(t, http.StatusAccepted, w4.Code)
	//assert.JSONEq(t, "true", w4.Body.String())
}

func TestTaskController(t *testing.T) {
	router := router.InitRouter()

	testTask := models.Task{
		ID:          1,
		Name:        "test",
		Description: "test",
		Created:     time.Now(),
		CreatedBy:   "test",
		Active:      false,
	}
	taskJson, err := json.Marshal(testTask)
	if err != nil {
		t.Fatal("could not encode task into JSON:", err)
	}

	updateTask := models.Task{
		ID:          1,
		Name:        "test1",
		Description: "test1",
		Created:     time.Now(),
		CreatedBy:   "test1",
		Active:      false,
	}
	updateJson, err := json.Marshal(updateTask)
	if err != nil {
		t.Fatal("could not encode account into JSON:", err)
	}

	// AddTask
	req2, err := http.NewRequest(
		http.MethodPost,
		"/api/tasks",
		bytes.NewBuffer([]byte(taskJson)),
	)
	if err != nil {
		t.Fatalf("could not create request: %v\n", err)
	}

	w2 := httptest.NewRecorder()
	router.ServeHTTP(w2, req2)

	assert.Equal(t, http.StatusCreated, w2.Code)
	//assert.JSONEq(t, "true", w2.Body.String())

	// GetTasks
	req, err := http.NewRequest(http.MethodGet, "/api/tasks", nil)
	if err != nil {
		t.Fatalf("could not create request: %v\n", err)
	}

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	// GetTask
	req1, err := http.NewRequest(http.MethodGet, "/api/tasks/1", nil)
	if err != nil {
		t.Fatalf("could not create request: %v\n", err)
	}

	w1 := httptest.NewRecorder()
	router.ServeHTTP(w1, req1)

	assert.Equal(t, http.StatusOK, w1.Code)
	//assert.JSONEq(t, string(taskJson), w1.Body.String())

	// UpdateTask
	req3, err := http.NewRequest(
		http.MethodPut,
		"/api/tasks/1",
		bytes.NewBuffer([]byte(updateJson)),
	)
	if err != nil {
		t.Fatalf("could not create request: %v\n", err)
	}

	w3 := httptest.NewRecorder()
	router.ServeHTTP(w3, req3)

	assert.Equal(t, http.StatusAccepted, w3.Code)
	//assert.JSONEq(t, "true", w3.Body.String())

	// DeleteTask
	req4, err := http.NewRequest(
		http.MethodDelete,
		"/api/tasks/1",
		nil,
	)
	if err != nil {
		t.Fatalf("could not create request: %v\n", err)
	}

	w4 := httptest.NewRecorder()
	router.ServeHTTP(w4, req4)

	assert.Equal(t, http.StatusAccepted, w4.Code)
	//assert.JSONEq(t, "true", w4.Body.String())
}
