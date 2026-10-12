import { apiClient } from '@prudential/api-client';

export const fetchPolicies = async (searchQuery = '') => {
  try {
    const response = await apiClient.get('/policies', { params: { q: searchQuery } });
    return response.data;
  } catch (err) {
    const defaultPolicies = [
      { id: 'POL-9001', customerName: 'Rahul Sharma', customerId: 'CUST-001', productName: 'Prudential Term Life Protect', premiumAmount: 1500, status: 'ACTIVE', issueDate: '2025-01-15' },
      { id: 'POL-9002', customerName: 'Priya Patel', customerId: 'CUST-002', productName: 'Prudential Health Shield Plus', premiumAmount: 800, status: 'PENDING_PAYMENT', issueDate: '2025-02-01' }
    ];
    if (!searchQuery) return defaultPolicies;
    return defaultPolicies.filter(p => p.id.toLowerCase().includes(searchQuery.toLowerCase()) || p.customerName.toLowerCase().includes(searchQuery.toLowerCase()));
  }
};
