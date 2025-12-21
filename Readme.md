![License](https://img.shields.io/badge/license-MIT-blue.svg)

# TaskManager

An Easy-To-Use, browser-based 'To-Do List' that connects to a *MariaDB/MySQL* Database Service of your choosing. Great for public computers with multiple accounts, or team coordination on a shared resource. Built With *Go* And *Typescript*, All Orchestrated With *Docker Compose*.

## Introduction

1. You **MUST** Have [**Docker Compose**](https://docs.docker.com/compose/install) Installed To Be Able To Build And Run The Application With The `./compose.yaml` File.

2. Define The Environment Variables `DBUSER`, `DBPASS`, `DBHOST`, `DBPORT`, `DBNAME` In A `.env` File In The Project's Root As A **key**=**value** Pair List:

    * Database System *MUST* Be [***MariaDB***](https://mariadb.com/) Or [***MySQL***](https://www.mysql.com/), As These Are Compatible With The Drivers The ***Backend Service*** Will Be Using.

    * The Variables *MUST* Point To Active ***MySQL/MariaDB*** Database Credentials to Connect Successfully.

    * Database *MUST* Support **TCP** Transfers.

    * A **SQL-Script** Is Provided At `./database/create-tables.sql` To Help Populate A New Database's Tables

    * The Database *Must* Be Called `taskmanager` For The ***Backend Service*** To Connect

    *Example **.env*** :

        DBUSER=Beans
        DBPASS=superSecret
        DBHOST=192.168.0.123
        DBPORT=3306
        DBNAME=taskmanager

3. ***(If Interested)* The Compiled Asset-files Are Available For Your Convenience At :**

    * **Backend :**
      * `./backend/TM-Server` **(Executable)**
      * [Dockerhub Image](https://hub.docker.com/repository/docker/knghollow/taskmanager-backend/general)
  
    * **Frontend :**
      * `./frontend/dist/` **(Build Files)**
      * [Dockerhub Image](https://hub.docker.com/repository/docker/knghollow/taskmanager-frontend/general)

## How To Use

1. Clone The Repository :

    ```bash
    git clone https://github.com/KNG-Hollow/TaskManager.git
    ```

2. Open The Cloned Repository And Create The .env File :
    ```bash
    cd [cloned_directory]
    touch .env
    # ADD DATABASE VARIABLES TO FILE THEN SAVE
    ```

3. Run The Docker Compose Manifest In The Folder :

    ```bash
    docker compose up --build
    ```

* **Once the Compose service is running, insert the host's address into a browser's address bar to navigate to the website**
