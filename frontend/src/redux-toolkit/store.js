import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import problemReducer from './features/problemSlice'
import executeCodeReducer from './features/executeCodeSlice'
import { authApi } from './services/authService'
import { setupListeners } from '@reduxjs/toolkit/query'
import { problemApi } from './services/problemService'
import { executeCodeApi } from './services/executeCodeService'


export const store = configureStore({
  reducer: {
    // Local slice reducer
    auth: authReducer,
    problem: problemReducer,
    executeCode: executeCodeReducer,
    // API service reducer
    [authApi.reducerPath]: authApi.reducer,
    [problemApi.reducerPath]: problemApi.reducer,
    [executeCodeApi.reducerPath]: executeCodeApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, problemApi.middleware,executeCodeApi.middleware),
})


setupListeners(store.dispatch)

