// statusTracker.ts
let currentStatus: string | null = null;

export function getStatus(): string | null {
  return currentStatus;
}

export function setStatus(status: string) {
  currentStatus = status;
}
