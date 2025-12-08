import React, { useEffect, useState } from "react";
import { fetchSales } from "./services/api";
import SearchBar from "./components/SearchBar";
import FiltersPanel from "./components/FiltersPanel";
import SortingBar from "./components/SortingBar";
import SalesTable from "./components/SalesTable";
import Pagination from "./components/Pagination";
import "./index.css";

function App() {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    region: [],
    gender: [],
    category: [],
    tags: [],
    paymentMethod: [],
    minAge: "",
    maxAge: "",
    startDate: "",
    endDate: "",
  });

  const [sortBy, setSortBy] = useState("customerName");
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [sales, setSales] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });

  const [stats, setStats] = useState({
    totalUnits: 0,
    totalAmount: 0,
    totalDiscount: 0,
  });

  useEffect(() => {
    if (sortBy === "customerName") setSortOrder("asc");
    if (sortBy === "quantity") setSortOrder("desc");
    if (sortBy === "date") setSortOrder("desc");
  }, [sortBy]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const resetAll = () => {
    setSearch("");
    setFilters({
      region: [],
      gender: [],
      category: [],
      tags: [],
      paymentMethod: [],
      minAge: "",
      maxAge: "",
      startDate: "",
      endDate: "",
    });
    setPage(1);
    setSortBy("customerName");
    setSortOrder("asc");
  };
  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const params = {
        search: search || undefined,

        region: filters.region.length ? filters.region.join(",") : undefined,

        gender: filters.gender.length ? filters.gender.join(",") : undefined,

        category: filters.category.length
          ? filters.category.join(",")
          : undefined,

        tags: filters.tags.length ? filters.tags.join(",") : undefined,

        paymentMethod: filters.paymentMethod.length
          ? filters.paymentMethod.join(",")
          : undefined,

        minAge: filters.minAge || undefined,
        maxAge: filters.maxAge || undefined,

        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,

        sortBy,
        sortOrder,
        page,
        limit,
      };

      const response = await fetchSales(params);
      setSales(response.data);

      setMeta({
        page: response.currentPage,
        totalPages: response.totalPages,
        hasNext: response.currentPage < response.totalPages,
        hasPrev: response.currentPage > 1,
      });
      const totalUnits = response.data.reduce(
        (sum, x) => sum + (x["Quantity"] || 0),
        0
      );
      const totalAmount = response.data.reduce(
        (sum, x) => sum + (x["Final Amount"] || 0),
        0
      );

      const totalDiscount = response.data.reduce(
        (sum, x) => sum + (x["Discount Percentage"] || 0),
        0
      );

      setStats({ totalUnits, totalAmount, totalDiscount });
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [search, filters, sortBy, sortOrder, page]);

  useEffect(() => {
    setPage(1);
  }, [search, filters, sortBy, sortOrder]);

  return (
    <div className="dashboard">
      <div className="header">
        <h2>Retail Sales Management System</h2>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="filter-row">
        <FiltersPanel
          filters={filters}
          setFilters={setFilters}
          onReset={resetAll}
        />

        <SortingBar
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
        />
      </div>

      <div className="stats-row">
        <div className="stat-card">
          Total units sold <br />
          <b>{stats.totalUnits}</b>
        </div>

        <div className="stat-card">
          Total Amount <br />
          <b>₹ {stats.totalAmount}</b>
        </div>

        <div className="stat-card">
          Total Discount <br />
          <b>{stats.totalDiscount}</b>
        </div>
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <div className="sales-table-wrapper">
          <SalesTable sales={sales} />
        </div>
      )}

      {!loading && sales.length === 0 && (
        <div className="no-data">No results found</div>
      )}

      <Pagination
        page={meta.page}
        totalPages={meta.totalPages}
        hasNext={meta.hasNext}
        hasPrev={meta.hasPrev}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => meta.hasNext && setPage((p) => p + 1)}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}

export default App;
