# Retail-Sales-Management-System - Frontend

## Overview

This frontend application provides the user interface for the Retail Sales Management System. It enables users to search, filter, sort, and paginate sales transactions through a responsive and clean dashboard built using React and Vite.

## Tech Stack

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Axios / Fetch API

## Features

- Search by Customer Name and Phone Number
- Multi-select Filters (Region, Gender, Category, Tags, Payment Method, Date Range)
- Sorting (Date, Quantity, Customer Name)
- Pagination (10 records per page)
- Responsive dashboard layout
- Dynamic data rendering from backend APIs

## Folder Structure

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── FiltersPanel.jsx
│   │   ├── Pagination.jsx
│   │   ├── SalesTable.jsx
│   │   ├── SearchBar.jsx
│   │   └── SortingBar.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## Architecture Overview

- Component-Based Architecture
- Stateless UI components with centralized state in `App.jsx`
- Reusable and modular UI blocks
- REST API integration via a single service layer (`src/services/api.js`)
- Unidirectional data flow

## Component Responsibilities

| Component | Responsibility |
|---|---|
| `SearchBar.jsx` | Handles search input |
| `FiltersPanel.jsx` | Handles all filter selections |
| `SortingBar.jsx` | Handles sorting options |
| `SalesTable.jsx` | Renders transaction table |
| `Pagination.jsx` | Handles page navigation |
| `App.jsx` | Overall layout and state manager |

## API Integration

All API communication is handled through:

```
src/services/api.js
```

Responsibilities:

- API request construction
- Query parameter handling
- Error handling
- Response normalization

## Setup Instructions

1. Navigate to the frontend folder:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

4. Open in browser:

```
http://localhost:5173
```

## Environment Configuration

If required, update backend base URL in:

```
src/services/api.js
```

## UI Guidelines Followed

- Figma-based layout compliance
- Minimal and structured dashboard
- Sticky filter panel
- Scrollable transaction table
- Accessible input controls

## Error Handling

Graceful handling of:

- No search results
- Invalid filter combinations
- API failures
- Empty states

## Author

Rajeev Singh

Retail Sales Management System – TruEstate Assignment

