import { createContext, useContext } from "react";
import type { ReactNode } from "react";

/* =========================================================
   AGE GROUP
========================================================= */

export type AgeGroup =
  | "2–3 Tahun"
  | "4–5 Tahun"
  | "6–7 Tahun";

/* =========================================================
   USER ROLE
========================================================= */

export type UserRole =
  | "anak"
  | "orangtua";

/* =========================================================
   MODULE
========================================================= */

export type ModuleKey =
  | "huruf"
  | "angka"
  | "hewan"
  | "buah"
  | "kendaraan"
  | "mewarnai"
  | "permainan";

/* =========================================================
   CHILD PROFILE
========================================================= */

export interface ChildProfile {
  name: string;
  age: AgeGroup;
}

/* =========================================================
   PARENT PROFILE
========================================================= */

export interface ParentProfile {
  name: string;
}

/* =========================================================
   ACTIVE SESSION PROFILE
========================================================= */

export interface Profile {
  name: string;
  age: AgeGroup;
  role: UserRole;
}

/* =========================================================
   PROGRESS
========================================================= */

export interface ProgressState {
  huruf: number;
  angka: number;
  hewan: number;
  buah: number;
  kendaraan: number;
  mewarnai: number;
  permainan: number;
}

/* =========================================================
   APP CONTEXT VALUE
========================================================= */

export interface AppContextValue {
  /* Active session */
  profile: Profile | null;

  setProfile: (
    profile: Profile
  ) => void;

  /* Child profile */
  childProfile: ChildProfile | null;

  setChildProfile: (
    profile: ChildProfile
  ) => void;

  /* Parent profile */
  parentProfile: ParentProfile | null;

  setParentProfile: (
    profile: ParentProfile
  ) => void;

  /* Stars */
  stars: number;

  /* Progress */
  progress: ProgressState;

  /* Sound */
  muted: boolean;

  setMuted: (
    muted: boolean
  ) => void;

  /* Learning */
  completeModule: (
    module: ModuleKey,
    amount?: number
  ) => void;

  resetProgress: () => void;

  /* Parent access */
  parentUnlocked: boolean;

  unlockParent: () => void;

  lockParent: () => void;

  openParentGate: (
    destination?: string
  ) => void;
}

/* =========================================================
   DEFAULT PROGRESS
========================================================= */

export const defaultProgress: ProgressState = {
  huruf: 0,
  angka: 0,
  hewan: 0,
  buah: 0,
  kendaraan: 0,
  mewarnai: 0,
  permainan: 0,
};

/* =========================================================
   CONTEXT
========================================================= */

export const AppContext =
  createContext<AppContextValue | null>(
    null
  );

/* =========================================================
   PROVIDER
========================================================= */

export function AppProvider({
  value,
  children,
}: {
  value: AppContextValue;
  children: ReactNode;
}) {
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

/* =========================================================
   USE APP
========================================================= */

export function useApp() {
  const value = useContext(AppContext);

  if (!value) {
    throw new Error(
      "useApp harus digunakan di dalam AppProvider"
    );
  }

  return value;
}