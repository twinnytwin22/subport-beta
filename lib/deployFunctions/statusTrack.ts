// statusTracker.ts
let currentStatus: string;

export function getStatus(): string {
  return currentStatus;
}

export function setStatus(status: string) {
  currentStatus = status || "pending";
}
