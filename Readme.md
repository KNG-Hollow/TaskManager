# How To Use

    - You must have Docker Compose installed to be able to build 
        and run the application with the "<root>/compose.yaml file"

    - Custom Environment Variables [ DBUSER, DBPASS, DBHOST, DBPORT ] Must Be Set For Your Host's Current Login Session, Pointing To The [ user, password, host, post ] That You Plan On Connecting To
        + They must point to active MySQL/MariaDB server credentials
        + The Database must be named "taskmanager"
        + Database must support TCP
        + Database address must be located at "127.0.0.1:3306" 

    - Current build files are in:
        - Backend: <root>/backend/TM-Server (Executable)
        - Frontend: <root>/frontend/dist/   (build files)

    - Run { docker compose up --build } to build the containers needed and run the Compose service

    - Once the Compose service is running, insert the host's address into a browser's address bar to navigate to the website 
