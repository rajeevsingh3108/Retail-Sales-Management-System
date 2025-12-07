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

  region: filters.region.length
    ? filters.region.join(",")
    : undefined,

  gender: filters.gender.length
    ? filters.gender.join(",")
    : undefined,

  category: filters.category.length
    ? filters.category.join(",")
    : undefined,

  tags: filters.tags.length
    ? filters.tags.join(",")
    : undefined,

  paymentMethod: filters.paymentMethod.length
    ? filters.paymentMethod.join(",")
    : undefined,

  minAge: filters.minAge ? filters.minAge : undefined,
  maxAge: filters.maxAge ? filters.maxAge : undefined,

  startDate: filters.startDate || undefined,
endDate: filters.endDate || undefined,


  sortBy,
  sortOrder,
  page,
  limit,
};



      const data = await fetchSales(params);

      setSales(data.data);
      setMeta(data.meta);

      const totalUnits = data.data.reduce((sum, x) => sum + (x.quantity || 0), 0);
      const totalAmount = data.data.reduce(
        (sum, x) => sum + (x.finalAmount || 0),
        0
      );
      const totalDiscount = data.data.reduce(
        (sum, x) => sum + (x.discountPercentage || 0),
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
        <h2>Sales Management System</h2>
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

      {!loading && !error && <SalesTable sales={sales} />}
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
      />
    </div>
  );
}

export default App;
