import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import appSlice from './slices/appSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Utilize `useDispatch` for TypeScript
export const useDispatch = () => useDispatchBase<AppDispatch>();

// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);

// Required for refetchOnFocus/refetchOnReconnect RTK Query behaviors
setupListeners(store.dispatch);
