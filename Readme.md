# How To Use

    - You must have Docker Compose installed to be able to build 
        and run the application with the "<root>/compose.yaml file"

    - Create The Environment Variables [ DBUSER, DBPASS, DBHOST, DBPORT ] And
        Place Into A "<root>/.env" File As A key=value List

        + Database System MUST Be MariaDB Or MySQL As These Are Compatible With The Drivers
            {Go} Will Be Using
        + The Variables must point to active MySQL/MariaDB server credentials to connect
        + Database must support TCP

        - A SQL Script Is Provided At "<root>/database/create-tables.sql"
            To Help Populate A New MariaDB/MySQL Database's Tables

            *REMINDER* The Database Must Be Called "taskmanager" For The Backend API To Connect

    - The compiled-asset files are in:

        + Backend: <root>/backend/TM-Server (Executable)
        + Frontend: <root>/frontend/dist/   (build files)

    - RUN { docker compose up --build } to build the containers needed and run the Compose service

    - Once the Compose service is running, insert the host's address into a browser's address bar to navigate to the website 
