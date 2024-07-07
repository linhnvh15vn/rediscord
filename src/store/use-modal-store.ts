import { create } from "zustand";

import { type Channel, type Server } from "~/types";

export type ModalType = "SERVER" | "DELETE_SERVER" | "INVITE" | "MEMBER";

interface ModalData {
  server?: Server;
  channel?: Channel;
}

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
