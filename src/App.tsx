import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

/* =========================================================
   PAGES
========================================================= */

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Alphabet from "@/pages/Alphabet";
import Numbers from "@/pages/Numbers";
import Animals from "@/pages/Animals";
import Rewards from "@/pages/Rewards";
import Coloring from "@/pages/Coloring";
import Games from "@/pages/Games";
import Catalog from "@/pages/Catalog";
import ParentSettings from "@/pages/ParentSettings";

/* =========================================================
   COMPONENTS
========================================================= */

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ParentGateModal from "@/components/ParentGateModal";
import BackgroundMusic from "@/components/BackgroundMusic";

/* =========================================================
   CONTEXT
========================================================= */

import {
  AppProvider,
  defaultProgress,
  useApp,
} from "@/lib/AppContext";

import type {
  ModuleKey,
  Profile,
  ProgressState,
  ChildProfile,
  ParentProfile,
} from "@/lib/AppContext";

/* =========================================================
   STORAGE
========================================================= */

import {
  readStorage,
  STORAGE_KEYS,
  writeStorage,
} from "@/lib/storage";

/* =========================================================
   APP
========================================================= */

export default function App() {
  const navigate = useNavigate();

  /* =======================================================
     ACTIVE LOGIN PROFILE
     
     Ini hanya menentukan siapa yang sedang login.
     
     Anak:
       profile.role = "anak"
     
     Orang Tua:
       profile.role = "orangtua"
  ======================================================== */

  const [profile, setProfileState] =
    useState<Profile | null>(() =>
      readStorage<Profile | null>(
        STORAGE_KEYS.profile,
        null
      )
    );

  /* =======================================================
     CHILD PROFILE
     
     Data anak disimpan TERPISAH dari profile orang tua.
  ======================================================== */

  const [childProfile, setChildProfileState] =
    useState<ChildProfile | null>(() =>
      readStorage<ChildProfile | null>(
        "childProfile",
        null
      )
    );

  /* =======================================================
     PARENT PROFILE
     
     Data orang tua disimpan TERPISAH dari profil anak.
  ======================================================== */

  const [parentProfile, setParentProfileState] =
    useState<ParentProfile | null>(() =>
      readStorage<ParentProfile | null>(
        "parentProfile",
        null
      )
    );

  /* =======================================================
     STARS
  ======================================================== */

  const [stars, setStars] =
    useState<number>(() =>
      readStorage<number>(
        STORAGE_KEYS.stars,
        0
      )
    );

  /* =======================================================
     PROGRESS
  ======================================================== */

  const [progress, setProgress] =
    useState<ProgressState>(() =>
      readStorage<ProgressState>(
        STORAGE_KEYS.progress,
        defaultProgress
      )
    );

  /* =======================================================
     MUTED
  ======================================================== */

  const [muted, setMutedState] =
    useState<boolean>(() =>
      readStorage<boolean>(
        STORAGE_KEYS.muted,
        false
      )
    );

  /* =======================================================
     PARENT GATE
  ======================================================== */

  const [parentGateOpen, setParentGateOpen] =
    useState(false);

  /*
    Menentukan apakah orang tua sudah berhasil
    masuk ke area orang tua.
  */
  const [parentUnlocked, setParentUnlocked] =
    useState<boolean>(() => {
      const savedProfile =
        readStorage<Profile | null>(
          STORAGE_KEYS.profile,
          null
        );

      /*
        Jika profile yang tersimpan adalah orang tua,
        anggap session orang tua masih aktif.
      */
      return (
        savedProfile?.role ===
        "orangtua"
      );
    });

  /*
    Halaman tujuan setelah Parent Gate.
  */
  const [parentDestination, setParentDestination] =
    useState("/orangtua");

  /* =======================================================
     SAVE ACTIVE PROFILE
  ======================================================== */

  useEffect(() => {
    writeStorage(
      STORAGE_KEYS.profile,
      profile
    );
  }, [profile]);

  /* =======================================================
     SAVE CHILD PROFILE
  ======================================================== */

  useEffect(() => {
    writeStorage(
      "childProfile",
      childProfile
    );
  }, [childProfile]);

  /* =======================================================
     SAVE PARENT PROFILE
  ======================================================== */

  useEffect(() => {
    writeStorage(
      "parentProfile",
      parentProfile
    );
  }, [parentProfile]);

  /* =======================================================
     SAVE STARS
  ======================================================== */

  useEffect(() => {
    writeStorage(
      STORAGE_KEYS.stars,
      stars
    );
  }, [stars]);

  /* =======================================================
     SAVE PROGRESS
  ======================================================== */

  useEffect(() => {
    writeStorage(
      STORAGE_KEYS.progress,
      progress
    );
  }, [progress]);

  /* =======================================================
     SAVE MUTED
  ======================================================== */

  useEffect(() => {
    writeStorage(
      STORAGE_KEYS.muted,
      muted
    );
  }, [muted]);

  /* =======================================================
     SET PROFILE
  ======================================================== */

  const setProfile = (
    nextProfile: Profile
  ) => {
    setProfileState(nextProfile);

    /*
      HANYA jika yang login adalah ANAK,
      simpan data ke childProfile.

      Login orang tua TIDAK boleh mengubah
      childProfile.
    */
    if (
      nextProfile.role === "anak"
    ) {
      setChildProfileState({
        name: nextProfile.name,
        age: nextProfile.age,
      });
    }
  };

  /* =======================================================
     SET CHILD PROFILE
  ======================================================== */

  const setChildProfile = (
    nextProfile: ChildProfile
  ) => {
    setChildProfileState(
      nextProfile
    );
  };

  /* =======================================================
     SET PARENT PROFILE
  ======================================================== */

  const setParentProfile = (
    nextProfile: ParentProfile
  ) => {
    setParentProfileState(
      nextProfile
    );
  };

  /* =======================================================
     SET MUTED
  ======================================================== */

  const setMuted = (
    value: boolean
  ) => {
    setMutedState(value);
  };

  /* =======================================================
     COMPLETE MODULE
  ======================================================== */

  const completeModule = (
    module: ModuleKey,
    amount = 10
  ) => {
    setProgress((current) => ({
      ...current,
      [module]: Math.min(
        100,
        current[module] + amount
      ),
    }));

    setStars(
      (current) => current + 1
    );
  };

  /* =======================================================
     RESET PROGRESS
  ======================================================== */

  const resetProgress = () => {
    setProgress(defaultProgress);
    setStars(0);
  };

  /* =======================================================
     UNLOCK PARENT
  ======================================================== */

  const unlockParent = () => {
    setParentUnlocked(true);
  };

  /* =======================================================
     LOCK PARENT
  ======================================================== */

  const lockParent = () => {
    setParentUnlocked(false);
  };

  /* =======================================================
     OPEN PARENT GATE
  ======================================================== */

  const openParentGate = (
    destination = "/orangtua"
  ) => {
    /*
      Jika sudah login sebagai orang tua
      dan sudah unlock,
      langsung buka halaman tujuan.
    */
    if (
      parentUnlocked &&
      profile?.role === "orangtua"
    ) {
      navigate(destination);
      return;
    }

    setParentDestination(
      destination
    );

    setParentGateOpen(true);
  };

  /* =======================================================
     FINISH PARENT GATE
  ======================================================== */

  const finishGate = () => {
    setParentGateOpen(false);

    setParentUnlocked(true);

    navigate(parentDestination);
  };

  /* =======================================================
     LOGOUT
     
     PENTING:
     
     Logout hanya menghapus ACTIVE SESSION.
     
     childProfile tetap ada.
     parentProfile tetap ada.
     stars tetap ada.
     progress tetap ada.
  ======================================================== */

  const logout = () => {
    setProfileState(null);

    setParentGateOpen(false);

    setParentUnlocked(false);

    /*
      Hapus hanya active profile.
    */
    writeStorage(
      STORAGE_KEYS.profile,
      null
    );

    navigate("/login", {
      replace: true,
    });
  };

  /* =======================================================
     APP PROVIDER
  ======================================================== */

  return (
    <AppProvider
      value={{
        /* ACTIVE PROFILE */
        profile,
        setProfile,

        /* CHILD */
        childProfile,
        setChildProfile,

        /* PARENT */
        parentProfile,
        setParentProfile,

        /* LEARNING */
        stars,
        progress,

        /* SOUND */
        muted,
        setMuted,

        /* PROGRESS */
        completeModule,
        resetProgress,

        /* PARENT ACCESS */
        parentUnlocked,
        unlockParent,
        lockParent,
        openParentGate,
      }}
    >
      <div className="min-h-svh bg-gradient-to-b from-sky-100 via-amber-50 to-pink-50 pb-24 text-slate-800">

        {/* =================================================
            BACKGROUND MUSIC
        ================================================== */}

        <BackgroundMusic />

        {/* =================================================
            HEADER
        ================================================== */}

        <AppLayout
          profile={profile}
          logout={logout}
        />

        {/* =================================================
            MAIN
        ================================================== */}

        <main className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-5 sm:px-6 sm:pt-8">

          <Routes>

            {/* =================================================
                LOGIN
            ================================================== */}

            <Route
              path="/login"
              element={
                profile ? (
                  <Navigate
                    to={
                      profile.role ===
                      "orangtua"
                        ? "/orangtua"
                        : "/"
                    }
                    replace
                  />
                ) : (
                  <Login />
                )
              }
            />

            {/* =================================================
                HOME
            ================================================== */}

            <Route
              path="/"
              element={
                profile ? (
                  profile.role ===
                  "orangtua" ? (
                    <Navigate
                      to="/orangtua"
                      replace
                    />
                  ) : (
                    <Home />
                  )
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
              }
            />

            {/* =================================================
                HURUF
            ================================================== */}

            <Route
              path="/huruf"
              element={
                profile ? (
                  <Alphabet />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
              }
            />

            {/* =================================================
                ANGKA
            ================================================== */}

            <Route
              path="/angka"
              element={
                profile ? (
                  <Numbers />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
              }
            />

            {/* =================================================
                HEWAN
            ================================================== */}

            <Route
              path="/hewan"
              element={
                profile ? (
                  <Animals />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
              }
            />

            {/* =================================================
                BUAH
            ================================================== */}

            <Route
              path="/buah"
              element={
                profile ? (
                  <Catalog
                    kind="buah"
                  />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
              }
            />

            {/* =================================================
                KENDARAAN
            ================================================== */}

            <Route
              path="/kendaraan"
              element={
                profile ? (
                  <Catalog
                    kind="kendaraan"
                  />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
              }
            />

            {/* =================================================
                MEWARNAI
            ================================================== */}

            <Route
              path="/mewarnai"
              element={
                profile ? (
                  <Coloring />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
              }
            />

            {/* =================================================
                PERMAINAN
            ================================================== */}

            <Route
              path="/permainan"
              element={
                profile ? (
                  <Games />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
              }
            />

            {/* =================================================
                BINTANGKU
            ================================================== */}

            <Route
              path="/bintangku"
              element={
                profile ? (
                  <Rewards />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
              }
            />

            {/* =================================================
                ORANG TUA
            ================================================== */}

            <Route
              path="/orangtua"
              element={
                <ProtectedParent />
              }
            />

            {/* =================================================
                UNKNOWN ROUTE
            ================================================== */}

            <Route
              path="*"
              element={
                <Navigate
                  to={
                    profile
                      ? profile.role ===
                        "orangtua"
                        ? "/orangtua"
                        : "/"
                      : "/login"
                  }
                  replace
                />
              }
            />

          </Routes>

        </main>

        {/* =================================================
            BOTTOM NAV
        ================================================== */}

        {profile &&
          profile.role !==
            "orangtua" && (
            <BottomNav />
          )}

        {/* =================================================
            PARENT GATE
        ================================================== */}

        <ParentGateModal
          open={parentGateOpen}
          onSuccess={finishGate}
          onCancel={() =>
            setParentGateOpen(false)
          }
        />

      </div>
    </AppProvider>
  );
}

/* =========================================================
   APP LAYOUT
========================================================= */

function AppLayout({
  profile,
  logout,
}: {
  profile: Profile | null;
  logout: () => void;
}) {
  /*
    Header tidak ditampilkan
    ketika belum login.
  */
  if (!profile) {
    return null;
  }

  return (
    <Header
      onAgeClick={() => {}}
      onLogout={logout}
    />
  );
}

/* =========================================================
   PROTECTED PARENT
========================================================= */

function ProtectedParent() {
  const {
    parentUnlocked,
  } = useApp();

  /*
    Jika Parent Gate belum berhasil,
    jangan izinkan masuk.
  */
  if (!parentUnlocked) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  /*
    Parent Gate berhasil.
    Izinkan masuk ke halaman Orang Tua
    walaupun profile aktif masih Anak.
  */
  return <ParentSettings />;
}