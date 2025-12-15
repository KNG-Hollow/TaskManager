CREATE TABLE IF NOT EXISTS account (
    id          INT AUTO_INCREMENT NOT NULL,
    name        VARCHAR(128) NOT NULL,
    username    VARCHAR(128) NOT NULL,
    password    VARCHAR(128) NOT NULL,
    admin       BIT NOT NULL,
    active      BIT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS task (
    id          INT AUTO_INCREMENT NOT NULL,
    name        VARCHAR(128) NOT NULL,
    description TEXT,
    created     TIMESTAMP NOT NULL,
    createdBy   VARCHAR(128) NOT NULL,
    active      BIT NOT NULL,
    PRIMARY KEY (`id`)
);
