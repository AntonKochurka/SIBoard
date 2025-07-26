import type { RootState } from "@src/shared/store";

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.accessToken;
export const selectAuthenticated = (state: RootState) => state.auth.isAuthenticated;
