import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PolicyDetailsCard from './PolicyDetailsCard.jsx';
import { getPoliciesThunk } from '../store/policySlice.js';
import { validatePolicySearchInput } from '../rules/policyRules.js';
import './policy.css';

const PolicyPage = () => {
  const dispatch = useDispatch();
  const policyState = useSelector((state) => state.policy) || {
    list: [
      { id: 'POL-9001', customerName: 'Rahul Sharma', customerId: 'CUST-001', productName: 'Prudential Term Life Protect', premiumAmount: 1500, status: 'ACTIVE', issueDate: '2025-01-15' },
      { id: 'POL-9002', customerName: 'Priya Patel', customerId: 'CUST-002', productName: 'Prudential Health Shield Plus', premiumAmount: 800, status: 'PENDING_PAYMENT', issueDate: '2025-02-01' }
    ]
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(getPoliciesThunk(''));
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setError('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const err = validatePolicySearchInput(searchQuery);
    if (err) {
      setError(err);
      return;
    }
    dispatch(getPoliciesThunk(searchQuery));
  };

  return (
    <div className="policy-container">
      <h2>Issued Policies & Active Coverage</h2>
      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by Policy ID or Customer Name..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Search
        </button>
      </form>
      {error && <div style={{ color: '#d9534f', fontSize: '12px', marginBottom: '10px' }}>{error}</div>}

      <div>
        {policyState.list && policyState.list.map((policy) => (
          <PolicyDetailsCard key={policy.id} policy={policy} />
        ))}
      </div>
    </div>
  );
};

export default PolicyPage;
