# Movies API

REST API for managing movies and directors, built with Node.js, Express, and TypeScript, using Prisma ORM with SQLite.

## Features

### Movies
| Method | Endpoint | Description |
|--------|----------|-----------|
| POST | `/movies` | Creates a new movie |
| GET | `/movies` | Lists all movies (filters: title, genre, releaseYear) |
| GET | `/movies/:id` | Returns a movie by ID
| PUT | `/movies/:id` | Updates a movie |
| DELETE | `/movies/:id` | Deletes a movie |

### Directors
| Method | Endpoint | Description |
|--------|----------|-----------|
| POST | `/directors` | Creates a new director |
| GET | `/directors` | Lists all directors |
| GET | `/directors/:id` | Returns a director by ID |
| PUT | `/directors/:id` | Updates a director’s name |
| DELETE | `/directors/:id` | Deletes a director (fails if they have associated movies) |
| GET | `/directors/:id/movies` | Lists all movies from a director |

## Installation and Running
### Local

```bash
npm install
npx prisma migrate dev
npm run dev
```

### Docker

```bash
docker-compose up --build
```

The application will be available at: `http://localhost:3000`.

## Tests

```bash
npm test
```
