import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatus } from "@src/shared/types";
import type { AuthState } from "./types";

export const AUTH_SLICE_NAME = "auth";

const initialState: AuthState = { 
    accessToken: null, 
    user: null, 
    isAuthenticated: false,
    status: LoadingStatus.Idle
};

const authSlice = createSlice({
    name: AUTH_SLICE_NAME,
    initialState: initialState,
    reducers: {}
});

export const authReducer = authSlice.reducer;