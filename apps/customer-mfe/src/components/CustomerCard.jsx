import React from 'react';

const CustomerCard = ({ customer, isSelected, onSelect }) => {
  const handleSelectCustomer = () => {
    if (onSelect) {
      onSelect(customer);
    }
  };

  return (
    <div
      className={`customer-card ${isSelected ? 'selected' : ''}`}
      onClick={handleSelectCustomer}
    >
      <h3>{customer.name}</h3>
      <p><strong>ID:</strong> {customer.id}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      {customer.city && <p><strong>City:</strong> {customer.city}</p>}
      <button className="btn-primary" style={{ marginTop: '10px', width: '100%' }}>
        {isSelected ? 'Selected' : 'Select Customer'}
      </button>
    </div>
  );
};

export default CustomerCard;
