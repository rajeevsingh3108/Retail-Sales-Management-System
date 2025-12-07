import React, { useEffect, useState } from "react";
import { fetchTags } from "../services/api";

const REGION_OPTIONS = ["North", "South", "East", "West"];
const GENDER_OPTIONS = ["Male", "Female"];
const CATEGORY_OPTIONS = ["Electronics", "Clothing", "Beauty"];
const PAYMENT_OPTIONS = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "UPI",
  "Wallet",
  "Net Banking",
];

function FiltersPanel({ filters, setFilters, onReset }) {
  const [dynamicTags, setDynamicTags] = useState([]);

  const [dateStep, setDateStep] = useState(0);
  const [tempStartDate, setTempStartDate] = useState("");

  useEffect(() => {
    loadTags();
  }, []);

  async function loadTags() {
    try {
      const tags = await fetchTags();
      setDynamicTags(tags);
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }
  }

  const handleMultiSelect = (key, value) => {
    if (!value) return;

    setFilters((prev) => {
      const list = prev[key] || [];
      return {
        ...prev,
        [key]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value],
      };
    });
  };

  const ageValue =
    filters.minAge && filters.maxAge
      ? `${filters.minAge}-${filters.maxAge}`
      : "";

  const dateDisplay =
    filters.startDate && filters.endDate
      ? `${filters.startDate} → ${filters.endDate}`
      : "Date";

  return (
    <div className="filters">
      <button
        type="button"
        className="refresh-btn"
        onClick={() => {
          onReset();
          setDateStep(0);
          setTempStartDate("");
        }}
      >
        ⟳
      </button>
      <select
        value={filters.region[filters.region.length - 1] || ""}
        onChange={(e) => handleMultiSelect("region", e.target.value)}
      >
        <option value="">Customer Region</option>
        {REGION_OPTIONS.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <select
        value={filters.gender[filters.gender.length - 1] || ""}
        onChange={(e) => handleMultiSelect("gender", e.target.value)}
      >
        <option value="">Gender</option>
        {GENDER_OPTIONS.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <select
        value={ageValue}
        onChange={(e) => {
          const value = e.target.value;
          if (!value) {
            setFilters((prev) => ({ ...prev, minAge: "", maxAge: "" }));
            return;
          }
          const [min, max] = value.split("-");
          setFilters((prev) => ({ ...prev, minAge: min, maxAge: max }));
        }}
      >
        <option value="">Age Range</option>
        <option value="0-18">0 - 18</option>
        <option value="19-25">19 - 25</option>
        <option value="26-35">26 - 35</option>
        <option value="36-45">36 - 45</option>
        <option value="46-60">46 - 60</option>
        <option value="60-120">60+</option>
      </select>

      <select
        value={filters.category[filters.category.length - 1] || ""}
        onChange={(e) => handleMultiSelect("category", e.target.value)}
      >
        <option value="">Product Category</option>
        {CATEGORY_OPTIONS.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={filters.tags[filters.tags.length - 1] || ""}
        onChange={(e) => handleMultiSelect("tags", e.target.value)}
      >
        <option value="">Tags</option>
        {dynamicTags.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <select
        value={filters.paymentMethod[filters.paymentMethod.length - 1] || ""}
        onChange={(e) => handleMultiSelect("paymentMethod", e.target.value)}
      >
        <option value="">Payment Method</option>
        {PAYMENT_OPTIONS.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <div className="date-wrapper">
        <button type="button" className="date-btn">
          {dateDisplay}
        </button>

        <input
          type="date"
          className="date-overlay"
          onChange={(e) => {
            const selectedDate = e.target.value;

            if (dateStep === 0) {
              setTempStartDate(selectedDate);
              setFilters((prev) => ({
                ...prev,
                startDate: selectedDate,
                endDate: "",
              }));
              setDateStep(1);
            } else {
              const end =
                selectedDate < tempStartDate
                  ? tempStartDate
                  : selectedDate;

              setFilters((prev) => ({
                ...prev,
                startDate: tempStartDate,
                endDate: end,
              }));
              setTempStartDate("");
              setDateStep(0);
            }
          }}
        />
      </div>
    </div>
  );
}

export default FiltersPanel;
