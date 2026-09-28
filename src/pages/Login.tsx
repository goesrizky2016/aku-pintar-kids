import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Baby,
  Check,
  LockKeyhole,
  UserRound,
  UsersRound,
} from "lucide-react";

import { useApp } from "@/lib/AppContext";

import type {
  AgeGroup,
  UserRole,
} from "@/lib/AppContext";

import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();

  const {
    setProfile,
    setChildProfile,
    setParentProfile,
    unlockParent,
    childProfile,
  } = useApp();

  const [role, setRole] =
    useState<UserRole>("anak");

  const [name, setName] =
    useState("");

  const [age, setAge] =
    useState<AgeGroup>("6–7 Tahun");

  const [pin, setPin] =
    useState("");

  const [error, setError] =
    useState("");

  /* =======================================================
     LOGIN
  ======================================================= */

  const handleLogin = () => {
    const cleanName =
      name.trim();

    /* =====================================================
       VALIDATE NAME
    ===================================================== */

    if (!cleanName) {
      setError(
        "Yuk isi nama terlebih dahulu 😊"
      );

      return;
    }

    /* =====================================================
       PARENT LOGIN
    ===================================================== */

    if (
      role === "orangtua"
    ) {
      /*
       * PIN harus 4 digit
       */

      if (pin.length !== 4) {
        setError(
          "PIN Orang Tua harus terdiri dari 4 angka."
        );

        return;
      }

      if (!/^\d{4}$/.test(pin)) {
        setError(
          "PIN hanya boleh menggunakan angka."
        );

        return;
      }

      /*
       * Simpan nama orang tua.
       *
       * CONTOH:
       * Ayah
       * Bunda
       * Mama
       * Papa
       */

      setParentProfile({
        name: cleanName,
      });

      /*
       * Session orang tua.
       *
       * Penting:
       * age menggunakan data anak
       * jika sudah tersedia.
       */

      const parentSession = {
        name: cleanName,

        age:
          childProfile?.age ||
          "6–7 Tahun",

        role:
          "orangtua" as const,
      };

      setProfile(
        parentSession
      );

      /*
       * Buka akses orang tua
       */

      unlockParent();

      setError("");

      navigate("/orangtua", {
        replace: true,
      });

      return;
    }

    /* =====================================================
       CHILD LOGIN
    ===================================================== */

    const child = {
      name: cleanName,
      age,
    };

    /*
     * Simpan profil anak.
     */

    setChildProfile(child);

    /*
     * Buat session anak.
     */

    setProfile({
      name: cleanName,
      age,
      role: "anak",
    });

    setError("");

    navigate("/", {
      replace: true,
    });
  };

  /* =======================================================
     PIN CHANGE
  ======================================================= */

  const handlePinChange = (
    value: string
  ) => {
    const numericValue =
      value
        .replace(/\D/g, "")
        .slice(0, 4);

    setPin(numericValue);

    setError("");
  };

  /* =======================================================
     ROLE CHANGE
  ======================================================= */

  const handleRoleChange = (
    nextRole: UserRole
  ) => {
    setRole(nextRole);

    setPin("");

    setError("");

    setName("");
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="flex min-h-[calc(100svh-80px)] items-center justify-center py-8">

      <div className="w-full max-w-lg">

        {/* =================================================
            LOGO
        ================================================= */}

        <div className="mb-6 text-center">

          <div className="mx-auto mb-4 grid size-24 place-items-center rounded-[2rem] bg-white shadow-xl ring-4 ring-pink-100">
            <span className="text-6xl">
              🌈
            </span>
          </div>

          <h1 className="text-3xl font-black text-slate-800 sm:text-4xl">
            Selamat Datang! 👋
          </h1>

          <p className="mt-2 text-sm font-semibold text-slate-500 sm:text-base">
            Yuk belajar dan bermain
            bersama{" "}
            <b className="text-pink-500">
              Aku Pintar
            </b>
            !
          </p>

        </div>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div className="rounded-[2rem] border-4 border-white bg-white/90 p-5 shadow-2xl backdrop-blur sm:p-7">

          {/* =================================================
              ROLE
          ================================================= */}

          <div>

            <h2 className="mb-3 text-center text-lg font-black text-slate-700">
              Siapa yang akan masuk?
            </h2>

            <div className="grid grid-cols-2 gap-3">

              {/* CHILD */}

              <button
                type="button"
                onClick={() =>
                  handleRoleChange(
                    "anak"
                  )
                }
                className={`rounded-2xl border-4 p-4 transition-all active:scale-95 ${
                  role === "anak"
                    ? "border-pink-400 bg-pink-50 shadow-md"
                    : "border-slate-100 bg-slate-50 hover:border-pink-200"
                }`}
              >

                <div className="mx-auto mb-2 grid size-14 place-items-center rounded-2xl bg-pink-100">
                  <Baby className="size-8 text-pink-500" />
                </div>

                <div className="font-black text-slate-700">
                  Anak
                </div>

                <div className="mt-1 text-xs font-semibold text-slate-400">
                  Yuk belajar! 🎈
                </div>

                {role ===
                  "anak" && (
                  <div className="mx-auto mt-2 grid size-6 place-items-center rounded-full bg-pink-500 text-white">
                    <Check className="size-4" />
                  </div>
                )}

              </button>

              {/* PARENT */}

              <button
                type="button"
                onClick={() =>
                  handleRoleChange(
                    "orangtua"
                  )
                }
                className={`rounded-2xl border-4 p-4 transition-all active:scale-95 ${
                  role ===
                  "orangtua"
                    ? "border-blue-400 bg-blue-50 shadow-md"
                    : "border-slate-100 bg-slate-50 hover:border-blue-200"
                }`}
              >

                <div className="mx-auto mb-2 grid size-14 place-items-center rounded-2xl bg-blue-100">
                  <UsersRound className="size-8 text-blue-500" />
                </div>

                <div className="font-black text-slate-700">
                  Orang Tua
                </div>

                <div className="mt-1 text-xs font-semibold text-slate-400">
                  Kelola aplikasi 🔐
                </div>

                {role ===
                  "orangtua" && (
                  <div className="mx-auto mt-2 grid size-6 place-items-center rounded-full bg-blue-500 text-white">
                    <Check className="size-4" />
                  </div>
                )}

              </button>

            </div>

          </div>

          {/* =================================================
              NAME
          ================================================= */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-black text-slate-700">
              Nama{" "}
              {role === "anak"
                ? "Anak"
                : "Orang Tua"}
            </label>

            <div className="relative">

              <UserRound className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={name}
                onChange={(event) => {
                  setName(
                    event.target.value
                  );

                  setError("");
                }}
                onKeyDown={(event) => {
                  if (
                    event.key ===
                    "Enter"
                  ) {
                    handleLogin();
                  }
                }}
                placeholder={
                  role === "anak"
                    ? "Contoh: Budi"
                    : "Contoh: Ayah / Bunda"
                }
                className="h-14 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 pl-12 pr-4 text-base font-bold text-slate-700 outline-none transition focus:border-pink-400 focus:bg-white"
              />

            </div>

          </div>

          {/* =================================================
              AGE - CHILD
          ================================================= */}

          {role === "anak" && (
            <div className="mt-5">

              <label className="mb-2 block text-sm font-black text-slate-700">
                Umur Anak
              </label>

              <div className="grid grid-cols-3 gap-2">

                {(
                  [
                    "2–3 Tahun",
                    "4–5 Tahun",
                    "6–7 Tahun",
                  ] as AgeGroup[]
                ).map((item) => (

                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setAge(item)
                    }
                    className={`rounded-xl border-2 px-2 py-3 text-xs font-black transition sm:text-sm ${
                      age === item
                        ? "border-pink-400 bg-pink-50 text-pink-600"
                        : "border-slate-200 bg-slate-50 text-slate-500 hover:border-pink-200"
                    }`}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>
          )}

          {/* =================================================
              PIN - PARENT
          ================================================= */}

          {role ===
            "orangtua" && (
            <div className="mt-5">

              <label className="mb-2 block text-sm font-black text-slate-700">
                PIN Orang Tua
              </label>

              <div className="relative">

                <LockKeyhole className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(event) =>
                    handlePinChange(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key ===
                      "Enter"
                    ) {
                      handleLogin();
                    }
                  }}
                  placeholder="Masukkan 4 digit PIN"
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border-2
                    border-slate-200
                    bg-slate-50
                    pl-12
                    pr-4
                    text-center
                    text-xl
                    font-black
                    tracking-[0.5em]
                    text-slate-700
                    outline-none
                    transition
                    placeholder:text-sm
                    placeholder:font-semibold
                    placeholder:tracking-normal
                    placeholder:text-slate-400
                    focus:border-blue-400
                    focus:bg-white
                  "
                />

              </div>

              <p className="mt-2 text-center text-xs font-semibold text-slate-400">
                PIN digunakan untuk
                masuk ke area Orang
                Tua.
              </p>

            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="mt-5 rounded-2xl border-2 border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-bold text-red-500">
              {error}
            </div>
          )}

          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <Button
            type="button"
            onClick={handleLogin}
            className={`mt-6 h-14 w-full rounded-2xl text-base font-black shadow-lg transition-all active:scale-[0.98] ${
              role === "anak"
                ? "bg-pink-500 hover:bg-pink-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {role === "anak" ? (
              <>
                🚀 Mulai Belajar
              </>
            ) : (
              <>
                🔐 Masuk sebagai
                Orang Tua
              </>
            )}
          </Button>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="mt-5 text-center">

          <p className="text-xs font-bold text-slate-400">
            🌟 Belajar sedikit setiap
            hari, jadi makin pintar!
          </p>

        </div>

      </div>
    </div>
  );
}