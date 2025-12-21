![License](https://img.shields.io/badge/license-MIT-blue.svg)

# TaskManager

An Easy-To-Use Web Application Built With **Go** And **Typescript**, All Orchestrated With **Docker Compose**.

## Introduction

You **MUST** have [**Docker Compose**](https://docs.docker.com/compose/install) installed to be able to build and run the application with the `<root>/compose.yaml file`

Create The Environment Variables `DBUSER`, `DBPASS`, `DBHOST`, `DBPORT`, `DBNAME` And Place Into A `<root>/.env` File As A **key**=**value** List:

* Database System *MUST* Be [***MariaDB***](https://mariadb.com/) Or [***MySQL***](https://www.mysql.com/), As These Are Compatible With The Drivers ***Go*** Will Be Using

* The Variables *MUST* Point To Active ***MySQL/MariaDB*** Server Credentials to Connect

* Database *MUST* support **TCP**

* A **SQL-Script** Is Provided At `<root>/database/create-tables.sql` To Help Populate A New ***MariaDB/MySQL*** Database's Tables

* The Database *Must* Be Called `taskmanager` For The *Backend Service* To Connect

*Example .env* :

    DBUSER=Beans
    DBPASS=superSecret
    DBHOST=192.168.0.123
    DBPORT=3306
    DBNAME=taskmanager

**The compiled asset-files are in:**

* **Backend :**
  * `<root>/backend/TM-Server` **(Executable)**
  * [Dockerhub Image](https://hub.docker.com/repository/docker/knghollow/taskmanager-backend/general)
* **Frontend:**
  * `<root>/frontend/dist/` **(build files)**
  * [Dockerhub Image](https://hub.docker.com/repository/docker/knghollow/taskmanager-frontend/general)

## How To Use

Clone The Repository:

```bash
git clone https://github.com/KNG-Hollow/TaskManager.git
```

Run The Docker Compose Manifest In The Folder:

```bash
cd [ Cloned_Directory ]
docker compose up --build
```

* **Once the Compose service is running, insert the host's address into a browser's address bar to navigate to the website**
