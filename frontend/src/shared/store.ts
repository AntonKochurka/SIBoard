import { configureStore } from '@reduxjs/toolkit'
import { AUTH_SLICE_NAME, authReducer } from '@src/apps/auth/redux'
import { useDispatch, useSelector } from 'react-redux'


export const store = configureStore({
  reducer: {
    [AUTH_SLICE_NAME]: authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()