import type { LoadingStatus } from "@src/shared/types";

export interface UserEntity {
    id: number;
}

export interface AuthState {
  accessToken: string | null;
  user: UserEntity | null;
  isAuthenticated: boolean;

  error?: string;
  status: LoadingStatus
}