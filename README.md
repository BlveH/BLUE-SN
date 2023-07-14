# BLUE-SN

Welcome to BLUE-SN, the small social network website developed by [BlveH](https://github.com/BlveH).

## Prerequisites

Before you install and use the BLUE-SN project, you'll need the following:

- [NodeJS](https://nodejs.org/en/)

## Installation

1.  Clone this repository

```
git clone https://github.com/BlveH/BLUE-SN.git
```

2.  Install all dependencies

```
npx yarn install
```

3.  Start the BLUE-SN server

```
npm start
```

That's it! You have successfully completed the installation of BLUE-SN.

## docker-compose.yml

- Example:

```
services:
    mongo:
        env_file:
            - mongo.env
        image: mongo:focal
        restart: always
        ports:
            - 27017:27017
        volumes:
            - ./data/mongo:/data/db
        networks:
            - blue
networks:
    blue:
```
