import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../services/productService.js';

export const getProductsThunk = createAsyncThunk(
  'product/getProducts',
  async (category) => {
    const data = await fetchProducts(category);
    return data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    list: [
      { id: 'PRD-101', name: 'Prudential Term Life Protect', category: 'LIFE', price: 1500, tenureYears: 20, description: 'Comprehensive term life cover with critical illness protection.' },
      { id: 'PRD-102', name: 'Prudential Health Shield Plus', category: 'HEALTH', price: 800, tenureYears: 1, description: 'Full medical expense cover including pre & post hospitalization.' },
      { id: 'PRD-103', name: 'Prudential Wealth Growth Plan', category: 'SAVINGS', price: 2500, tenureYears: 10, description: 'Guaranteed returns combined with life cover.' },
      { id: 'PRD-104', name: 'Prudential Motor Care Complete', category: 'MOTOR', price: 400, tenureYears: 1, description: 'Comprehensive coverage for private personal vehicles.' }
    ],
    selectedProduct: null,
    selectedCategory: 'ALL',
    loading: false,
    error: null
  },
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { selectProduct, setCategory } = productSlice.actions;
export default productSlice.reducer;
