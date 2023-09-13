import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { reduxStorage } from './storage';
import appSlice from './slices/appSlice';

const rootReducer = combineReducers({
  app: appSlice,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxStorage,
  timeout: 0,
  whitelist: ['app'], // these reducers will persist data
  // blacklist: ['exampleReducer'], // these reducers will not persist data
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatchBase;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelectorBase;

// Required for refetchOnFocus/refetchOnReconnect RTK Query behaviors
setupListeners(store.dispatch);
