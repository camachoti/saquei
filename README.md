# saquei

Monorepo combining a **Spring Boot 3 backend** and an **Angular 21 frontend** for a full-stack authentication study project.

```
saquei/
├── backend/          # Spring Boot 3.4.4, Java 21, REST API + JWT Auth
├── frontend/         # Angular 19, PrimeNG 19, Tailwind CSS
├── docker-compose.yml
└── .gitignore
```

---

## AI Coding Guidelines

Canonical source: `AGENTS.md`.

- Write all code identifiers in English (`class`, `interface`, `type`, `enum`, variables, methods, functions, constants, files, and folders).
- Use clear and descriptive names in `PascalCase` for classes and types.
- Write all source code comments in English.
- Comments should explain intent, constraints, or non-obvious decisions; avoid obvious comments.
- Keep language consistent across backend and frontend code.

---

## Prerequisites

- Docker (for infrastructure)
- Java 21 + Maven (for backend)
- Node.js 20+ + Angular CLI 19 (for frontend)

---

## 1. Start Infrastructure (Docker)

```bash
docker compose up -d
```

This starts:
- **PostgreSQL 16** on `localhost:5432` (user/pass: `postgres/postgres`)
- **Redis Stack** on `localhost:6379`

Stop with:
```bash
docker compose down
```

---

## 2. Backend (Spring Boot)

### Run
```bash
cd backend
./mvnw spring-boot:run
```

API available at: [http://localhost:8081](http://localhost:8081)

### Test
```bash
cd backend
./mvnw test
```

Tests use H2 in-memory database (profile `test` is auto-activated via `src/test/resources/application-test.properties`).

### Key configuration

| Property | Value |
|---|---|
| Port | `8081` |
| Database | PostgreSQL `localhost:5432/postgres` |
| Redis | `localhost:6379` |
| JWT secret | `api.security.token.secret` in `application.properties` |

---

## 3. Frontend (Angular)

### Install dependencies
```bash
cd frontend
npm install
```

### Run dev server
```bash
cd frontend
npm start
```

App available at: [http://localhost:4200](http://localhost:4200)

### Build for production
```bash
cd frontend
npm run build
```

### Run unit tests
```bash
cd frontend
npm test
```

### Lint / Format
```bash
cd frontend
npm run format
```

---

## Architecture

```
Browser (Angular 19 :4200)
    │  HTTP/JWT
    ▼
Spring Boot (:8081)
    ├── /auth/login     → JWT token
    ├── /auth/register  → User registration
    └── /translation    → i18n endpoint
    │
    ├── PostgreSQL (:5432) → User persistence
    └── Redis (:6379)      → Session/token management
```

The Angular frontend stores the JWT token in `sessionStorage` and sends it via the `Authorization` header on protected routes, guarded by `AuthGuard`.

CORS is configured on the backend to allow `http://localhost:4200`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Spring Boot 3.4.4, Java 21, Spring Security, JWT (Auth0 v4) |
| Persistence | Spring Data JPA, PostgreSQL (prod), H2 (test) |
| Cache/Session | Spring Data Redis |
| Frontend | Angular 21, PrimeNG 21, Tailwind CSS 3, Chart.js |
| Build | Maven (backend), Angular CLI / npm (frontend) |
| Infrastructure | Docker Compose |

