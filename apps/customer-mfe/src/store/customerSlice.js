import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCustomers, createCustomer } from '../services/customerService.js';

export const getCustomersThunk = createAsyncThunk(
  'customer/getCustomers',
  async (searchTerm) => {
    const data = await fetchCustomers(searchTerm);
    return data;
  }
);

export const addCustomerThunk = createAsyncThunk(
  'customer/addCustomer',
  async (customerData) => {
    const data = await createCustomer(customerData);
    return data;
  }
);

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    list: [
      { id: 'CUST-001', name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '9876543210', city: 'Mumbai' },
      { id: 'CUST-002', name: 'Priya Patel', email: 'priya.patel@example.com', phone: '9820011223', city: 'Delhi' }
    ],
    selectedCustomer: null,
    loading: false,
    error: null
  },
  reducers: {
    selectCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getCustomersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCustomerThunk.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        state.selectedCustomer = action.payload;
      });
  }
});

export const { selectCustomer, clearSelectedCustomer } = customerSlice.actions;
export default customerSlice.reducer;
