import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { processPayment, fetchPaymentHistory } from '../services/paymentService.js';

export const submitPaymentThunk = createAsyncThunk(
  'payment/submitPayment',
  async (paymentData) => {
    const data = await processPayment(paymentData);
    return data;
  }
);

export const getPaymentHistoryThunk = createAsyncThunk(
  'payment/getPaymentHistory',
  async () => {
    const data = await fetchPaymentHistory();
    return data;
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    history: [
      { transactionId: 'TXN-984321', customerName: 'Rahul Sharma', productName: 'Prudential Term Life Protect', amount: 1500, status: 'SUCCESS', timestamp: '2025-02-10 14:30' },
      { transactionId: 'TXN-881234', customerName: 'Priya Patel', productName: 'Prudential Health Shield Plus', amount: 800, status: 'SUCCESS', timestamp: '2025-02-09 11:15' }
    ],
    lastTransaction: null,
    loading: false,
    error: null
  },
  reducers: {
    clearLastTransaction: (state) => {
      state.lastTransaction = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPaymentThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitPaymentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lastTransaction = action.payload;
        state.history.unshift(action.payload);
      })
      .addCase(submitPaymentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getPaymentHistoryThunk.fulfilled, (state, action) => {
        state.history = action.payload;
      });
  }
});

export const { clearLastTransaction } = paymentSlice.actions;
export default paymentSlice.reducer;
