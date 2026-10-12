import React, { useState } from 'react';
import { validateNewCustomer } from '../rules/customerRules.js';

const CustomerCreateForm = ({ onCreateCustomer, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  });
  const [errors, setErrors] = useState({});

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateNewCustomer(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (onCreateCustomer) {
      onCreateCustomer(formData);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ background: '#f9f9f9', padding: '16px', borderRadius: '6px', marginBottom: '20px' }}>
      <h3>Create New Customer</h3>
      <div className="form-group">
        <label>Full Name *</label>
        <input name="name" value={formData.name} onChange={handleFieldChange} placeholder="Enter full name" />
        {errors.name && <div className="error-text">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label>Email Address *</label>
        <input name="email" value={formData.email} onChange={handleFieldChange} placeholder="Enter email address" />
        {errors.email && <div className="error-text">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label>Phone Number *</label>
        <input name="phone" value={formData.phone} onChange={handleFieldChange} placeholder="Enter phone number" />
        {errors.phone && <div className="error-text">{errors.phone}</div>}
      </div>
      <div className="form-group">
        <label>City</label>
        <input name="city" value={formData.city} onChange={handleFieldChange} placeholder="Enter city" />
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <button type="submit" className="btn-primary">Save Customer</button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{ padding: '10px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CustomerCreateForm;
