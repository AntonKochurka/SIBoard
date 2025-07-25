import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus } from '@src/shared/types';
import type { UserEntity } from '../api';

export const AUTH_SLICE_NAME = 'auth';

export interface AuthState {
    accessToken: string | null;
    user: UserEntity | null;
    isAuthenticated: boolean;

    error?: string;
    status: LoadingStatus;
}

const initialState: AuthState = {
    accessToken: null,
    user: null,
    isAuthenticated: false,
    status: LoadingStatus.Idle,
};

const authSlice = createSlice({
    name: AUTH_SLICE_NAME,
    initialState,
    reducers: {},
});

export default authSlice.reducer;
