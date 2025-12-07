import React from "react";

export default function SalesTable({ sales }) {
  return (
    <table className="sales-table">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Date</th>
          <th>Customer ID</th>
          <th>Customer name</th>
          <th>Phone number</th>
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
          <tr key={s.transactionId}>
            <td>{s.transactionId}</td>
            <td>{new Date(s.date).toLocaleDateString()}</td>
            <td>{s.customerId}</td>
            <td>{s.customerName}</td>
            <td style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {s.phoneNumber}
              <button
                onClick={() => navigator.clipboard.writeText(s.phoneNumber)}
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

            <td>{s.gender}</td>
            <td>{s.age}</td>
            <td className="bold-cell">{s.productCategory}</td>
            <td className="bold-cell">{s.quantity}</td>
            <td className="bold-cell">₹ {s.finalAmount}</td>
            <td className="bold-cell">{s.customerRegion}</td>
            <td className="bold-cell">{s.productId}</td>
            <td className="bold-cell">{s.employeeName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
