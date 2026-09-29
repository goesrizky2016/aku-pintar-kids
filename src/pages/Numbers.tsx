import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageIntro from "@/components/PageIntro";
import AudioButton from "@/components/AudioButton";
import { numberItems } from "@/data/learning";
import { useApp } from "@/lib/AppContext";

export default function Numbers() {
  const [selected, setSelected] = useState(2);
  const [answer, setAnswer] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const { completeModule, progress } = useApp();

  const item = numberItems[selected];

  // Ambil progress khusus modul angka
  const angkaProgress = progress.angka;

  // Pindah angka
  const changeNumber = (next: number) => {
    setSelected((next + numberItems.length) % numberItems.length);
    setAnswer(null);
    setMessage("");
  };

  // Pilih jawaban quiz
  const chooseAnswer = (value: number) => {
    setAnswer(value);

    if (value === item.value) {
      setMessage("Hebat! Jawaban kamu benar! 🎉");
      completeModule("angka", 20);
    } else {
      setMessage("Yuk coba lagi 😊");
    }
  };

  return (
    <div data-testid="page-numbers">

      {/* =========================
          HEADER
      ========================= */}
      <PageIntro
        emoji="🔢"
        title="Mengenal Angka"
        description="Hitung benda dan kenali angka 1 sampai 10!"
        color="sky"
      />

      <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">

        {/* =========================
            ANGKA UTAMA
        ========================= */}
        <section
          data-testid="numbers-feature-card"
          className="rounded-[32px] border-4 border-white bg-gradient-to-br from-sky-200 to-cyan-50 p-6 text-center shadow-xl sm:p-8"
        >
          <p
            data-testid="numbers-current-label"
            className="font-heading text-sm font-black uppercase tracking-widest text-sky-700"
          >
            Ini angka
          </p>

          <div
            data-testid="numbers-current-value"
            className="mt-1 font-heading text-[130px] font-black leading-none text-sky-600 drop-shadow-[0_7px_0_#38BDF8]"
          >
            {item.value}
          </div>

          {/* Benda sesuai angka */}
          <div
            data-testid="numbers-objects"
            className="mx-auto flex max-w-[300px] flex-wrap justify-center gap-2 text-4xl"
          >
            {Array.from({ length: item.value }, (_, index) => (
              <span
                data-testid={`numbers-object-${index + 1}`}
                key={index}
                className="animate-pop"
              >
                {item.emoji}
              </span>
            ))}
          </div>

          <p
            data-testid="numbers-spelled"
            className="mt-4 font-heading text-2xl font-black text-slate-800"
          >
            Ini angka {item.name.toUpperCase()}
          </p>

          {/* Tombol suara */}
          <div className="mt-3">
            <AudioButton text={`Ini angka ${item.name}.`} />
          </div>

          {/* =========================
              TOMBOL SEBELUMNYA / BERIKUTNYA
          ========================= */}
          <div className="mt-5 flex flex-wrap justify-center gap-3">

            <Button
              type="button"
              data-testid="numbers-previous-button"
              onClick={() => changeNumber(selected - 1)}
              className="min-h-[52px] rounded-2xl bg-indigo-500 px-5 font-black text-white shadow-[0_5px_0_#4338CA] hover:bg-indigo-600 active:translate-y-1 active:shadow-none"
            >
              <ChevronLeft />
              Sebelumnya
            </Button>

            <Button
              type="button"
              data-testid="numbers-next-button"
              onClick={() => changeNumber(selected + 1)}
              className="min-h-[52px] rounded-2xl bg-sky-500 px-5 font-black text-white shadow-[0_5px_0_#0284C7] hover:bg-sky-600 active:translate-y-1 active:shadow-none"
            >
              Berikutnya
              <ChevronRight />
            </Button>

          </div>
        </section>

        {/* =========================
            QUIZ
        ========================= */}
        <section
          data-testid="numbers-quiz-card"
          className="rounded-[32px] border-4 border-white bg-white/85 p-5 shadow-xl sm:p-7"
        >
          <div className="flex items-start justify-between gap-3">

            <div>
              <p
                data-testid="numbers-quiz-kicker"
                className="font-heading text-sm font-black uppercase tracking-widest text-orange-500"
              >
                Tantangan kecil
              </p>

              <h2
                data-testid="numbers-quiz-title"
                className="mt-1 font-heading text-2xl font-black text-slate-800"
              >
                Berapa jumlah apel?
              </h2>
            </div>

            {/* Progress angka */}
            <span
              data-testid="numbers-progress"
              className="rounded-full bg-sky-100 px-3 py-2 text-xs font-black text-sky-700"
            >
              {angkaProgress}% selesai
            </span>

          </div>

          {/* =========================
              OBJEK APEL
          ========================= */}
          <div
            data-testid="numbers-quiz-objects"
            className="my-6 flex min-h-[90px] flex-wrap items-center justify-center gap-2 rounded-3xl bg-amber-50 p-4 text-5xl"
          >
            {Array.from({ length: item.value }, (_, index) => (
              <span
                data-testid={`quiz-apple-${index + 1}`}
                key={index}
              >
                🍎
              </span>
            ))}
          </div>

          <p
            data-testid="numbers-quiz-question"
            className="text-center text-lg font-black text-slate-700"
          >
            Ada berapa apel? Pilih jawabannya:
          </p>

          {/* =========================
              PILIHAN JAWABAN
          ========================= */}
          <div
            data-testid="numbers-answer-options"
            className="mt-4 grid grid-cols-3 gap-3"
          >
            {[
              Math.max(1, item.value - 1),
              item.value,
              item.value + 1,
            ].map((option, index) => {

              const isCorrect =
                answer === option && option === item.value;

              const isWrong =
                answer === option && option !== item.value;

              return (
                <button
                  type="button"
                  key={`${option}-${index}`}
                  data-testid={`numbers-answer-${option}-${index}`}
                  onClick={() => chooseAnswer(option)}
                  className={`
                    min-h-[68px]
                    rounded-2xl
                    border-4
                    font-heading
                    text-3xl
                    font-black
                    transition-all
                    active:scale-95

                    ${
                      isCorrect
                        ? "border-emerald-400 bg-emerald-100 text-emerald-700"
                        : isWrong
                        ? "border-red-300 bg-red-100 text-red-600"
                        : "border-sky-100 bg-sky-50 text-sky-700 hover:border-sky-300 hover:bg-sky-100"
                    }
                  `}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* =========================
              FEEDBACK
          ========================= */}
          {message ? (
            <div
              data-testid="numbers-feedback"
              className={`
                mt-5 rounded-2xl p-4 text-center font-black

                ${
                  answer === item.value
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-800"
                }
              `}
            >
              {answer === item.value ? (
                <CheckCircle2 className="mx-auto mb-1 size-7" />
              ) : null}

              {message}
            </div>
          ) : (
            <p
              data-testid="numbers-quiz-hint"
              className="mt-5 text-center text-sm font-bold text-slate-500"
            >
              Tidak apa-apa kalau belum tepat, coba lagi ya!
            </p>
          )}
        </section>
      </div>

      {/* =========================
          PILIH ANGKA 1 - 10
      ========================= */}
      <div
        data-testid="numbers-selector"
        className="mt-5 flex flex-wrap justify-center gap-2"
      >
        {numberItems.map((number, index) => (
          <button
            type="button"
            key={number.value}
            data-testid={`numbers-selector-${number.value}`}
            onClick={() => {
              setSelected(index);
              setAnswer(null);
              setMessage("");
            }}
            className={`
              grid
              size-12
              place-items-center
              rounded-2xl
              border-2
              font-heading
              text-lg
              font-black
              transition-all
              active:scale-90

              ${
                selected === index
                  ? "border-sky-400 bg-sky-200 text-sky-900 shadow-[0_3px_0_#38BDF8]"
                  : "border-white bg-white/80 text-slate-500 hover:border-sky-200 hover:bg-sky-50"
              }
            `}
          >
            {number.value}
          </button>
        ))}
      </div>

    </div>
  );
}