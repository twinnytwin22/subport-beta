"use client";
import { create } from "zustand";

interface StatusStoreState {
  status: string;
  setStatus: (newStatus: string) => void;
}

export const useStatusStore = create<StatusStoreState>((set) => {
  const state: StatusStoreState = {
    status: "pending",
    setStatus: (newStatus) => set({ status: newStatus }),
  };

  return state;
});
