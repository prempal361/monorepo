import React from 'react';

const PolicyDetailsCard = ({ policy }) => {
  if (!policy) return null;

  return (
    <div className="policy-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Policy Number: {policy.id}</h3>
        <span className={`status-badge ${policy.status}`}>{policy.status}</span>
      </div>
      <hr style={{ border: '0.5px solid #eee', margin: '10px 0' }} />
      <p><strong>Customer Name:</strong> {policy.customerName} ({policy.customerId})</p>
      <p><strong>Product Covered:</strong> {policy.productName}</p>
      <p><strong>Annual Premium:</strong> ₹{policy.premiumAmount}</p>
      {policy.issueDate && <p><strong>Issue Date:</strong> {policy.issueDate}</p>}
    </div>
  );
};

export default PolicyDetailsCard;
