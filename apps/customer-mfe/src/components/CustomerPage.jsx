import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomerSearchForm from './CustomerSearchForm.jsx';
import CustomerCreateForm from './CustomerCreateForm.jsx';
import CustomerCard from './CustomerCard.jsx';
import { getCustomersThunk, addCustomerThunk, selectCustomer } from '../store/customerSlice.js';
import './customer.css';

const CustomerPage = ({ onCustomerSelect }) => {
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer) || {
    list: [
      { id: 'CUST-001', name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '9876543210', city: 'Mumbai' },
      { id: 'CUST-002', name: 'Priya Patel', email: 'priya.patel@example.com', phone: '9820011223', city: 'Delhi' }
    ],
    selectedCustomer: null
  };

  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(getCustomersThunk(''));
  }, [dispatch]);

  const handleSearchCustomer = (term) => {
    dispatch(getCustomersThunk(term));
  };

  const handleSelectCustomer = (cust) => {
    dispatch(selectCustomer(cust));
    if (onCustomerSelect) {
      onCustomerSelect(cust);
    }
  };

  const handleCreateCustomer = (formData) => {
    dispatch(addCustomerThunk(formData)).then((action) => {
      if (action.payload) {
        setShowCreateForm(false);
        if (onCustomerSelect) {
          onCustomerSelect(action.payload);
        }
      }
    });
  };

  return (
    <div className="customer-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2>Customer Management</h2>
        <button className="btn-primary" onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Close Form' : '+ Add New Customer'}
        </button>
      </div>

      {showCreateForm && (
        <CustomerCreateForm
          onCreateCustomer={handleCreateCustomer}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      <CustomerSearchForm onSearch={handleSearchCustomer} />

      <div className="customer-grid">
        {customerState.list && customerState.list.map((cust) => (
          <CustomerCard
            key={cust.id}
            customer={cust}
            isSelected={customerState.selectedCustomer?.id === cust.id}
            onSelect={handleSelectCustomer}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerPage;
