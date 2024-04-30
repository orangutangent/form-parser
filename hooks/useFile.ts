import { create } from "zustand";

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
}

export const useFile = create<Props>((set) => ({
  file: null,
  setFile: (file: File | null) => set({ file }),
}));
