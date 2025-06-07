import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import problemReducer from './features/problemSlice'
import submissionReducer from './features/submissionSlice'
import executeCodeReducer from './features/executeCodeSlice'
import { authApi } from './services/authService'
import { setupListeners } from '@reduxjs/toolkit/query'
import { problemApi } from './services/problemService'
import { executeCodeApi } from './services/executeCodeService'
import { submissionApi } from './services/submissionService'


export const store = configureStore({
  reducer: {
    // Local slice reducer
    auth: authReducer,
    problem: problemReducer,
    executeCode: executeCodeReducer,
    submission: submissionReducer,


    // API service reducer
    [authApi.reducerPath]: authApi.reducer,
    [problemApi.reducerPath]: problemApi.reducer,
    [executeCodeApi.reducerPath]: executeCodeApi.reducer,
        [submissionApi.reducerPath]: submissionApi.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, problemApi.middleware,executeCodeApi.middleware,submissionApi.middleware),
})


setupListeners(store.dispatch)

