import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Gamepad2,
  Music2,
  Palette,
  Sparkles,
  Star,
  Volume2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useApp } from "@/lib/AppContext";

const modules = [
  {
    to: "/huruf",
    emoji: "🔤",
    title: "Mengenal Huruf",
    description: "Belajar A sampai Z",
    tone: "amber",
    test: "home-module-letters",
  },
  {
    to: "/angka",
    emoji: "🔢",
    title: "Mengenal Angka",
    description: "Kenali angka 1 sampai 10",
    tone: "sky",
    test: "home-module-numbers",
  },
  {
    to: "/hewan",
    emoji: "🐶",
    title: "Mengenal Hewan",
    description: "Temui teman berbulu",
    tone: "emerald",
    test: "home-module-animals",
  },
  {
    to: "/buah",
    emoji: "🍎",
    title: "Mengenal Buah",
    description: "Buah sehat dan segar",
    tone: "rose",
    test: "home-module-fruits",
  },
  {
    to: "/kendaraan",
    emoji: "🚗",
    title: "Kendaraan",
    description: "Jelajah dunia kendaraan",
    tone: "indigo",
    test: "home-module-vehicles",
  },
  {
    to: "/mewarnai",
    emoji: "🎨",
    title: "Mewarnai",
    description: "Ayo berkreasi bersama",
    tone: "fuchsia",
    test: "home-module-coloring",
  },
  {
    to: "/permainan",
    emoji: "🎮",
    title: "Permainan",
    description: "Main sambil belajar",
    tone: "orange",
    test: "home-module-games",
  },
  {
    to: "/bintangku",
    emoji: "⭐",
    title: "Bintangku",
    description: "Lihat hadiah belajarmu",
    tone: "yellow",
    test: "home-module-stars",
  },
];

const tones: Record<string, string> = {
  amber:
    "bg-amber-100 border-amber-300 text-amber-950 hover:bg-amber-200",

  sky:
    "bg-sky-100 border-sky-300 text-sky-950 hover:bg-sky-200",

  emerald:
    "bg-emerald-100 border-emerald-300 text-emerald-950 hover:bg-emerald-200",

  rose:
    "bg-rose-100 border-rose-300 text-rose-950 hover:bg-rose-200",

  indigo:
    "bg-indigo-100 border-indigo-300 text-indigo-950 hover:bg-indigo-200",

  fuchsia:
    "bg-fuchsia-100 border-fuchsia-300 text-fuchsia-950 hover:bg-fuchsia-200",

  orange:
    "bg-orange-100 border-orange-300 text-orange-950 hover:bg-orange-200",

  yellow:
    "bg-yellow-100 border-yellow-300 text-yellow-950 hover:bg-yellow-200",
};

export default function Home() {
  const { profile, stars, muted } =
    useApp();

  return (
    <div
      data-testid="page-home"
      className="relative space-y-6"
    >
      {/* =====================================================
          DECORATION
      ===================================================== */}

      <div className="pointer-events-none absolute -left-4 top-0 animate-float text-5xl opacity-80 sm:left-2">
        ☁️
      </div>

      <div className="pointer-events-none absolute right-5 top-16 animate-bob text-3xl opacity-80">
        ⭐
      </div>

      {/* <div className="pointer-events-none absolute bottom-20 left-1/2 animate-float text-4xl opacity-70">
        🌸
      </div> */}

      <div className="pointer-events-none absolute right-1/4 top-1/2 text-3xl opacity-50">
        ✨
      </div>

      {/* =====================================================
          WELCOME BANNER
      ===================================================== */}

      <section
        data-testid="home-welcome-banner"
        className="relative overflow-hidden rounded-[36px] border-4 border-white/90 bg-gradient-to-br from-cyan-400 via-sky-400 to-blue-500 p-5 text-white shadow-2xl sm:p-8"
      >
        {/* Rainbow */}
        <div className="pointer-events-none absolute -right-8 -top-12 select-none text-[130px] opacity-20">
          🌈
        </div>

        <div className="pointer-events-none absolute bottom-[-40px] left-[40%] select-none text-[100px] opacity-10">
          ⭐
        </div>

        <div className="relative grid items-center gap-6 sm:grid-cols-[1fr_auto]">
          <div>
            <Badge
              data-testid="home-welcome-badge"
              className="mb-4 rounded-full bg-white/25 px-4 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-white/25"
            >
              <Sparkles className="mr-1 size-4" />
              Teman belajar hari ini
            </Badge>

            <h1
              data-testid="home-greeting"
              className="font-heading text-4xl font-black leading-tight tracking-tight sm:text-5xl"
            >
              Halo,{" "}
              {profile?.name ??
                "Anak Hebat"}! 👋
            </h1>

            <p
              data-testid="home-greeting-subtitle"
              className="mt-3 text-lg font-bold text-sky-50 sm:text-xl"
            >
              Yuk belajar dan bermain
              hari ini! 🌈
            </p>

            {/* Stars */}
            <div
              data-testid="home-star-summary"
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white/20 px-4 py-3 font-black backdrop-blur-sm"
            >
              <Star className="size-5 fill-yellow-300 text-yellow-300" />

              {stars} bintang terkumpul
            </div>

            {/* Music Status */}
            <div
              data-testid="home-music-status"
              className="mt-3 flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-xs font-bold backdrop-blur-sm"
            >
              {muted ? (
                <>
                  <Music2 className="size-4 opacity-70" />
                  Musik dimatikan
                </>
              ) : (
                <>
                  <Volume2 className="size-4" />
                  Musik sedang menemani 🎵
                </>
              )}
            </div>
          </div>

          {/* Mascot */}
          <div
            data-testid="home-mascot"
            className="mx-auto grid size-36 animate-float place-items-center rounded-[40px] border-4 border-white/60 bg-white/30 text-8xl shadow-2xl sm:mr-5"
          >
            🦊
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK PLAY
      ===================================================== */}

      <section
        data-testid="home-quick-play"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        <Link
          to="/huruf"
          data-testid="home-quick-letter"
          className="group flex min-h-[82px] items-center gap-3 rounded-3xl border-2 border-white bg-white/85 p-3 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-amber-100 text-2xl transition-transform group-hover:scale-110">
            🔤
          </span>

          <span>
            <strong
              data-testid="home-quick-letter-label"
              className="block font-heading text-base font-black"
            >
              Lanjut Huruf
            </strong>

            <small className="font-bold text-slate-500">
              Ayo mulai!
            </small>
          </span>
        </Link>

        <Link
          to="/angka"
          data-testid="home-quick-number"
          className="group flex min-h-[82px] items-center gap-3 rounded-3xl border-2 border-white bg-white/85 p-3 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky-100 text-2xl transition-transform group-hover:scale-110">
            🔢
          </span>

          <span>
            <strong
              data-testid="home-quick-number-label"
              className="block font-heading text-base font-black"
            >
              Hitung Yuk
            </strong>

            <small className="font-bold text-slate-500">
              Seru sekali!
            </small>
          </span>
        </Link>

        <Link
          to="/permainan"
          data-testid="home-quick-game"
          className="group col-span-2 flex min-h-[82px] items-center justify-between rounded-3xl border-2 border-white bg-gradient-to-r from-orange-100 to-yellow-100 p-3 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95 sm:col-span-1"
        >
          <span className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/80 text-2xl transition-transform group-hover:rotate-6 group-hover:scale-110">
              🎮
            </span>

            <strong
              data-testid="home-quick-game-label"
              className="font-heading text-base font-black text-orange-950"
            >
              Main Sekarang
            </strong>
          </span>

          <ArrowRight className="size-5 text-orange-700 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      {/* =====================================================
          SECTION TITLE
      ===================================================== */}

      <div className="flex items-end justify-between gap-3">
        <div>
          <p
            data-testid="home-section-kicker"
            className="font-heading text-sm font-black uppercase tracking-widest text-cyan-600"
          >
            Pilih petualangan
          </p>

          <h2
            data-testid="home-section-title"
            className="font-heading text-3xl font-black text-slate-800"
          >
            Mau belajar apa? 🎈
          </h2>
        </div>

        <div className="hidden items-center gap-2 text-sm font-black text-slate-500 sm:flex">
          <BookOpen className="size-5 text-cyan-500" />
          Pilih satu ya!
        </div>
      </div>

      {/* =====================================================
          MODULE GRID
      ===================================================== */}

      <section
        data-testid="home-module-grid"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {modules.map((module) => (
          <Link
            key={module.to}
            to={module.to}
            data-testid={module.test}
            className={`group relative min-h-[190px] overflow-hidden rounded-[30px] border-4 p-5 shadow-lg transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl active:translate-y-1 active:scale-[.98] ${tones[module.tone]}`}
          >
            {/* Decorative star */}
            <div className="pointer-events-none absolute -right-3 -top-5 text-7xl opacity-15 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
              ✦
            </div>

            {/* Small sparkle */}
            <div className="pointer-events-none absolute bottom-3 right-4 text-2xl opacity-30 transition-transform duration-300 group-hover:rotate-12">
              ✨
            </div>

            <span
              data-testid={`${module.test}-emoji`}
              className="block text-6xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
            >
              {module.emoji}
            </span>

            <strong
              data-testid={`${module.test}-title`}
              className="mt-3 block font-heading text-xl font-black"
            >
              {module.title}
            </strong>

            <span
              data-testid={`${module.test}-description`}
              className="mt-1 block text-sm font-bold opacity-70"
            >
              {module.description}
            </span>

            <span
              data-testid={`${module.test}-arrow`}
              className="absolute bottom-4 right-5 text-xl opacity-60 transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        ))}
      </section>

      {/* =====================================================
          MUSIC CARD
      ===================================================== */}

      <section
        data-testid="home-music-card"
        className="relative overflow-hidden rounded-[28px] border-4 border-white bg-gradient-to-r from-purple-100 via-pink-100 to-sky-100 p-5 shadow-lg"
      >
        <div className="pointer-events-none absolute -right-4 -top-5 text-7xl opacity-10">
          🎵
        </div>

        <div className="relative flex items-center gap-4">
          <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white text-3xl shadow-sm">
            🎵
          </div>

          <div>
            <p className="font-heading text-lg font-black text-slate-800">
              Musik Teman Belajar
            </p>

            <p className="mt-1 text-sm font-bold text-slate-500">
              {muted
                ? "Musik sedang dimatikan. Tekan tombol 🔊 untuk menyalakannya."
                : "Musik sedang menemani kamu belajar dan bermain! 🎶"}
            </p>
          </div>

          <Music2 className="ml-auto hidden size-8 text-purple-400 sm:block" />
        </div>
      </section>

      {/* =====================================================
          ENCOURAGEMENT
      ===================================================== */}

      <section
        data-testid="home-encouragement"
        className="flex items-center gap-4 rounded-[28px] border-4 border-white bg-white/75 p-4 shadow-lg"
      >
        <div
          data-testid="home-encouragement-emoji"
          className="animate-bob text-4xl"
        >
          🌟
        </div>

        <div>
          <p
            data-testid="home-encouragement-title"
            className="font-heading text-lg font-black"
          >
            Setiap langkah itu hebat!
          </p>

          <p
            data-testid="home-encouragement-copy"
            className="text-sm font-bold text-slate-500"
          >
            Main sebentar, belajar banyak,
            dan kumpulkan bintangmu.
          </p>
        </div>

        <Palette className="ml-auto hidden size-8 text-fuchsia-400 sm:block" />
      </section>

      {/* =====================================================
          BOTTOM MOTIVATION
      ===================================================== */}

      <section className="rounded-[28px] border-4 border-white bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 p-5 text-center shadow-lg">
        <div className="flex justify-center gap-2 text-3xl">
          <span>🧠</span>
          <span>🎨</span>
          <span>⭐</span>
          <span>🎵</span>
          <span>🚀</span>
        </div>

        <h3 className="mt-2 font-heading text-xl font-black text-slate-800">
          Ayo belajar dengan gembira! 🎉
        </h3>

        <p className="mt-1 text-sm font-bold text-slate-600">
          Sedikit belajar setiap hari, jadi semakin pintar!
        </p>
      </section>
    </div>
  );
}