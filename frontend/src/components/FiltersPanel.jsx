import React, { useEffect, useState } from "react";
import { fetchTags } from "../services/api";

const REGION_OPTIONS = ["North", "South", "East", "West", "Central"];
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

  const [showDatePanel, setShowDatePanel] = useState(false);

  useEffect(() => {
    loadTags();
  }, []);

  async function loadTags() {
    try {
      const tags = await fetchTags();
      setDynamicTags(tags || []);
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }
  }

  const handleSingleSelect = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value ? [value] : [],
    }));
  };

  const handleAddTag = (value) => {
    if (!value) return;
    setFilters((prev) => {
      const list = prev.tags || [];
      if (list.includes(value)) return prev;
      return { ...prev, tags: [...list, value] };
    });
  };

  const handleRemoveTag = (tag) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const ageValue =
    filters.minAge && filters.maxAge
      ? `${filters.minAge}-${filters.maxAge}`
      : "";

  return (
    <div className="filters">
      <button
        type="button"
        className="refresh-btn"
        onClick={() => {
          onReset();
          setShowDatePanel(false);
        }}
      >
        ⟳
      </button>

      <select
        value={filters.region[0] || ""}
        onChange={(e) => handleSingleSelect("region", e.target.value)}
      >
        <option value="">Customer Region</option>
        {REGION_OPTIONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        value={filters.gender[0] || ""}
        onChange={(e) => handleSingleSelect("gender", e.target.value)}
      >
        <option value="">Gender</option>
        {GENDER_OPTIONS.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
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
        value={filters.category[0] || ""}
        onChange={(e) => handleSingleSelect("category", e.target.value)}
      >
        <option value="">Product Category</option>
        {CATEGORY_OPTIONS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="tag-multiselect">
        <select value="" onChange={(e) => handleAddTag(e.target.value)}>
          <option value="">Tags</option>
          {dynamicTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {filters.tags.length > 0 && (
          <div className="selected-tags">
            {filters.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
                <button
                  type="button"
                  className="tag-chip-remove"
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <select
        value={filters.paymentMethod[0] || ""}
        onChange={(e) =>
          handleSingleSelect("paymentMethod", e.target.value)
        }
      >
        <option value="">Payment Method</option>
        {PAYMENT_OPTIONS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <div className="date-wrapper">
        <button
          type="button"
          className="date-button"
          onClick={() => setShowDatePanel((prev) => !prev)}
        >
          {filters.startDate && filters.endDate
            ? `${filters.startDate} → ${filters.endDate}`
            : "Date"}
        </button>

        {showDatePanel && (
          <div className="date-panel">
            <div className="date-panel-field">
              <label>Start Date</label>
              <input
                type="date"
                value={filters.startDate || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
              />
            </div>

            <div className="date-panel-field">
              <label>End Date</label>
              <input
                type="date"
                value={filters.endDate || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
              />
            </div>

            <div className="date-panel-actions">
              <button
                type="button"
                className="date-apply"
                onClick={() => setShowDatePanel(false)}
              >
                Apply
              </button>

              <button
                type="button"
                className="date-clear"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    startDate: "",
                    endDate: "",
                  }));
                  setShowDatePanel(false);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FiltersPanel;
