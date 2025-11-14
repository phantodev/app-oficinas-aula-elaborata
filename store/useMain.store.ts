import { VehicleData } from "@/services/vehicle.service";
import { create } from "zustand";

interface MainStore {
  vehicleData: VehicleData | null;
  setVehicleData: (vehicleData: VehicleData | null) => void;
}

export const useMainStore = create<MainStore>((set) => ({
  vehicleData: null,
  setVehicleData: (vehicleData: VehicleData | null) => set({ vehicleData }),
}));
