import { apiClient } from '@prudential/api-client';

export const fetchCustomers = async (searchTerm = '') => {
  try {
    const response = await apiClient.get('/customers', { params: { q: searchTerm } });
    return response.data;
  } catch (err) {
    return [
      { id: 'CUST-001', name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '9876543210', city: 'Mumbai' },
      { id: 'CUST-002', name: 'Priya Patel', email: 'priya.patel@example.com', phone: '9820011223', city: 'Delhi' }
    ].filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase()));
  }
};

export const createCustomer = async (customerData) => {
  try {
    const response = await apiClient.post('/customers', customerData);
    return response.data;
  } catch (err) {
    return {
      id: `CUST-00${Math.floor(Math.random() * 900 + 100)}`,
      ...customerData
    };
  }
};
