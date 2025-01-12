# Polling System Backend

This is a backend application for a polling system that uses Kafka for real-time updates, PostgreSQL for data storage, and WebSockets for broadcasting updates.

---

## Features
- **Poll Creation**: Create polls with multiple options.
- **Vote Submission**: Submit votes for polls via Kafka.
- **Real-Time Updates**: WebSocket server for real-time poll results.
- **Leaderboard**: Fetches the most popular poll options.

---

## Prerequisites
1. **Node.js**: Install from [Node.js website](https://nodejs.org).
2. **PostgreSQL**: Install from [PostgreSQL website](https://www.postgresql.org/download/).
3. **Kafka**: Install or use Docker for Kafka setup.
4. **Docker (Optional)**: For containerized deployment.

---

## Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd polling-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```plaintext
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
KAFKA_HOST=localhost:9092
```

### 4. Start PostgreSQL
- Create a database:
  ```sql
  CREATE DATABASE your_db_name;
  ```
- Set up tables:
  ```sql
  CREATE TABLE polls (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      options JSONB NOT NULL
  );

  CREATE TABLE votes (
      id SERIAL PRIMARY KEY,
      poll_id INT NOT NULL REFERENCES polls(id),
      option TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
  );
  ```

### 5. Start Kafka
- Start Zookeeper and Kafka:
  ```bash
  bin/zookeeper-server-start.sh config/zookeeper.properties
  bin/kafka-server-start.sh config/server.properties
  ```
- Create the `votes` topic:
  ```bash
  bin/kafka-topics.sh --create --topic votes --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
  ```

### 6. Run the Application
Start the server:
```bash
node src/app.js
```

---

## API Endpoints

### Polls
- **Create Poll**:
  ```http
  POST /polls
  Content-Type: application/json

  {
      "question": "What is your favorite programming language?",
      "options": ["JavaScript", "Python", "Java"]
  }
  ```

- **Get Poll Results**:
  ```http
  GET /polls/:id
  ```

### Voting
- **Submit Vote**:
  ```http
  POST /polls/:id/vote
  Content-Type: application/json

  {
      "option": "JavaScript"
  }
  ```

### Leaderboard
- **Get Leaderboard**:
  ```http
  GET /leaderboard
  ```

---

## Testing the Application
1. Use Postman or a similar tool to test APIs.
2. Use WebSocket clients like `websocat` or browser-based tools to test real-time updates.
