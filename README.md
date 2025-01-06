# Cardano API Projects Directory

A list of Cardano API Projects

## Tech Stack

### Frontend

- Next.js with TypeScript
- Tailwind CSS for styling
- Jest for testing

### Backend

- Rust
- Axum for REST API
- Postgres for database
- SQLx for database operations
- Docker for containerization

## Prerequisites

- Node.js (v18 or higher)
- Rust (latest stable version)
- Docker and Docker Compose
- PostgreSQL (if running without Docker)

## Getting Started

### Clone the repository

```bash
git clone https://github.com/cardanoapi/cardanoapi.io.git
cd cardanoapi.io
```

### Backend Development

1. Navigate to the backend directory:

```bash
cd backend/api

```

2. Setup .env file as:

```
//backend/api/.env
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=6500
POSTGRES_USER= <YOUR_POSTGRES_USERNAME>
POSTGRES_PASSWORD=<YOUR_POSTGRES_PASSWORD>
POSTGRES_DB=rust_sqlx

DATABASE_URL=postgresql://<YOUR_POSTGRES_USERNAME>:<YOUR_POSTGRES_PASSWORD>@localhost:6500/rust_sqlx?schema=public

PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=<YOUR_PGADMIN_PASSWORD>

```

3. Install dependencies:

```bash
cargo build
```

4. Start the Postgres Database and PG Admin

```bash
docker compose -f docker-compose.yml up
```

5. Run the Rust server:

```bash
cargo run
```

Test if the server is working at `http://localhost:8000/test`

### Frontend Development

1. Install dependencies:

```bash
npm install
```

2. Setup .env file as:

```
//.env
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=6500
POSTGRES_USER= <YOUR_POSTGRES_USERNAME>
POSTGRES_PASSWORD=<YOUR_POSTGRES_PASSWORD>
POSTGRES_DB=rust_sqlx

DATABASE_URL=postgresql://<YOUR_POSTGRES_USERNAME>:<YOUR_POSTGRES_PASSWORD>@localhost:6500/rust_sqlx?schema=public

PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=<YOUR_PGADMIN_PASSWORD>


# Frontend Configuration
API_URL=http://localhost:8000
NODE_ENV=development
```

2. Run the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Using Docker

#### Development Environment

```bash
docker compose -f docker-compose-dev.yml up
```

#### Production Environment

```bash
docker compose -f docker-compose-prod.yml up
```

## Database Migrations

The project uses SQL migrations located in `backend/api/migrations/`. To run migrations:

1. Ensure you're in the backend/api directory
2. Run:

```bash
sqlx migrate run
```

## Testing

### Frontend Tests

```bash
npm test
```

## Project Structure

```

├── src/
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
        |__ projects
            |_[id]
              |__page.tsx //Project Detail Page
│       ├── page.tsx      //Home Page (/)
│       ├── Component/
│       │   ├── Card.tsx
│       │   ├── Pagination.tsx
│       │   └── SimilarProjects.tsx

└── public/          # Static assets
└── backend (Rust)
    └── api/
        ├── migrations/   # Database migrations
        └── src/         # Rust source code
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
