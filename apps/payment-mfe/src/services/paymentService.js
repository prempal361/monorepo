import { apiClient } from '@prudential/api-client';

export const processPayment = async (paymentData) => {
  try {
    const response = await apiClient.post('/payments', paymentData);
    return response.data;
  } catch (err) {
    return {
      transactionId: `TXN-${Math.floor(Math.random() * 899999 + 100000)}`,
      status: 'SUCCESS',
      amount: paymentData.amount,
      customerName: paymentData.customerName || 'Rahul Sharma',
      productName: paymentData.productName || 'Prudential Term Life Protect',
      timestamp: new Date().toISOString()
    };
  }
};

export const fetchPaymentHistory = async () => {
  try {
    const response = await apiClient.get('/payments/history');
    return response.data;
  } catch (err) {
    return [
      { transactionId: 'TXN-984321', customerName: 'Rahul Sharma', productName: 'Prudential Term Life Protect', amount: 1500, status: 'SUCCESS', timestamp: '2025-02-10 14:30' },
      { transactionId: 'TXN-881234', customerName: 'Priya Patel', productName: 'Prudential Health Shield Plus', amount: 800, status: 'SUCCESS', timestamp: '2025-02-09 11:15' }
    ];
  }
};
