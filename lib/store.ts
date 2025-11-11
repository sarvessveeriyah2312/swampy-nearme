import { create } from 'zustand';
import { Pooja } from './supabase';

interface PoojaStore {
  poojas: Pooja[];
  setPoojas: (poojas: Pooja[]) => void;
  addPooja: (pooja: Pooja) => void;
  userLocation: { lat: number; lng: number } | null;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
}

export const usePoojaStore = create<PoojaStore>((set) => ({
  poojas: [],
  setPoojas: (poojas) => set({ poojas }),
  addPooja: (pooja) => set((state) => ({ poojas: [...state.poojas, pooja] })),
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
  notificationsEnabled: false,
  setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
}));
