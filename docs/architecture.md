 # Architecture Document

 Retail Sales Management System – TruEstate Assignment

 ## 1. Backend Architecture

 ### 1.1 Overview

 The backend follows a modular MVC-based architecture built using Node.js and Express.js. It is responsible for:

 - CSV / data processing
 - Search functionality
 - Multi-filter logic
 - Sorting
 - Pagination
 - Metadata APIs (for filters)

 The architecture keeps business logic separate from request handling, ensuring scalability and maintainability.

 ### 1.2 Backend Layer Design

 1. Routes Layer (`/src/routes`)
    - Defines API endpoints:
      - `salesRoutes.js` → Sales data APIs
      - `metaRoutes.js` → Metadata APIs (filters, dropdown values)
    - Routes forward requests to controllers.

 2. Controller Layer (`/src/controllers`)
    - Handles request validation and response formatting:
      - `salesController.js` → Handles sales queries
      - `metaController.js` → Handles filter metadata
    - Controllers delegate to services and do not contain business logic.

 3. Service Layer (`/src/services`)
    - Contains core business logic (`salesService.js`):
      - Search (Customer Name, Phone)
      - Multi-filters
      - Sorting
      - Pagination
      - Data transformation
    - Keeps logic centralized and reusable across controllers.

 4. Model Layer (`/src/models`)
    - Defines the sales data schema:
      - `Sale.js` → Sales record structure
    - Used for in-memory structured data or as a MongoDB schema for scalable deployments.

 5. Utility Layer (`/src/utils`)
    - Reusable helpers: CSV parsing, query normalization, filter preprocessing, pagination calculations.

 6. Entry Point
    - `src/index.js` initializes the Express server, environment variables, routes and global middleware.

 ### 1.3 Backend Data Handling Strategy

 - Dataset is loaded once at server startup and processed in memory for fast filtering.
 - Indexed/commonly filtered fields:
   - Customer Name
   - Phone Number
   - Date
   - Product Category

 ## 2. Frontend Architecture

 ### 2.1 Overview

 The frontend is built with React (Vite) using a component-based architecture. It manages UI state with React hooks and communicates with the backend through a centralized API service.

 ### 2.2 Frontend Structure

 1. Components Layer (`/src/components`)
    - Reusable UI blocks:
      - `SearchBar.jsx` → Text-based search
      - `FiltersPanel.jsx` → Multi-select filters
      - `SortingBar.jsx` → Sorting dropdown
      - `SalesTable.jsx` → Displays sale records
      - `Pagination.jsx` → Page navigation
    - These are presentational + interaction components.

 2. Services Layer (`/src/services`)
    - `api.js` → Central API handler: builds query parameters, handles HTTP requests and errors.

 3. Assets Layer (`/src/assets`)
    - Stores icons, images and static UI elements.

 4. Styling
    - `App.css` and `index.css` provide global and component-level styling.

 5. Application Entry
    - `App.jsx` → Root UI layout
    - `main.jsx` → React bootstrap file

 ## 3. Data Flow

 ### 3.1 End-to-End Flow

 ```text
 User Action (Search / Filter / Sort / Page)
         ↓
 React State Update
         ↓
 Query Params Built (src/services/api.js)
         ↓
 API Call to Backend
         ↓
 Express Route → Controller
         ↓
 Service Layer Processing
         ↓
 Search → Filters → Sorting → Pagination
         ↓
 JSON Response
         ↓
 SalesTable Re-rendered
 ```

 ### 3.2 Example API Flow

 Frontend request:

 ```text
 GET /api/sales?search=rahul&gender=Male&category=Electronics&page=1&sort=date_desc
 ```

 Backend processing order:

 - Search
 - Filters
 - Sorting
 - Pagination

 Example response:

 ```json
 {
   "data": [ /* 10 records */ ],
   "totalPages": 25,
   "currentPage": 1
 }
 ```

 ## 4. Actual Folder Structure (As Implemented)

 ```text
 root/
 ├── backend/
 │   ├── node_modules/
 │   ├── src/
 │   │   ├── controllers/
 │   │   │   ├── metaController.js
 │   │   │   └── salesController.js
 │   │   ├── models/
 │   │   │   └── Sale.js
 │   │   ├── routes/
 │   │   │   ├── metaRoutes.js
 │   │   │   └── salesRoutes.js
 │   │   ├── services/
 │   │   │   └── salesService.js
 │   │   ├── utils/
 │   │   └── index.js
 │   ├── .env
 │   ├── .gitignore
 │   ├── package.json
 │   ├── package-lock.json
 │   └── README.md
 │
 ├── frontend/
 │   ├── node_modules/
 │   ├── public/
 │   ├── src/
 │   │   ├── assets/
 │   │   ├── components/
 │   │   │   ├── FiltersPanel.jsx
 │   │   │   ├── Pagination.jsx
 │   │   │   ├── SalesTable.jsx
 │   │   │   ├── SearchBar.jsx
 │   │   │   └── SortingBar.jsx
 │   │   ├── services/
 │   │   │   └── api.js
 │   │   ├── App.css
 │   │   ├── App.jsx
 │   │   ├── index.css
 │   │   └── main.jsx
 │   ├── .gitignore
 │   ├── eslint.config.js
 │   ├── index.html
 │   ├── package.json
 │   ├── package-lock.json
 │   ├── README.md
 │   └── vite.config.js
 │
 ├── docs/
 │   └── architecture.md
 │
 ├── README.md
 └── package.json
 ```

 ## 5. Module Responsibilities

 ### 5.1 Backend Modules

 - `salesRoutes.js` — Defines sales APIs
 - `metaRoutes.js` — Metadata & filter APIs
 - `salesController.js` — Handles sales requests
 - `metaController.js` — Handles filter data
 - `salesService.js` — Core search/filter/sort logic
 - `Sale.js` — Sales data schema
 - `utils/` — Reusable helper utilities
 - `index.js` — Server bootstrap

 ### 5.2 Frontend Modules

 - `SearchBar.jsx` — Search input UI
 - `FiltersPanel.jsx` — Filter controls
 - `SortingBar.jsx` — Sorting selection
 - `SalesTable.jsx` — Data display
 - `Pagination.jsx` — Page navigation
 - `api.js` — Backend communication
 - `App.jsx` — Main app layout
 - `main.jsx` — App bootstrap

 ## 6. Architectural Principles Followed

 - Separation of Concerns
 - MVC Pattern (Backend)
 - Unidirectional Data Flow (React)
 - Stateless REST APIs
 - Reusable UI Components
 - Centralized Business Logic
 - Scalable Modular Design

 ---

