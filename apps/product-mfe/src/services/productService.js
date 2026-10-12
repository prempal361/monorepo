import { apiClient } from '@prudential/api-client';

export const fetchProducts = async (category = 'ALL') => {
  try {
    const response = await apiClient.get('/products', { params: { category } });
    return response.data;
  } catch (err) {
    const defaultProducts = [
      { id: 'PRD-101', name: 'Prudential Term Life Protect', category: 'LIFE', price: 1500, tenureYears: 20, description: 'Comprehensive term life cover with critical illness protection.' },
      { id: 'PRD-102', name: 'Prudential Health Shield Plus', category: 'HEALTH', price: 800, tenureYears: 1, description: 'Full medical expense cover including pre & post hospitalization.' },
      { id: 'PRD-103', name: 'Prudential Wealth Growth Plan', category: 'SAVINGS', price: 2500, tenureYears: 10, description: 'Guaranteed returns combined with life cover.' },
      { id: 'PRD-104', name: 'Prudential Motor Care Complete', category: 'MOTOR', price: 400, tenureYears: 1, description: 'Comprehensive coverage for private personal vehicles.' }
    ];
    if (!category || category === 'ALL') return defaultProducts;
    return defaultProducts.filter(p => p.category === category);
  }
};
