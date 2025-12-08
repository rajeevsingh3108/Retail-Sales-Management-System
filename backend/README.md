# Retail-Sales-Management-System — Backend

## Overview

This backend service powers the Retail Sales Management System. It provides REST APIs for fetching sales data with full support for search, filtering, sorting, pagination, and metadata retrieval. The backend follows a clean MVC-based architecture built with Node.js and Express.

## Tech Stack

- Node.js
- Express.js
- JavaScript
- CSV / Data processing (in-memory, DB-ready architecture)
- dotenv (environment configuration)

## Features

- Full-text search (customer name, phone number)
- Multi-select filters (region, gender, category, tags, payment method, date range)
- Sorting (date, quantity, customer name)
- Pagination (10 records per page)
- Metadata APIs for dynamic filter options
- Clean separation of Routes, Controllers, Services, and Models

## Folder Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── metaController.js
│   │   └── salesController.js
│   ├── models/
│   │   └── Sale.js
│   ├── routes/
│   │   ├── metaRoutes.js
│   │   └── salesRoutes.js
│   ├── services/
│   │   └── salesService.js
│   ├── utils/
│   └── index.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Core APIs

- `GET /api/sales` — Fetch sales with search, filters, sorting, and pagination
- `GET /api/meta` — Fetch metadata for filters (categories, regions, etc.)

## Architecture Overview

- Routes: define API endpoints.
- Controllers: handle request/response flow.
- Services: implement business logic (search, filter, sort, paginate).
- Models: define data structures.
- Utils: reusable helper functions.

## Setup Instructions

1. Navigate to backend folder:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file (example):

```
PORT=5000
# Add other env vars if needed (e.g. DATA_PATH)
```

4. Start the server:

```
npm start
```

The server will run on `http://localhost:5000` by default (or the port configured in `.env`).

## Data Handling

- The dataset is loaded once at server startup.
- All search, filter, sort, and pagination operations are handled at the service level.
- The codebase is designed to support both in-memory processing and database-backed scaling.

## Error Handling

The service includes graceful handling for:

- Invalid query parameters
- Empty result sets
- Conflicting filters
- Invalid pagination requests

## Author

Rajeev Singh

Retail Sales Management System — TruEstate Assignment

