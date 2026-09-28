import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioButton from "@/components/AudioButton";
import PageIntro from "@/components/PageIntro";
import { alphabetItems } from "@/data/learning";
import { speakIndonesian } from "@/lib/speech";
import { useApp } from "@/lib/AppContext";

export default function Alphabet() {
  const [selected, setSelected] = useState(0);

  const { muted, completeModule, progress } = useApp();

  const item = alphabetItems[selected];

  const change = (next: number) => {
    setSelected(
      (next + alphabetItems.length) % alphabetItems.length
    );
  };

  /*
   * progress adalah object yang berisi progress
   * masing-masing modul.
   *
   * Contoh:
   * {
   *   huruf: 20,
   *   angka: 10,
   *   hewan: 30,
   *   ...
   * }
   *
   * Karena halaman ini adalah halaman HURUF,
   * kita hanya mengambil progress.huruf.
   */
  const hurufProgress =
    typeof progress === "object" && progress !== null
      ? Number(progress.huruf ?? 0)
      : Number(progress ?? 0);

  return (
    <div data-testid="page-alphabet">

      <PageIntro
        emoji="🔤"
        title="Mengenal Huruf"
        description="Kenali huruf dan kata dengan cara yang seru!"
        color="amber"
      />

      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">

        {/* =========================================
            KARTU HURUF
        ========================================== */}
        <section
          data-testid="alphabet-feature-card"
          className="relative overflow-hidden rounded-[32px] border-4 border-white bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-100 p-6 text-center shadow-xl sm:p-10"
        >

          <div className="absolute left-5 top-4 text-3xl animate-bob">
            ⭐
          </div>

          <div className="absolute right-8 top-8 text-3xl animate-float">
            ☁️
          </div>

          <p
            data-testid="alphabet-current-label"
            className="font-heading text-sm font-black uppercase tracking-[.2em] text-amber-700"
          >
            Huruf pilihanmu
          </p>

          <div
            data-testid="alphabet-current-letter"
            className="mt-2 animate-pop font-heading text-[150px] font-black leading-none text-amber-600 drop-shadow-[0_7px_0_#F59E0B] sm:text-[190px]"
          >
            {item.letter}
          </div>

          <div
            data-testid="alphabet-current-emoji"
            className="animate-float text-7xl"
          >
            {item.emoji}
          </div>

          <p
            data-testid="alphabet-current-word"
            className="mt-3 font-heading text-3xl font-black text-slate-800"
          >
            {item.word}
          </p>

          <p
            data-testid="alphabet-sentence"
            className="mt-1 text-base font-bold text-slate-600"
          >
            {item.letter}, {item.letter} untuk {item.word}!
          </p>

          {/* =========================================
              TOMBOL AUDIO + SELESAI
          ========================================== */}
          <div className="mt-5 flex flex-wrap justify-center gap-3">

            <AudioButton
              text={`${item.letter}, ${item.letter} untuk ${item.word}.`}
            />

            <Button
              type="button"
              data-testid="alphabet-complete-button"
              onClick={() => completeModule("huruf", 10)}
              className="min-h-[54px] rounded-2xl bg-amber-500 px-5 font-black text-white shadow-[0_5px_0_#D97706] hover:bg-amber-600 active:translate-y-1 active:shadow-none"
            >
              ⭐ Tandai Selesai
            </Button>

          </div>

          {/* =========================================
              TOMBOL SEBELUMNYA / BERIKUTNYA
          ========================================== */}
          <div className="mt-5 flex justify-center gap-3">

          <Button
            type="button"
            data-testid="alphabet-previous-button"
            onClick={() => {
              const previousIndex =
                (selected - 1 + alphabetItems.length) %
                alphabetItems.length;

              change(selected - 1);

              speakIndonesian(
                `Huruf ${alphabetItems[previousIndex].letter}`,
                muted
              );
            }}
            className="min-h-[52px] rounded-2xl bg-sky-500 px-5 font-black text-white shadow-[0_5px_0_#0284C7] hover:bg-sky-600 active:translate-y-1 active:shadow-none"
          >
            <ChevronLeft />
            Sebelumnya
          </Button>

            <Button
              type="button"
              data-testid="alphabet-next-button"
              onClick={() => {
                const nextIndex =
                  (selected + 1) % alphabetItems.length;

                change(selected + 1);

                speakIndonesian(
                  `Huruf ${alphabetItems[nextIndex].letter}`,
                  muted
                );
              }}
              className="min-h-[52px] rounded-2xl bg-amber-500 font-black text-white shadow-[0_5px_0_#D97706] hover:bg-amber-600 active:translate-y-1 active:shadow-none"
            >
              Berikutnya
              <ChevronRight />
            </Button>

          </div>

        </section>

        {/* =========================================
            PILIH HURUF
        ========================================== */}
        <section
          data-testid="alphabet-grid-section"
          className="rounded-[32px] border-4 border-white bg-white/80 p-4 shadow-xl sm:p-5"
        >

          <div className="flex items-center justify-between">

            <h2
              data-testid="alphabet-grid-title"
              className="font-heading text-xl font-black text-slate-800"
            >
              Pilih huruf
            </h2>

            {/* 
              PERBAIKAN UTAMA ADA DI SINI.

              Sebelumnya:
              {progress}% selesai

              Sekarang:
              {hurufProgress}% selesai
            */}

            <span
              data-testid="alphabet-progress-label"
              className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800"
            >
              {hurufProgress}% selesai
            </span>

          </div>

          <div
            data-testid="alphabet-grid"
            className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-6"
          >

            {alphabetItems.map((letter, index) => (

              <button
                type="button"
                key={letter.letter}
                data-testid={`alphabet-letter-${letter.letter.toLowerCase()}`}
                onClick={() => setSelected(index)}
                className={`grid min-h-[56px] place-items-center rounded-2xl border-2 font-heading text-2xl font-black transition-all active:scale-90 ${
                  index === selected
                    ? "border-amber-400 bg-amber-200 text-amber-900 shadow-[0_4px_0_#F59E0B]"
                    : "border-amber-100 bg-amber-50 text-amber-700 hover:-translate-y-1 hover:bg-amber-100"
                }`}
              >
                {letter.letter}
              </button>

            ))}

          </div>

          <p
            data-testid="alphabet-grid-hint"
            className="mt-5 rounded-2xl bg-sky-50 p-3 text-center text-sm font-bold text-sky-700"
          >
            Sentuh huruf mana saja untuk melihat contohnya ✨
          </p>

        </section>

      </div>

    </div>
  );
}