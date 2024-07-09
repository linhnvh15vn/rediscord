import { create } from "zustand";

import { type Message, type Channel, type Server } from "~/types";

export type ModalType =
  | "SERVER"
  | "DELETE_SERVER"
  | "INVITE"
  | "MEMBER"
  | "CHANNEL"
  | "DELETE_CHANNEL"
  | "LEAVE"
  | "DELETE_MESSAGE"
  | "ATTACHMENT";

interface ModalData {
  server?: Server;
  channel?: Channel;
  message?: Message;
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
