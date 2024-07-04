import { create } from "zustand";

export type ModalType = "SERVER";

interface ModalData {}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  onOpen: (type: ModalType, data: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  onOpen: (type, data = {}) => set({ type, data }),
  onClose: () => set({ type: null }),
}));
