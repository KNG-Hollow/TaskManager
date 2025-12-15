module github.com/KNG-Hollow/TaskManager/service

go 1.25.4

require (
	github.com/TaskManager/models v0.0.0-00010101000000-000000000000
	github.com/go-sql-driver/mysql v1.9.3
	github.com/stretchr/testify v1.11.1
)

require (
	filippo.io/edwards25519 v1.1.0 // indirect
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)

replace github.com/TaskManager/models => ../models
