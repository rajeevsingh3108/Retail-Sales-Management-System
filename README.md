**Retail Sales Management System**

- **Project:** Retail Sales Management System for TruEstate SDE Intern Assignment.
- **Purpose:** A full‑stack dashboard that enables efficient searching, filtering, sorting, and paginating of large retail transaction datasets through a clean, responsive UI.

**Tech Stack**
- **Frontend:** React.js, Vite, JavaScript, HTML, CSS
- **Backend:** Node.js, Express.js
- **Utilities:** Axios / Fetch API, dotenv
- **Data Handling:** CSV / In-memory processing (DB-ready architecture)

**Key Features**
- **Full-text Search:** Customer Name and Phone Number (case-insensitive, trimmed, normalized). Search runs at the backend service layer and works together with active filters, sorting, and pagination.
- **Filters:** Multi-select and range filters for Customer Region, Gender, Age Range, Product Category, Tags, Payment Method, and Date Range. Filters are dynamically populated from metadata APIs and persist across sorting/pagination.
- **Sorting:** Supported on Date (newest first), Quantity, and Customer Name (A–Z). Sorting is stable, applied server-side after filtering, and preserves active search/filter states.
- **Pagination:** Server-driven pagination with 10 records per page, Next/Previous navigation, and API responses that include total pages and current page. Active search, filters, and sort states are retained during navigation.

**Search Implementation Summary**
- **Fields:** Customer Name, Phone Number
- **Behavior:** Case-insensitive, trimmed, normalized; processed in backend service layer for performance and consistency; integrates with filters, sorting, and pagination.

**Filter Implementation Summary**
- **Supported Filters:** Customer Region, Gender, Age Range, Product Category, Tags, Payment Method, Date Range
- **Behavior:** Filters can be used independently or together; state is maintained across sorting and pagination; options are populated dynamically from the backend metadata endpoint.

**Sorting Implementation Summary**
- **Sort Keys:** Date (Newest first), Quantity, Customer Name (A–Z)
- **Behavior:** Sorting preserves active search and filters; applied at the backend after filtering; uses stable sorting logic.

**Pagination Implementation Summary**
- **Page Size:** 10 records per page
- **Navigation:** Next / Previous
- **Behavior:** Backend-driven page calculation; API returns total pages and current page; retains active search/filter/sort states.

**Folder Structure**

Root project layout (top-level important files and folders):

```
TRUESTATE-RETAIL/
├─ backend/
│  ├─ package.json
│  ├─ README.md
│  └─ src/
│     ├─ index.js
│     ├─ controllers/
│     │  ├─ metaController.js
│     │  └─ salesController.js
│     ├─ models/
│     │  └─ Sale.js
│     ├─ routes/
│     │  ├─ metaRoutes.js
│     │  └─ salesRoutes.js
│     ├─ services/
│     │  └─ salesService.js
│     └─ utils/
│        └─ index.js
├─ frontend/
│  ├─ package.json
│  ├─ README.md
│  ├─ index.html
│  ├─ vite.config.js
│  └─ src/
│     ├─ main.jsx
│     ├─ App.jsx
│     ├─ App.css
│     ├─ index.css
│     ├─ assets/
│     ├─ components/
│     │  ├─ FiltersPanel.jsx
│     │  ├─ Pagination.jsx
│     │  ├─ SalesTable.jsx
│     │  ├─ SearchBar.jsx
│     │  └─ SortingBar.jsx
│     └─ services/
│        └─ api.js
├─ docs/
│  └─ architecture.md
└─ README.md
```

**Screenshot**
- A sample dashboard screenshot is included with the assignment attachments. To display it in this README, save the image as `docs/dashboard-screenshot.png` and it will render below:

![Retail Sales Dashboard](docs/dashboard-screenshot.png)

**Setup Instructions**

Clone the repository

```bash
git clone https://github.com/rajeevsingh3108/Retail-Sales-Management-System.git
cd TRUESTATE-RETAIL
```

Backend Setup

```bash
cd backend
npm install
npm start
```

The backend will run on:

- `http://localhost:5000` (default)

Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

- `http://localhost:5173` (Vite default)

**API & Data Notes**
- The backend is designed to process CSV or in-memory datasets and follows a DB-ready architecture so swapping in a real database is straightforward.
- Search, filter, sort, and pagination are implemented at the backend service layer to ensure consistent, performant responses when the dataset grows.

**Development Tips**
- Keep filter and search state in the frontend query parameters or component state when navigating so the backend can respond with the correct paged result.
- Metadata endpoints are used to populate filter options dynamically; call them on app start or when relevant parameters change.

**Next Steps / Suggestions**
- Persist dataset in a database (PostgreSQL, MongoDB) for production use.
- Add unit/integration tests for controllers and services.
- Add Dockerfiles and a `docker-compose.yml` to simplify local environment setup.

If you'd like, I can also add a `docs/dashboard-screenshot.png` file (from the provided attachment) into `docs/` and commit it for you — tell me to proceed and I'll create the file here.
