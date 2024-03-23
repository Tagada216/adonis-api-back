# Adonis API BACK 

## Installation 

`
git clone 
`

`
npm i 
cp .env.example .env
`

Create the database fieds with migration

`
node ace migration:run
`

## Start 

Start in develppoment mode

`
npm run dev
`

### Postgres local installation

Use Docker for greater efficiency

`
docker run -d --name postgres_db -p 5432:5432 -e POSTGRES_PASSWORD=<env_password> postgres
`

On you Docker conainer CLI : 

Connect on postgres
`
psql -h localhost -U postgres
`

Create your database: 

`
CREATE DATABASE <your_db_name>;
`

Some postgres command: 

`
\l # list a databases 

\c <your_db_name> # connect on your db

\d # view column on your db
`