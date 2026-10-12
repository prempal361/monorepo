import { configureStore, createSlice } from '@reduxjs/toolkit';

const agentSessionSlice = createSlice({
  name: 'agentSession',
  initialState: {
    agentId: 'AGT-99042',
    agentName: 'Prem Singh (Senior Prudential Agent)',
    branch: 'Singapore Marina Bay',
    authenticated: true
  },
  reducers: {}
});

export const store = configureStore({
  reducer: {
    agentSession: agentSessionSlice.reducer
  }
});
