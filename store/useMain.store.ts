import { VehicleData } from "@/services/vehicle.service";
import { create } from "zustand";

export interface MediaItem {
  uri: string;
  type: "image" | "video";
}

interface MainStore {
  vehicleData: VehicleData | null;
  setVehicleData: (vehicleData: VehicleData | null) => void;
  mediaList: MediaItem[];
  setCheckInMediaList: (mediaList: MediaItem[]) => void;
}

export const useMainStore = create<MainStore>((set) => ({
  vehicleData: null,
  setVehicleData: (vehicleData: VehicleData | null) => set({ vehicleData }),
  mediaList: [],
  setCheckInMediaList: (mediaList: MediaItem[]) => set({ mediaList }),
}));
