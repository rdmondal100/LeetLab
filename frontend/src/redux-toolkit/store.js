import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import { authApi } from './services/authService'
import { setupListeners } from '@reduxjs/toolkit/query'
import { problemApi } from './services/problemService'


export const store = configureStore({
  reducer: {
    // Local slice reducer
    auth: authReducer,


    // API service reducer
    [authApi.reducerPath]: authApi.reducer,
    [problemApi.reducerPath]: problemApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,problemApi.middleware),})


setupListeners(store.dispatch)

