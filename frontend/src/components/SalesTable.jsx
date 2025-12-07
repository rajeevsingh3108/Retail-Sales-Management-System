import React from 'react';

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
            <td>{s.phoneNumber}</td>
            <td>{s.gender}</td>
            <td>{s.age}</td>
            <td>{s.productCategory}</td>
            <td>{s.quantity}</td>
            <td>₹ {s.finalAmount}</td>
            <td>{s.customerRegion}</td>
            <td>{s.prouctId}</td>
            <td>{s.employeeName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
