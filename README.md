```markdown
# 📽️ Movies API

> REST API for managing **movies** and **directors**, built with **Node.js**, **Express**, and **TypeScript**.  
> Data access is handled with **Prisma ORM** and **SQLite**.  
> The project includes **Swagger UI documentation**, **validation middlewares**, **structured error handling**, **logging**, and **unit tests**.

---

## 📌 Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
	- [Environment Variables](#environment-variables)
- [Database](#database)
	- [Prisma Commands](#prisma-commands)
- [API Documentation (Swagger)](#api-documentation-swagger)
- [Endpoints](#endpoints)
	- [Movies](#movies)
	- [Directors](#directors)
- [Validations & Business Rules](#validations--business-rules)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Tests](#tests)
- [Running the Project](#running-the-project)
	- [Running Locally (SQLite)](#running-locally-sqlite)
	- [Running with Docker (SQLite)](#running-with-docker-sqlite)
- [Conventional Commits](#conventional-commits)
- [Personal Experience](#personal-experience)
- [Notes](#notes)

## 📁 Project Structure
>>>>>>> 135700c (docs: update README and final adjustments)

The implementation follows a modular architecture to keep the code organized and maintainable.  
It is split into layers such as **controllers**, **services**, **middlewares**, **routes**, **models**, and **database**.

```

.

├── prisma/

│  ├── migrations/

│  ├── dev.db

│  └── schema.prisma

├── src/

│  ├── controllers/

│  │  ├── director.controller.ts

│  │  └── movie.controller.ts

│  ├── database/

│  │  └── prisma.ts

│  ├── errors/

│  ├── middlewares/

│  │  ├── validateDirector.ts

│  │  └── validateMovie.ts

│  ├── models/

│  │  ├── director.model.ts

│  │  └── movie.model.ts

│  ├── routes/

│  │  ├── director.routes.ts

│  │  └── movie.routes.ts

│  ├── services/

│  │  ├── director.service.ts

│  │  └── movie.service.ts

│  └── index.ts

├── tests/

│  ├── createDirector.test.ts

│  ├── createMovie.test.ts

│  ├── deleteDirector.test.ts

│  ├── deleteMovie.test.ts

│  ├── getAllMovies.test.ts

│  ├── getMovieById.test.ts

│  ├── test-server.ts

│  ├── updateDirector.test.ts

│  └── updateMovie.test.ts

├── docker-compose.yml

├── Dockerfile

├── jest.config.js

├── package.json

├── tsconfig.json

└── [README.md](http://README.md)

```

---

## 💻 Prerequisites

- **Node.js 18+**
- **npm**
- **Docker + Docker Compose** (optional, if you want to run via Docker)

---

## 🚀 Installing & Running

### 1) Install dependencies
```

npm install

```

### 2) Environment variables

Create a `.env` file in the project root.

**Local (SQLite)**
```

PORT=3000

DATABASE_URL="file:./prisma/dev.db"

```

**Docker (SQLite)**
```

PORT=3000

DATABASE_URL="file:./dev.db"

```

> Note: In Docker, the SQLite file is created inside the container and persisted to your machine due to the volume mount (you’ll see `dev.db` in the project root).

---

## 🗄️ Database (Prisma + SQLite)

This project uses **SQLite** with **Prisma ORM**.

### Prisma commands
```

npx prisma generate

npx prisma migrate dev

npx prisma studio

```

---

## 🔥 API Documentation (Swagger)

Swagger UI:
- http://localhost:3000/docs

> Swagger is used to document and test the API endpoints interactively.

---

## 📖 API Documentation

The API provides endpoints for **Movies** and **Directors**, including CRUD operations and relationship rules (Director → Movies: One-to-Many).

---

## 🎬 Movies

### Create Movie
```

POST /movies

```

**Filters available on list endpoint:**
- `title`
- `genre`
- `releaseYear`

### List Movies (with filters)
```

GET /movies

```

Example:
```

/movies?title=inception&genre=Sci-Fi&releaseYear=2010

```

### Get Movie by ID
```

GET /movies/:id

```

### Update Movie
```

PUT /movies/:id

```

### Delete Movie
```

DELETE /movies/:id

```

---

## 🎬 Directors

### Create Director
```

POST /directors

```

### List Directors
```

GET /directors

```

### Get Director by ID
```

GET /directors/:id

```

### Update Director
```

PUT /directors/:id

```

### Delete Director (blocked if director has movies)
```

DELETE /directors/:id

```

### List Movies by Director
```

GET /directors/:id/movies

```

---

## ✅ Validations & Business Rules

### Movies
- `title` is required
- `releaseYear` is required and must be a valid year (not greater than the current year)
- `genre` is required
- `directorId` is required and must reference an existing director
- `description` is optional and must be at most 255 characters
- Movies can share the same `title` only when `releaseYear` and/or `directorId` are different

### Directors
- `name` is required
- `name` must be between 3 and 50 characters
- `name` must be unique
- It is not allowed to delete a director that has linked movies

> Tip: Business rules should stay in the **service layer**, keeping controllers focused on request/response only.

---

## ❌ Error Handling

Standard error format:
```

{ "error": "Descriptive message" }

```

Expected status codes:
- **400** → Bad Request (invalid data)
- **404** → Not Found (resource not found)
- **409** → Conflict (business rule violation)
- **500** → Internal Server Error (unexpected error)

---

## 🪵 Logging

Logging rules:
- Log request entry (method, URL, params, body)
- Log errors in controllers/services/middlewares
- Do not log response bodies

Example:
```

[CONTROLLER] POST /movies params={} body={...}

[SERVICE] createMovie input={...}

[SERVICE] createMovie error="Director not found"

```

---

## 🧪 Tests

Run all tests:
```

npm test

```

Existing test files cover the main flows for:
- Create / Update / Delete Director
- Create / Update / Delete Movie
- Get movie by ID
- Get all movies
- Key business rules

Scripts (from `package.json`):
- `npm run dev` → `ts-node src/index.ts`
- `npm run build` → `tsc`
- `npm start` → `node dist/index.js`

---

## 🐳 Running with Docker (SQLite)

```

docker-compose up --build

```

App:
- http://localhost:3000  
Swagger:
- http://localhost:3000/docs

**docker-compose.yml (current)**
```

services:

app:

build: .

container_name: movies_api

restart: always

ports:

- "3000:3000"

environment:

DATABASE_URL: "file:./dev.db"

PORT: 3000

volumes:

- .:/app
- /app/node_modules

command: npm run dev

```

---

## 🧾 Conventional Commits

Examples:
- `feat: add movies endpoints`
- `fix: validate releaseYear properly`
- `refactor: move business rules to service layer`

Reference:
- https://www.conventionalcommits.org/en/v1.0.0/

## Personal Experience
---

## 💡 Personal Experience
>>>>>>> 135700c (docs: update README and final adjustments)
This project was very important in my learning journey, as it helped me understand how to structure a backend application using a real-world architecture pattern, with clear separation between controllers, services, and the database layer.

During development, I learned how to:

- Build REST APIs using Express
- Structure a scalable project using TypeScript
- Apply business rules in the service layer instead of controllers
- Use Prisma ORM with SQLite for database management
- Write unit tests using Jest with mocked database calls
- Handle errors in a centralized and consistent way

One of the biggest challenges was understanding how to properly separate responsibilities between layers, especially moving validation and business logic into the service layer. After practicing this approach, the project became much cleaner and easier to maintain.

This project had its ups and downs, but it helped me gain confidence in backend development and prepared me for real-world engineering tasks. When working with newly learned technologies for the first time, challenges appear quickly, but I’m grateful for the opportunity because, despite the difficulties, I was able to deliver a complete project.

---

## Notes
- Prisma handles database migrations.
- Services contain the business rules.
- Controllers should only handle HTTP input/output.
- Prefer `catch (error: unknown)` and return a generic message for 500 errors.
- Keep error messages consistent across the API.
```
