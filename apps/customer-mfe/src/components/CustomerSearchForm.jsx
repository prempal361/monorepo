import React, { useState } from 'react';
import { validateSearchTerm } from '../rules/customerRules.js';

const CustomerSearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setError('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const validationError = validateSearchTerm(searchTerm);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form className="customer-search-box" onSubmit={handleSearchSubmit}>
      <div style={{ flex: 1 }}>
        <input
          type="text"
          placeholder="Search by Name or Customer ID..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        {error && <div className="error-text">{error}</div>}
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default CustomerSearchForm;
