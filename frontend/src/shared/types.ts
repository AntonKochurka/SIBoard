export const LoadingStatus = {
  Idle: "idle",
  Loading: "loading",
  Succeeded: "succeeded",
  Failed: "failed",
} as const;

export type LoadingStatus = typeof LoadingStatus[keyof typeof LoadingStatus];
