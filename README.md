### Postgres local installation

Use Docker for greater efficiency

`sh 
docker run -d --name dev_postgres -p 5432:5432 -e POSTGRES_PASSWORD=<env_password> postgres
`
