import { useState } from "react";

import {
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  Star,
  UserRound,
  ShieldCheck,
  TrendingUp,
  BookOpen,
  LockKeyhole,
} from "lucide-react";

import PageIntro from "@/components/PageIntro";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/AppContext";

export default function ParentSettings() {
  const {
  childProfile,
  parentProfile,
  stars,
  progress,
  muted,
  setMuted,
  resetProgress,
  lockParent,
} = useApp();

  const [resetMessage, setResetMessage] =
    useState("");

  const [showResetConfirm, setShowResetConfirm] =
    useState(false);

  /* =======================================================
     STATISTICS
  ======================================================= */

  const progressValues =
    Object.values(progress);

  const activeActivities =
    progressValues.filter(
      (value) => value > 0
    ).length;

  const averageProgress =
    progressValues.length > 0
      ? Math.round(
          progressValues.reduce(
            (sum, value) =>
              sum + value,
            0
          ) /
            progressValues.length
        )
      : 0;

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset = () => {
    resetProgress();

    setResetMessage(
      "Progress belajar sudah berhasil diatur ulang."
    );

    setShowResetConfirm(false);

    setTimeout(() => {
      setResetMessage("");
    }, 4000);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      data-testid="page-parent-settings"
      className="space-y-5 pb-8"
    >

      {/* =================================================
          PAGE INTRO
      ================================================= */}

      <PageIntro
        emoji="⚙️"
        title="Pengaturan Orang Tua"
        description="Pantau perjalanan belajar anak dengan nyaman dan tenang."
        color="pink"
      />

      {/* =================================================
          CHILD PROFILE
      ================================================= */}

      <section
        data-testid="parent-profile-card"
        className="overflow-hidden rounded-[32px] border-4 border-white bg-white/90 shadow-xl"
      >

        {/* PROFILE HEADER */}

        <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-sky-100 p-6 sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* CHILD */}

            <div className="flex items-center gap-4">

              <div className="grid size-20 shrink-0 place-items-center rounded-[24px] bg-white text-4xl shadow-lg ring-4 ring-white/70">
                🧒
              </div>

              <div className="min-w-0">

                <div className="mb-1 flex items-center gap-2">

                  <UserRound className="size-4 text-pink-500" />

                  <p
                    data-testid="parent-profile-kicker"
                    className="text-xs font-black uppercase tracking-widest text-pink-600"
                  >
                    Profil Anak
                  </p>

                </div>

                <h2
                  data-testid="parent-profile-name"
                  className="truncate text-2xl font-black text-slate-800 sm:text-3xl"
                >
                  {childProfile?.name ||
                    "Profil Anak Belum Ada"}
                </h2>

                <p
                  data-testid="parent-profile-age"
                  className="mt-1 text-sm font-bold text-slate-500"
                >
                  Kelompok usia:{" "}

                  <span className="text-slate-700">
                    {childProfile?.age ||
                      "Belum dipilih"}
                  </span>
                </p>

              </div>

            </div>

            {/* PARENT */}

            <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-sm">

              <div className="grid size-10 place-items-center rounded-xl bg-blue-100 text-xl">
                👨‍👩‍👧
              </div>

              <div>

                <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                  Orang Tua
                </p>

                <p className="text-sm font-black text-blue-600">
                  {parentProfile?.name ||
                    "Orang Tua"}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-3 sm:p-6">

          {/* STARS */}

          <div
            data-testid="parent-stat-stars"
            className="rounded-3xl bg-gradient-to-br from-yellow-50 to-amber-100 p-4"
          >

            <div className="grid size-11 place-items-center rounded-2xl bg-white shadow-sm">
              <Star className="size-6 fill-amber-400 text-amber-500" />
            </div>

            <strong className="mt-4 block text-3xl font-black text-amber-700">
              {stars}
            </strong>

            <span className="text-sm font-black text-amber-800">
              Total Bintang
            </span>

          </div>

          {/* ACTIVITIES */}

          <div
            data-testid="parent-stat-active"
            className="rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-4"
          >

            <div className="grid size-11 place-items-center rounded-2xl bg-white shadow-sm">
              <BookOpen className="size-6 text-emerald-500" />
            </div>

            <strong className="mt-4 block text-3xl font-black text-emerald-700">
              {activeActivities}
            </strong>

            <span className="text-sm font-black text-emerald-800">
              Aktivitas Dimulai
            </span>

          </div>

          {/* AVERAGE */}

          <div
            data-testid="parent-stat-total"
            className="rounded-3xl bg-gradient-to-br from-sky-50 to-blue-100 p-4"
          >

            <div className="grid size-11 place-items-center rounded-2xl bg-white shadow-sm">
              <TrendingUp className="size-6 text-sky-500" />
            </div>

            <strong className="mt-4 block text-3xl font-black text-sky-700">
              {averageProgress}%
            </strong>

            <span className="text-sm font-black text-sky-800">
              Rata-rata Belajar
            </span>

          </div>

        </div>

      </section>

      {/* =================================================
          SETTINGS
      ================================================= */}

      <section
        data-testid="parent-preferences-card"
        className="grid gap-5 lg:grid-cols-2"
      >

        {/* =================================================
            SOUND
        ================================================= */}

        <div className="rounded-[32px] border-4 border-white bg-white/90 p-6 shadow-xl">

          <div className="flex items-center gap-3">

            <div className="grid size-12 place-items-center rounded-2xl bg-sky-100">

              {muted ? (
                <VolumeX className="size-6 text-sky-600" />
              ) : (
                <Volume2 className="size-6 text-sky-600" />
              )}

            </div>

            <div>

              <h2 className="text-xl font-black text-slate-800">
                Pengaturan Suara
              </h2>

              <p className="text-sm font-semibold text-slate-400">
                Atur suara aplikasi anak.
              </p>

            </div>

          </div>

          <button
            type="button"
            data-testid="parent-sound-toggle"
            onClick={() =>
              setMuted(!muted)
            }
            className="mt-5 flex min-h-[72px] w-full items-center justify-between rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 transition-all hover:bg-slate-100 active:scale-[.98]"
          >

            <span className="flex items-center gap-3">

              <span
                className={`grid size-10 place-items-center rounded-xl ${
                  muted
                    ? "bg-slate-200"
                    : "bg-emerald-100"
                }`}
              >

                {muted ? (
                  <VolumeX className="size-5 text-slate-500" />
                ) : (
                  <Volume2 className="size-5 text-emerald-600" />
                )}

              </span>

              <span className="text-left">

                <span className="block text-sm font-black text-slate-700">
                  Suara aplikasi
                </span>

                <span className="block text-xs font-semibold text-slate-400">
                  {muted
                    ? "Suara sedang dimatikan"
                    : "Suara sedang aktif"}
                </span>

              </span>

            </span>

            {/* TOGGLE */}

            <span
              className={`relative h-8 w-14 rounded-full p-1 transition-colors ${
                muted
                  ? "bg-slate-300"
                  : "bg-emerald-500"
              }`}
            >

              <span
                className={`block size-6 rounded-full bg-white shadow-md transition-transform ${
                  muted
                    ? "translate-x-0"
                    : "translate-x-6"
                }`}
              />

            </span>

          </button>

        </div>

        {/* =================================================
            PRIVACY
        ================================================= */}

        <div className="rounded-[32px] border-4 border-white bg-white/90 p-6 shadow-xl">

          <div className="flex items-center gap-3">

            <div className="grid size-12 place-items-center rounded-2xl bg-emerald-100">
              <LockKeyhole className="size-6 text-emerald-600" />
            </div>

            <div>

              <h2 className="text-xl font-black text-slate-800">
                Privasi & Data
              </h2>

              <p className="text-sm font-semibold text-slate-400">
                Data belajar tersimpan di perangkat.
              </p>

            </div>

          </div>

          <div
            data-testid="parent-safe-copy"
            className="mt-5 rounded-2xl bg-emerald-50 p-4"
          >

            <div className="flex gap-3">

              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" />

              <div>

                <p className="text-sm font-black text-emerald-800">
                  Data tersimpan secara lokal
                </p>

                <p className="mt-1 text-xs font-semibold leading-relaxed text-emerald-700">
                  Progress belajar disimpan
                  di perangkat ini. Tidak ada
                  ranking atau kompetisi dengan
                  anak lain.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          PROGRESS
      ================================================= */}

      <section
        data-testid="parent-progress-card"
        className="rounded-[32px] border-4 border-white bg-white/90 p-5 shadow-xl sm:p-6"
      >

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <span className="grid size-10 place-items-center rounded-xl bg-pink-100 text-xl">
                📊
              </span>

              <h2
                data-testid="parent-progress-title"
                className="text-2xl font-black text-slate-800"
              >
                Ringkasan Progress
              </h2>

            </div>

            <p className="mt-2 text-sm font-semibold text-slate-400">
              Lihat perkembangan belajar
              anak dari setiap aktivitas.
            </p>

          </div>

          <div className="rounded-2xl bg-slate-100 px-4 py-2">

            <span className="text-xs font-black uppercase tracking-wide text-slate-400">
              Rata-rata
            </span>

            <strong className="ml-2 text-lg font-black text-slate-700">
              {averageProgress}%
            </strong>

          </div>

        </div>

        {/* =================================================
            PROGRESS LIST
        ================================================= */}

        <div className="mt-6 space-y-4">

          {Object.entries(
            progress
          ).map(
            ([key, value]) => (
              <div
                data-testid={`parent-progress-${key}`}
                key={key}
                className="rounded-2xl border-2 border-slate-100 bg-slate-50 p-4"
              >

                <div className="flex items-center gap-3">

                  {/* ICON */}

                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-xl shadow-sm">
                    {getActivityEmoji(
                      key
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">

                    <div className="flex items-center justify-between gap-3">

                      <span className="truncate text-sm font-black text-slate-700 sm:text-base">
                        {getActivityName(
                          key
                        )}
                      </span>

                      <strong className="shrink-0 text-sm font-black text-slate-700">
                        {value}%
                      </strong>

                    </div>

                    {/* BAR */}

                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200">

                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getProgressColor(
                          value
                        )}`}
                        style={{
                          width: `${value}%`,
                        }}
                      />

                    </div>

                    {/* STATUS */}

                    <div className="mt-2 flex items-center justify-between">

                      <span className="text-[11px] font-bold text-slate-400">
                        {value === 0
                          ? "Belum dimulai"
                          : value < 50
                          ? "Sedang belajar"
                          : value < 80
                          ? "Perkembangan bagus"
                          : "Hebat sekali! 🎉"}
                      </span>

                      {value > 0 && (
                        <Check className="size-4 text-emerald-500" />
                      )}

                    </div>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

        {/* =================================================
            RESET
        ================================================= */}

        <div className="mt-6 border-t-2 border-dashed border-slate-200 pt-5">

          {!showResetConfirm ? (

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

              <Button
                type="button"
                data-testid="parent-reset-progress-button"
                onClick={() =>
                  setShowResetConfirm(
                    true
                  )
                }
                className="min-h-[54px] rounded-2xl bg-rose-500 px-5 font-black text-white shadow-md hover:bg-rose-600"
              >
                <RotateCcw className="size-5" />

                Reset Progress
              </Button>

              <p className="text-xs font-semibold text-slate-400">
                Reset akan menghapus progress
                dan jumlah bintang.
              </p>

            </div>

          ) : (

            <div className="rounded-2xl border-2 border-rose-100 bg-rose-50 p-4">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="font-black text-rose-700">
                    Reset semua progress?
                  </p>

                  <p className="mt-1 text-xs font-semibold text-rose-500">
                    Progress dan bintang akan
                    kembali ke 0.
                  </p>

                </div>

                <div className="flex gap-2">

                  <Button
                    type="button"
                    onClick={() =>
                      setShowResetConfirm(
                        false
                      )
                    }
                    className="min-h-[46px] rounded-xl bg-white font-black text-slate-600 hover:bg-slate-100"
                  >
                    Batal
                  </Button>

                  <Button
                    type="button"
                    onClick={handleReset}
                    className="min-h-[46px] rounded-xl bg-rose-500 font-black text-white hover:bg-rose-600"
                  >
                    Ya, Reset
                  </Button>

                </div>

              </div>

            </div>
          )}

          {/* RESET SUCCESS */}

          {resetMessage && (
            <div
              data-testid="parent-reset-message"
              className="mt-3 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700"
            >
              <Check className="size-5" />

              {resetMessage}
            </div>
          )}

        </div>

      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div
        data-testid="parent-local-storage-note"
        className="rounded-2xl border-2 border-white/80 bg-white/60 p-4 text-center"
      >

        <p className="text-xs font-bold leading-relaxed text-slate-500">
          🌈 Aku Pintar Kids menggunakan
          penyimpanan lokal agar aplikasi
          tetap cepat, ringan, dan ramah
          privasi.
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   ACTIVITY NAME
========================================================= */

function getActivityName(
  key: string
) {
  const names: Record<
    string,
    string
  > = {
    huruf: "Belajar Huruf",
    angka: "Belajar Angka",
    hewan: "Mengenal Hewan",
    buah: "Mengenal Buah",
    kendaraan:
      "Mengenal Kendaraan",
    mewarnai: "Mewarnai",
    permainan: "Permainan",
  };

  return (
    names[key] ||
    key.charAt(0).toUpperCase() +
      key.slice(1)
  );
}

/* =========================================================
   ACTIVITY EMOJI
========================================================= */

function getActivityEmoji(
  key: string
) {
  const emojis: Record<
    string,
    string
  > = {
    huruf: "🔤",
    angka: "🔢",
    hewan: "🐶",
    buah: "🍎",
    kendaraan: "🚗",
    mewarnai: "🎨",
    permainan: "🎮",
  };

  return (
    emojis[key] || "📚"
  );
}

/* =========================================================
   PROGRESS COLOR
========================================================= */

function getProgressColor(
  value: number
) {
  if (value >= 80) {
    return "bg-emerald-500";
  }

  if (value >= 50) {
    return "bg-sky-500";
  }

  if (value > 0) {
    return "bg-amber-400";
  }

  return "bg-slate-200";
}