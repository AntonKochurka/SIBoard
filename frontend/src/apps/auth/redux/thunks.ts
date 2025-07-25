import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService, type ObtainPairRequest } from "../api";

export const loginThunk = createAsyncThunk(
    "auth/login", 
    async (credentials: ObtainPairRequest, client) => {
        try {
            const { data } = await AuthService.obtain(credentials)
            
            return data
        } catch (error) {
            client.rejectWithValue("error")       
        }
        
    }
)