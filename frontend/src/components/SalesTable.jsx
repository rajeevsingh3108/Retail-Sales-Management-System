import React from "react";

export default function SalesTable({ sales }) {
  return (
    <table className="sales-table">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Date</th>
          <th>Customer ID</th>
          <th>Customer Name</th>
          <th>Phone Number</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Product Category</th>
          <th>Quantity</th>
          <th>Total Amount</th>
          <th>Customer Region</th>
          <th>Product ID</th>
          <th>Employee Name</th>
        </tr>
      </thead>

      <tbody>
        {sales.map((s) => (
          <tr key={s["Transaction ID"]}>
            <td>{s["Transaction ID"]}</td>

            <td>
              {s["Date"]
                ? new Date(s["Date"]).toLocaleDateString()
                : "-"}
            </td>

            <td>{s["Customer ID"]}</td>

            <td>{s["Customer Name"]}</td>

            <td
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {s["Phone Number"]}
              <button
                onClick={() =>
                  navigator.clipboard.writeText(s["Phone Number"])
                }
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#7A7B8E",
                  fontSize: "14px",
                }}
                title="Copy"
              >
                ⧉
              </button>
            </td>

            <td>{s["Gender"]}</td>

            <td>{s["Age"]}</td>

            <td className="bold-cell">
              {s["Product Category"]}
            </td>

            <td className="bold-cell">{s["Quantity"]}</td>

            <td className="bold-cell">
              ₹ {s["Final Amount"]}
            </td>

            <td className="bold-cell">
              {s["Customer Region"]}
            </td>

            <td className="bold-cell">{s["Product ID"]}</td>

            <td className="bold-cell">
              {s["Employee Name"]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
