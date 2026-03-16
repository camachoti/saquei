# AGENTS.md

## Project Overview

Full-stack monorepo: **Angular 19 frontend** + **Spring Boot 3.4.4 backend**.

```
core-monolith-study/
├── backend/    # Java 21, Maven, Spring Boot, REST API
├── frontend/   # Angular 19, PrimeNG 19, Tailwind CSS
├── docker-compose.yml   # PostgreSQL 16 + Redis Stack
├── .gitignore
└── README.md
```

---

## Critical Commands

### Infrastructure (always first)
```bash
docker compose up -d        # start PostgreSQL :5432 + Redis :6379
docker compose down         # stop
```

### Backend
```bash
cd backend
./mvnw spring-boot:run      # dev server → http://localhost:8081
./mvnw test                 # uses H2 in-memory (no Docker needed for tests)
./mvnw package -DskipTests  # build JAR
```

### Frontend
```bash
cd frontend
npm install                 # first time only
npm start                   # dev server → http://localhost:4200
npm run build               # production build → dist/core-frontend-study/
npm test                    # Karma/Jasmine unit tests
npm run format              # Prettier formatting
```

---

## Architecture & Data Flow

```
Angular :4200  →  POST /auth/login   →  Spring Boot :8081  →  PostgreSQL
               ←  { token, name }    ←
                                         Spring Boot        →  Redis (sessions)
```

- JWT stored in `sessionStorage` (keys: `auth-token`, `username`)
- `AuthGuard` (`frontend/src/app/services/auth-guard.service.ts`) redirects unauthenticated users to `/auth/login`
- Backend CORS: hardcoded to `http://localhost:4200` in `backend/src/main/java/com/br/corebackend/api/WebConfig.java`
- Backend API base: `http://localhost:8081` — hardcoded in `frontend/src/app/services/login.service.ts`

---

## Backend Conventions

- Package root: `com.br.corebackend`
- Layers: `api/` (controllers), `security/`, `model/`, `dto/`, `repository/`, `config/`
- DTOs are Java **records** (e.g. `LoginRequestDTO`, `LoginResponseDTO`)
- **Lombok** (`@RequiredArgsConstructor`) used for constructor injection
- JWT generated/validated in `security/TokenService.java` using `com.auth0:java-jwt:4.4.0`
- `application.properties` → prod (PostgreSQL); `application-test.properties` → H2 (auto on `test` profile)
- i18n: `messages_en.properties` + `messages_pt_BR.properties` in `src/main/resources/`

## Frontend Conventions

- **Standalone components** (Angular 19, no NgModules)
- Two `app.config.ts` / `app.routes.ts` exist at both `src/` and `src/app/` — the root `src/app.config.ts` is the active entry used by `src/main.ts`
- UI library: **PrimeNG 19** with `Aura` theme preset; dark mode toggle via `.app-dark` CSS class
- Styles: **SCSS** per component + global Tailwind (`src/tailwind.css`) + PrimeUI utilities
- Auth pages: `src/app/pages/auth/` (login + signup); protected layout: `src/app/components/layout/`
- Services in `src/app/services/` (auth) and `src/app/pages/service/` (PrimeNG demo data services)

---

## Key Files

| Purpose | Path |
|---|---|
| Backend entry point | `backend/src/main/java/com/br/corebackend/CoreBackendApplication.java` |
| Security config | `backend/src/main/java/com/br/corebackend/security/SecurityConfig.java` |
| CORS config | `backend/src/main/java/com/br/corebackend/api/WebConfig.java` |
| Auth endpoints | `backend/src/main/java/com/br/corebackend/api/AuthController.java` |
| App properties (prod) | `backend/src/main/resources/application.properties` |
| App properties (test) | `backend/src/test/resources/application-test.properties` |
| Frontend entry | `frontend/src/main.ts` |
| App config (active) | `frontend/src/app.config.ts` |
| App routes (active) | `frontend/src/app/app.routes.ts` |
| Login service | `frontend/src/app/services/login.service.ts` |
| Auth guard | `frontend/src/app/services/auth-guard.service.ts` |

