 # Architecture Document

 This document describes the high-level architecture for the Retail Sales Management System (TruEstate assignment). It covers backend and frontend responsibilities, data flow, folder layout, and module responsibilities.

 ## Backend architecture

 - **Platform:** Node.js with Express
 - **Pattern:** Modular separation — Routes → Controllers → Services → Models, plus a `utils` layer for shared helpers
 - **Responsibilities:**
   - Load and normalize CSV sales data at startup
   - Expose REST endpoints (`/api/sales`, `/api/meta`) to support search, filters, sorting and pagination
   - Centralize business logic in the service layer (`salesService`) so controllers remain thin

 ## Frontend architecture

 - **Platform:** React (Vite)
 - **Structure:** Component-driven UI with a single `api` service for building queries and HTTP interactions
 - **Responsibilities:**
   - Render search, filters, sorting controls, sales table and pagination
   - Maintain top-level UI state (search, filters, sort, page)
   - Convert UI state into query parameters and call backend via `src/services/api.js`

 ## Data flow

 ```text
 User Action (Search / Filter / Sort / Page)
                 ↓
 React state updates → query params built (`src/services/api.js`)
                 ↓
 API call to backend `/api/sales?...`
                 ↓
 Express route → controller → service layer processing
                 ↓
 Service applies: search → filters → sort → paginate
                 ↓
 JSON response → frontend updates SalesTable and pagination
 ```

 ## Folder structure (key files)

 ```
 backend/
   package.json
   src/
     index.js
     routes/
       salesRoutes.js
       metaRoutes.js
     controllers/
       salesController.js
       metaController.js
     services/
       salesService.js
     models/
       Sale.js
     utils/

 frontend/
   package.json
   src/
     main.jsx
     App.jsx
     components/
       SearchBar.jsx
       FiltersPanel.jsx
       SortingBar.jsx
       SalesTable.jsx
       Pagination.jsx
     services/
       api.js

 docs/
   architecture.md
 ```

 ## Module responsibilities (summary)

 - `backend/src/index.js` — bootstrap server, register middleware (CORS, JSON) and mount routes
 - `backend/src/routes/*` — define endpoints and attach controllers
 - `backend/src/controllers/*` — parse/validate requests, delegate to services, format responses
 - `backend/src/services/salesService.js` — implement search, multi-filtering, sorting and pagination
 - `backend/src/models/Sale.js` — canonical sales record schema used across services
 - `backend/src/utils/*` — CSV parsing, date helpers and shared utilities

 - `frontend/src/services/api.js` — build query strings, perform fetch requests and normalize responses
 - `frontend/src/components/*` — UI components that emit events to update top-level state and render data

 ---

 Example request:

 ```text
 GET /api/sales?search=smith&region=East&category=Electronics&page=2&sort=amount_desc
 ```

 Processing order on server: search → filter → sort → paginate (keeps pagination counts consistent)
                        src/

