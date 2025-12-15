# Database Config

    - The Environment Variables [DBUSER, DBPASS] Must Be Set For Your Current Shell Session
        + They must point to active MySQL/MariaDB server credentials
        + The Database must be named "taskmanager"
        + Database must support TCP
        + Database address must be located at "127.0.0.1:3306" 

# Data Structures

    - Account {
        id       int64  `json:"id"`
        name     string `json:"name"`
        username string `json:"username"`
        password string `json:"password"`
        admin    bool   `json:"admin"`
        active   bool   `json:"active"`
    }

    - Task {
        id          int64     `json:"id"`
        name        string    `json:"name"`
        description string    `json:"description"`
        created     time      `json:"created"`
        createdBy   string    `json:"username"`
        active      bool      `json:"active"`
    }
    
# API EndPoints

    POST("/api/accounts")
    POST("/api/tasks")

    GET("/api/accounts")
    GET("/api/accounts/:id")

    GET("/api/tasks")
    GET("/api/tasks/:id")

    PUT("/api/accounts/:id")
    PUT("/api/tasks/:id")
    
    DELETE("/api/accounts/:id")
    DELETE("/api/tasks/:id")
