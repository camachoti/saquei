# Getting Started

## 1. Install PostgreSQL

```bash
sudo docker pull postgres
```

```bash
docker run -d --name postgres_container -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres
```

## 2. Install Redis Stack

```bash
sudo docker pull redis/redis-stack-server:latest
```

```bash
sudo docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
```

## 3. Start Application

1. Execute the Spring Boot application:  
   Run `CoreBackendApplication` via your IDE or with Maven.

2. Access the REST API:  
   [http://localhost:8081/api](http://localhost:8081/api)

3. Run tests:
   ```bash
   mvn test
   ```

---

**Tip:**  
Make sure Docker is running and the containers are up before starting the application.