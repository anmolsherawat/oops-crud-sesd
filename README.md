## OOP CRUD Backend – Books API

This project is a **Node.js + TypeScript** backend that demonstrates **clean OOP architecture** for a full-fledged CRUD API (non-Todo example) using a `Book` entity.

The structure is inspired by the `sesd_workshop` repository [`onlyaditya/sesd_workshop`](https://github.com/onlyaditya/sesd_workshop) but implemented from scratch with:

- **Controllers → Services → Repositories → Models**
- **Create / Get (single + list) / Update / Delete**
- **Search, filter, sorting, pagination**
- **Validation and centralized error handling**
- **Simple header-based authentication middleware**

---

### Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express
- **Database**: MongoDB (via Mongoose)

---

### Project Structure (src)

- `app.ts` – App class, Express setup, DB connection, routes, error handling
- `server.ts` – Bootstrap file to start the application
- `controller/book.controller.ts` – HTTP layer for Book endpoints
- `services/book.service.ts` – Business logic and validation
- `repositories/book.repository.ts` – Data access using Mongoose
- `schema/book.schema.ts` – Mongoose schema/model for `Book`
- `routes/book.routes.ts` – Route definitions and auth protection
- `utils/auth.middleware.ts` – Simple API-key based auth middleware

Existing Todo-related files are kept for reference but the **primary example** is the `Book` domain.

---

### Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Create a `.env` file** in the project root:

```bash
MONGO_URI=mongodb://127.0.0.1:27017/sesd_workshop
PORT=4000
API_KEY=supersecretapikey   # optional; if omitted, auth is disabled
```

3. **Run in development mode**

```bash
npm run dev
```

4. **Build and run production build**

```bash
npm run build
npm start
```

---

### Authentication

- The API uses a simple **header-based auth**:
  - Header: `Authorization: Bearer <API_KEY>`
  - `API_KEY` is read from your `.env`.
- If `API_KEY` is **not** set, auth is effectively disabled (useful for local development).

All `/api/books` routes are protected by this middleware.

---

### Books API

Base path: `/api/books`

- **Create Book**
  - `POST /api/books`
  - Body (JSON):
    - `title` (string, required)
    - `author` (string, required)
    - `publishedYear` (number, required)
    - `genre` (string, optional)
    - `price` (number, optional)
    - `inStock` (boolean, optional, defaults to true)

- **Get Books (list with search/filter/sort/pagination)**
  - `GET /api/books`
  - Query params:
    - `page` (number, default: 1)
    - `limit` (number, default: 10)
    - `search` (string; matches `title` or `author`, case-insensitive)
    - `genre` (string)
    - `inStock` (`true` / `false`)
    - `minPrice` (number)
    - `maxPrice` (number)
    - `sortBy` (string, e.g. `createdAt`, `price`, `title`)
    - `sortOrder` (`asc` or `desc`, default: `desc`)

- **Get Single Book**
  - `GET /api/books/:id`

- **Update Book**
  - `PUT /api/books/:id`
  - Body: any subset of the create fields.

- **Delete Book**
  - `DELETE /api/books/:id`

---

### Error Handling & Validation

- The `BookService` performs basic **input validation** (required fields, numeric checks).
- All errors are passed to a centralized **Express error handler** in `app.ts`, which returns a JSON response:

```json
{
  "success": false,
  "message": "Error message here"
}
```

---

### Notes for Reviewers

- The code is structured to clearly separate:
  - HTTP/controller concerns
  - Business/service logic and validation
  - Persistence/repository and Mongoose models
- The design follows the OOP style demonstrated in `sesd_workshop` while tailoring the domain to a **Book** entity instead of Todo.
