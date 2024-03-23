# Adonis API BACK 

## Installation 

`sh
git clone 
`

`sh
npm i 
cp .env.example .env
`

## Start 

Start in develppoment mode

`sh
npm run dev
`

### Postgres local installation

Use Docker for greater efficiency

`sh 
docker run -d --name postgres_db -p 5432:5432 -e POSTGRES_PASSWORD=<env_password> postgres
`

On you Docker conainer CLI : 

Connect on postgres
`sh 
psql -h localhost -U postgres
`

Create your database: 

`sh
CREATE DATABASE <your_db_name>;
`

Some postgres command: 

`sh
\l # list a databases 

\c <your_db_name> # connect on your db

\d # view column on your db
`