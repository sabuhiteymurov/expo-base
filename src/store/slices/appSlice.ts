import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

interface App {
  isConnectedToInternet: boolean;
  user: { email: string; fullName: string; accessToken: string } | null;
}

const initialState: App = {
  isConnectedToInternet: false,
  user: null,
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setIsConnectedToInternet: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.isConnectedToInternet>
    ) => {
      state.isConnectedToInternet = action.payload;
    },
    setUser: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.user>
    ) => {
      state.user = action.payload;
    },
  },
});

export const { setIsConnectedToInternet, setUser } = appSlice.actions;

export default appSlice.reducer;
