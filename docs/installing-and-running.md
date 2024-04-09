# Installation

--

## Table of Contents

- [Comfortable development (PostgreSQL)](#comfortable-development-postgresql)



## Comfortable development (PostgreSQL)

1. Clone repository

   ```bash
   git clone https://github.com/Tagada216/adonis-api-back.git
   ```

2. Go to folder, and copy `.env.example` as `.env`.

   ```bash
   cd adonis-api-back/
   cp .env.example .env
   ```

3. Modify and add the corresponding environment variables for your application context

4. Run additional container:

```bash
docker compose up -d postgres
```

5. Install dependency

```bash
npm install
```

6. Run app configuration
   > Adonis work with ace command you create and make migration and other

```bash
node ace migration:run
```

7. Run app in dev mode

```bash
npm run dev
```

8. Your server was open on <http://localhost:3333>

## Links

- [Postman Collection](https://github.com/Tagada216/adonisjs-boilerplate/blob/main/postman/Adonis%20JS%20Boilerplate.postman_collection.json)
