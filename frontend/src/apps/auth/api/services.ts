import api from "@src/shared/api";
import type { ObtainPairResponse, ObtainPairRequest } from "./types";

export const AuthService = {
  obtain: async (credentials: ObtainPairRequest) => {
    return api.post<ObtainPairResponse>("/auth/obtain", credentials);
  },

  refresh: async () => {
    return api.post<ObtainPairResponse>("/auth/refresh");
  },
};
