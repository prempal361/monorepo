import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPolicies } from '../services/policyService.js';

export const getPoliciesThunk = createAsyncThunk(
  'policy/getPolicies',
  async (query) => {
    const data = await fetchPolicies(query);
    return data;
  }
);

const policySlice = createSlice({
  name: 'policy',
  initialState: {
    list: [
      { id: 'POL-9001', customerName: 'Rahul Sharma', customerId: 'CUST-001', productName: 'Prudential Term Life Protect', premiumAmount: 1500, status: 'ACTIVE', issueDate: '2025-01-15' },
      { id: 'POL-9002', customerName: 'Priya Patel', customerId: 'CUST-002', productName: 'Prudential Health Shield Plus', premiumAmount: 800, status: 'PENDING_PAYMENT', issueDate: '2025-02-01' }
    ],
    selectedPolicy: null,
    loading: false,
    error: null
  },
  reducers: {
    selectPolicy: (state, action) => {
      state.selectedPolicy = action.payload;
    },
    addIssuedPolicy: (state, action) => {
      state.list.unshift(action.payload);
      state.selectedPolicy = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPoliciesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPoliciesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getPoliciesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { selectPolicy, addIssuedPolicy } = policySlice.actions;
export default policySlice.reducer;
