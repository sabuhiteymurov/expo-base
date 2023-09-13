import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

interface App {
  isConnectedToInternet: boolean;
  language: string | null;
  user: { name: string; age: number } | null;
}

const initialState: App = {
  isConnectedToInternet: false,
  language: null,
  user: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsConnectedToInternet: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.isConnectedToInternet>
    ) => {
      state.isConnectedToInternet = action.payload;
    },
    setAppLanguage: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.language>
    ) => {
      state.language = action.payload;
    },
    setUser: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.user>
    ) => {
      state.user = action.payload;
    },
  },
});

export const { setIsConnectedToInternet, setAppLanguage, setUser } =
  appSlice.actions;

export default appSlice.reducer;
