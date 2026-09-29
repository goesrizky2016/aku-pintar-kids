import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import PageIntro from "@/components/PageIntro";
import AudioButton from "@/components/AudioButton";
import { useApp } from "@/lib/AppContext";

type Game = "gambar" | "hitung" | "huruf";

type Question = {
  id: number;
  question: string;
  emoji?: string;
  objects?: string[];
  options: string[];
  answer: string;
  audio?: string;
};

const tabs: {
  id: Game;
  label: string;
  emoji: string;
}[] = [
  {
    id: "gambar",
    label: "Tebak Gambar",
    emoji: "🧩",
  },
  {
    id: "hitung",
    label: "Hitung Benda",
    emoji: "🍎",
  },
  {
    id: "huruf",
    label: "Pilih Huruf",
    emoji: "🔤",
  },
];

/* =========================================================
   SOAL TEBAK GAMBAR
========================================================= */

const gambarQuestions: Question[] = [
  {
    id: 1,
    question: "Ini gambar apa?",
    emoji: "🍎",
    options: ["Apel", "Pisang", "Jeruk", "Mangga"],
    answer: "Apel",
  },
  {
    id: 2,
    question: "Buah apakah ini?",
    emoji: "🍌",
    options: ["Apel", "Pisang", "Semangka", "Anggur"],
    answer: "Pisang",
  },
  {
    id: 3,
    question: "Buah apakah ini?",
    emoji: "🍊",
    options: ["Jeruk", "Apel", "Nanas", "Pir"],
    answer: "Jeruk",
  },
  {
    id: 4,
    question: "Buah apakah ini?",
    emoji: "🍉",
    options: ["Melon", "Semangka", "Pepaya", "Mangga"],
    answer: "Semangka",
  },
  {
    id: 5,
    question: "Hewan apakah ini?",
    emoji: "🐱",
    options: ["Anjing", "Kucing", "Kelinci", "Sapi"],
    answer: "Kucing",
  },
  {
    id: 6,
    question: "Hewan apakah ini?",
    emoji: "🐶",
    options: ["Kucing", "Ayam", "Anjing", "Kuda"],
    answer: "Anjing",
  },
  {
    id: 7,
    question: "Hewan apakah ini?",
    emoji: "🐘",
    options: ["Gajah", "Badak", "Kuda", "Singa"],
    answer: "Gajah",
  },
  {
    id: 8,
    question: "Hewan apakah ini?",
    emoji: "🦁",
    options: ["Harimau", "Singa", "Kucing", "Serigala"],
    answer: "Singa",
  },
  {
    id: 9,
    question: "Hewan apakah ini?",
    emoji: "🐟",
    options: ["Ikan", "Paus", "Katak", "Buaya"],
    answer: "Ikan",
  },
  {
    id: 10,
    question: "Hewan apakah ini?",
    emoji: "🦋",
    options: ["Lebah", "Kupu-kupu", "Burung", "Kepik"],
    answer: "Kupu-kupu",
  },
  {
    id: 11,
    question: "Kendaraan apakah ini?",
    emoji: "🚗",
    options: ["Bus", "Mobil", "Motor", "Truk"],
    answer: "Mobil",
  },
  {
    id: 12,
    question: "Kendaraan apakah ini?",
    emoji: "✈️",
    options: ["Helikopter", "Kapal", "Pesawat", "Roket"],
    answer: "Pesawat",
  },
  {
    id: 13,
    question: "Kendaraan apakah ini?",
    emoji: "🚢",
    options: ["Perahu", "Kapal", "Pesawat", "Bus"],
    answer: "Kapal",
  },
  {
    id: 14,
    question: "Kendaraan apakah ini?",
    emoji: "🚒",
    options: ["Ambulans", "Mobil Polisi", "Pemadam Kebakaran", "Bus"],
    answer: "Pemadam Kebakaran",
  },
  {
    id: 15,
    question: "Benda apakah ini?",
    emoji: "📚",
    options: ["Buku", "Tas", "Pensil", "Sepatu"],
    answer: "Buku",
  },
];

/* =========================================================
   SOAL HITUNG
========================================================= */

const hitungQuestions: Question[] = [
  {
    id: 1,
    question: "Berapa jumlah apel?",
    objects: ["🍎", "🍎", "🍎"],
    options: ["2", "3", "4", "5"],
    answer: "3",
  },
  {
    id: 2,
    question: "Berapa jumlah pisang?",
    objects: ["🍌", "🍌", "🍌", "🍌"],
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    id: 3,
    question: "Berapa jumlah jeruk?",
    objects: ["🍊", "🍊", "🍊", "🍊", "🍊"],
    options: ["4", "5", "6", "7"],
    answer: "5",
  },
  {
    id: 4,
    question: "Berapa jumlah stroberi?",
    objects: ["🍓", "🍓"],
    options: ["1", "2", "3", "4"],
    answer: "2",
  },
  {
    id: 5,
    question: "Berapa jumlah semangka?",
    objects: ["🍉", "🍉", "🍉", "🍉", "🍉", "🍉"],
    options: ["4", "5", "6", "7"],
    answer: "6",
  },
  {
    id: 6,
    question: "Berapa jumlah kucing?",
    objects: ["🐱", "🐱", "🐱", "🐱"],
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    id: 7,
    question: "Berapa jumlah anjing?",
    objects: ["🐶", "🐶", "🐶"],
    options: ["2", "3", "4", "5"],
    answer: "3",
  },
  {
    id: 8,
    question: "Berapa jumlah ikan?",
    objects: ["🐟", "🐟", "🐟", "🐟", "🐟"],
    options: ["3", "4", "5", "6"],
    answer: "5",
  },
  {
    id: 9,
    question: "Berapa jumlah kupu-kupu?",
    objects: ["🦋", "🦋", "🦋", "🦋"],
    options: ["2", "3", "4", "5"],
    answer: "4",
  },
  {
    id: 10,
    question: "Berapa jumlah bunga?",
    objects: ["🌸", "🌸", "🌸", "🌸", "🌸", "🌸"],
    options: ["4", "5", "6", "7"],
    answer: "6",
  },
  {
    id: 11,
    question: "Berapa jumlah bola?",
    objects: ["⚽", "⚽", "⚽"],
    options: ["2", "3", "4", "5"],
    answer: "3",
  },
  {
    id: 12,
    question: "Berapa jumlah bintang?",
    objects: ["⭐", "⭐", "⭐", "⭐", "⭐"],
    options: ["3", "4", "5", "6"],
    answer: "5",
  },
];

/* =========================================================
   SOAL HURUF
========================================================= */

const hurufQuestions: Question[] = [
  {
    id: 1,
    question: "Mana huruf A?",
    options: ["A", "B", "C", "D"],
    answer: "A",
    audio: "A",
  },
  {
    id: 2,
    question: "Mana huruf B?",
    options: ["D", "B", "C", "A"],
    answer: "B",
    audio: "B",
  },
  {
    id: 3,
    question: "Mana huruf C?",
    options: ["A", "C", "B", "D"],
    answer: "C",
    audio: "C",
  },
  {
    id: 4,
    question: "Mana huruf D?",
    options: ["C", "A", "D", "B"],
    answer: "D",
    audio: "D",
  },
  {
    id: 5,
    question: "Mana huruf E?",
    options: ["F", "D", "E", "G"],
    answer: "E",
    audio: "E",
  },
  {
    id: 6,
    question: "Mana huruf F?",
    options: ["F", "E", "G", "H"],
    answer: "F",
    audio: "F",
  },
  {
    id: 7,
    question: "Mana huruf G?",
    options: ["H", "G", "F", "E"],
    answer: "G",
    audio: "G",
  },
  {
    id: 8,
    question: "Mana huruf H?",
    options: ["G", "I", "H", "F"],
    answer: "H",
    audio: "H",
  },
  {
    id: 9,
    question: "Mana huruf I?",
    options: ["J", "H", "I", "G"],
    answer: "I",
    audio: "I",
  },
  {
    id: 10,
    question: "Mana huruf J?",
    options: ["J", "I", "K", "H"],
    answer: "J",
    audio: "J",
  },
  {
    id: 11,
    question: "Mana huruf K?",
    options: ["J", "L", "K", "M"],
    answer: "K",
    audio: "K",
  },
  {
    id: 12,
    question: "Mana huruf L?",
    options: ["M", "K", "L", "N"],
    answer: "L",
    audio: "L",
  },
  {
    id: 13,
    question: "Mana huruf M?",
    options: ["N", "M", "L", "O"],
    answer: "M",
    audio: "M",
  },
  {
    id: 14,
    question: "Mana huruf N?",
    options: ["M", "O", "N", "P"],
    answer: "N",
    audio: "N",
  },
  {
    id: 15,
    question: "Mana huruf O?",
    options: ["P", "N", "O", "Q"],
    answer: "O",
    audio: "O",
  },
  {
    id: 16,
    question: "Mana huruf P?",
    options: ["Q", "P", "O", "R"],
    answer: "P",
    audio: "P",
  },
  {
    id: 17,
    question: "Mana huruf Q?",
    options: ["P", "R", "Q", "S"],
    answer: "Q",
    audio: "Q",
  },
  {
    id: 18,
    question: "Mana huruf R?",
    options: ["S", "Q", "R", "P"],
    answer: "R",
    audio: "R",
  },
  {
    id: 19,
    question: "Mana huruf S?",
    options: ["R", "T", "S", "U"],
    answer: "S",
    audio: "S",
  },
  {
    id: 20,
    question: "Mana huruf T?",
    options: ["U", "S", "T", "V"],
    answer: "T",
    audio: "T",
  },
  {
    id: 21,
    question: "Mana huruf U?",
    options: ["T", "V", "U", "W"],
    answer: "U",
    audio: "U",
  },
  {
    id: 22,
    question: "Mana huruf V?",
    options: ["W", "U", "V", "X"],
    answer: "V",
    audio: "V",
  },
  {
    id: 23,
    question: "Mana huruf W?",
    options: ["V", "X", "W", "U"],
    answer: "W",
    audio: "W",
  },
  {
    id: 24,
    question: "Mana huruf X?",
    options: ["Y", "W", "X", "Z"],
    answer: "X",
    audio: "X",
  },
  {
    id: 25,
    question: "Mana huruf Y?",
    options: ["X", "Y", "Z", "W"],
    answer: "Y",
    audio: "Y",
  },
  {
    id: 26,
    question: "Mana huruf Z?",
    options: ["Z", "Y", "X", "W"],
    answer: "Z",
    audio: "Z",
  },
];

/* =========================================================
   HELPER
========================================================= */

function shuffleQuestions(questions: Question[]) {
  return [...questions].sort(() => Math.random() - 0.5);
}

/* =========================================================
   GAMES
========================================================= */

export default function Games() {
  const [game, setGame] = useState<Game>("gambar");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const { completeModule } = useApp();

  const questions = useMemo(() => {
    if (game === "gambar") {
      return shuffleQuestions(gambarQuestions);
    }

    if (game === "hitung") {
      return shuffleQuestions(hitungQuestions);
    }

    return shuffleQuestions(hurufQuestions);
  }, [game]);

  const currentQuestion = questions[questionIndex];

  const restartGame = (nextGame: Game = game) => {
    setGame(nextGame);
    setQuestionIndex(0);
    setScore(0);
    setStars(0);
    setFeedback("");
    setSelectedAnswer("");
    setAnswered(false);
    setFinished(false);
  };

  const choose = (answer: string) => {
    if (answered || !currentQuestion) return;

    setSelectedAnswer(answer);
    setAnswered(true);

    const correct = answer === currentQuestion.answer;

    if (correct) {
      setScore((value) => value + 1);
      setStars((value) => value + 1);
      setFeedback("Hebat! Jawaban kamu benar! 🎉⭐");
      completeModule("permainan", 10);
    } else {
      setFeedback(
        `Belum tepat 😊 Jawaban yang benar adalah ${currentQuestion.answer}.`,
      );
    }
  };

  const nextQuestion = () => {
    if (questionIndex >= questions.length - 1) {
      setFinished(true);
      return;
    }

    setQuestionIndex((value) => value + 1);
    setFeedback("");
    setSelectedAnswer("");
    setAnswered(false);
  };

  const progress =
    questions.length > 0
      ? ((questionIndex + 1) / questions.length) * 100
      : 0;

  if (finished) {
    const percentage = Math.round(
      (score / questions.length) * 100,
    );

    return (
      <div data-testid="page-games" className="space-y-5">
        <PageIntro
          emoji="🏆"
          title="Permainan Selesai!"
          description="Hebat! Kamu sudah menyelesaikan semua soal."
          color="orange"
        />

        <section
          data-testid="game-result"
          className="mx-auto max-w-2xl overflow-hidden rounded-[36px] border-4 border-white bg-white/90 shadow-2xl"
        >
          <div className="bg-gradient-to-br from-orange-300 via-yellow-200 to-pink-200 p-8 text-center sm:p-12">
            <div className="mx-auto grid size-28 place-items-center rounded-full bg-white shadow-xl">
              <Trophy className="size-16 text-yellow-500" />
            </div>

            <h2 className="mt-6 font-heading text-3xl font-black text-slate-800 sm:text-4xl">
              Kamu Hebat! 🎉
            </h2>

            <p className="mt-2 font-bold text-slate-600">
              Permainan sudah selesai.
            </p>

            <div className="mx-auto mt-7 grid max-w-md grid-cols-3 gap-3">
              <div className="rounded-3xl bg-white p-4 shadow-md">
                <p className="text-xs font-black text-slate-400">
                  BENAR
                </p>
                <p className="mt-1 font-heading text-3xl font-black text-emerald-500">
                  {score}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-4 shadow-md">
                <p className="text-xs font-black text-slate-400">
                  SOAL
                </p>
                <p className="mt-1 font-heading text-3xl font-black text-orange-500">
                  {questions.length}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-4 shadow-md">
                <p className="text-xs font-black text-slate-400">
                  NILAI
                </p>
                <p className="mt-1 font-heading text-3xl font-black text-purple-500">
                  {percentage}%
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-2 text-3xl">
              {Array.from({
                length: Math.max(1, Math.min(stars, 10)),
              }).map((_, index) => (
                <span key={index}>⭐</span>
              ))}
            </div>

            <p className="mt-3 font-black text-orange-700">
              Kamu mendapatkan {stars} bintang! ⭐
            </p>
          </div>

          <div className="p-5 sm:p-7">
            <Button
              type="button"
              onClick={() => restartGame()}
              className="min-h-[58px] w-full rounded-2xl bg-orange-500 font-black text-white shadow-[0_5px_0_#EA580C] hover:bg-orange-600 active:translate-y-1 active:shadow-none"
            >
              <RotateCcw className="size-5" />
              Main Lagi
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div data-testid="page-games" className="space-y-5">
      <PageIntro
        emoji="🎮"
        title="Permainan"
        description="Pilih permainan dan tunjukkan kepintaranmu!"
        color="orange"
      />

      {/* =====================================================
          SCORE
      ===================================================== */}

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-3xl border-4 border-white bg-white/85 p-4 text-center shadow-lg">
          <p className="text-xs font-black text-slate-400">
            SKOR
          </p>
          <div className="mt-1 flex items-center justify-center gap-2">
            <Trophy className="size-5 text-orange-500" />
            <span className="font-heading text-2xl font-black text-orange-600">
              {score}
            </span>
          </div>
        </div>

        <div className="rounded-3xl border-4 border-white bg-white/85 p-4 text-center shadow-lg">
          <p className="text-xs font-black text-slate-400">
            BINTANG
          </p>
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="text-xl">⭐</span>
            <span className="font-heading text-2xl font-black text-yellow-500">
              {stars}
            </span>
          </div>
        </div>

        <div className="col-span-2 rounded-3xl border-4 border-white bg-white/85 p-4 shadow-lg sm:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black text-slate-400">
              SOAL
            </p>
            <p className="font-black text-orange-600">
              {questionIndex + 1} / {questions.length}
            </p>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-orange-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-400 to-pink-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          GAME TABS
      ===================================================== */}

      <div
        data-testid="games-tabs"
        className="grid grid-cols-3 gap-2 sm:gap-3"
      >
        {tabs.map((tab) => {
          const active = game === tab.id;

          return (
            <button
              type="button"
              key={tab.id}
              data-testid={`games-tab-${tab.id}`}
              onClick={() => restartGame(tab.id)}
              className={`min-h-[78px] rounded-3xl border-4 px-2 font-black transition-all active:scale-95 sm:min-h-[90px] ${
                active
                  ? "border-orange-400 bg-gradient-to-br from-orange-300 to-yellow-200 text-orange-900 shadow-[0_5px_0_#FB923C]"
                  : "border-white bg-white/85 text-slate-600 shadow-md hover:-translate-y-1 hover:bg-white"
              }`}
            >
              <span className="block text-3xl">{tab.emoji}</span>
              <span
                data-testid={`games-tab-${tab.id}-label`}
                className="mt-1 block text-[10px] leading-tight sm:text-sm"
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* =====================================================
          GAME BOARD
      ===================================================== */}

      <section
        data-testid="game-board"
        className="mx-auto max-w-2xl overflow-hidden rounded-[36px] border-4 border-white bg-white/90 shadow-2xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-100 via-yellow-100 to-pink-100 px-5 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-orange-500">
                Permainan
              </p>
              <h2 className="font-heading text-xl font-black text-slate-800 sm:text-2xl">
                {tabs.find((item) => item.id === game)?.label}
              </h2>
            </div>

            <div className="grid size-12 place-items-center rounded-2xl bg-white text-2xl shadow-sm">
              {tabs.find((item) => item.id === game)?.emoji}
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          {/* =================================================
              GAMBAR
          ================================================= */}

          {game === "gambar" && (
            <>
              <p
                data-testid="game-gambar-question"
                className="text-center font-heading text-2xl font-black text-slate-800 sm:text-3xl"
              >
                {currentQuestion.question}
              </p>

              <div
                data-testid="game-gambar-emoji"
                className="mx-auto my-7 flex size-48 items-center justify-center rounded-[36px] bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 shadow-inner sm:size-56"
              >
                <span className="animate-float text-[115px] leading-none sm:text-[140px]">
                  {currentQuestion.emoji}
                </span>
              </div>

              <div className="flex justify-center">
                <AudioButton
                  text={currentQuestion.answer}
                  label="🔊 Dengarkan"
                />
              </div>

              <div
                data-testid="game-gambar-options"
                className="mt-7 grid gap-3 sm:grid-cols-2"
              >
                {currentQuestion.options.map((option, index) => {
                  const isCorrect =
                    option === currentQuestion.answer;

                  const isSelected =
                    option === selectedAnswer;

                  let optionClass =
                    "border-orange-100 bg-orange-50 text-orange-900 hover:bg-orange-100";

                  if (answered && isCorrect) {
                    optionClass =
                      "border-emerald-400 bg-emerald-100 text-emerald-800";
                  } else if (
                    answered &&
                    isSelected &&
                    !isCorrect
                  ) {
                    optionClass =
                      "border-red-300 bg-red-100 text-red-800";
                  }

                  return (
                    <button
                      type="button"
                      key={option}
                      data-testid={`game-gambar-option-${index + 1}`}
                      disabled={answered}
                      onClick={() => choose(option)}
                      className={`relative min-h-[64px] rounded-2xl border-4 px-4 font-black transition-all active:scale-95 disabled:cursor-default ${optionClass}`}
                    >
                      <span>
                        {String.fromCharCode(65 + index)}.{" "}
                        {option}
                      </span>

                      {answered && isCorrect && (
                        <Check className="absolute right-4 top-1/2 size-6 -translate-y-1/2 text-emerald-600" />
                      )}

                      {answered &&
                        isSelected &&
                        !isCorrect && (
                          <X className="absolute right-4 top-1/2 size-6 -translate-y-1/2 text-red-600" />
                        )}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* =================================================
              HITUNG
          ================================================= */}

          {game === "hitung" && (
            <>
              <p
                data-testid="game-hitung-question"
                className="text-center font-heading text-2xl font-black text-slate-800 sm:text-3xl"
              >
                {currentQuestion.question}
              </p>

              <div
                data-testid="game-hitung-objects"
                className="my-8 flex min-h-[190px] flex-wrap items-center justify-center gap-3 rounded-[32px] bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 p-6 text-6xl shadow-inner"
              >
                {currentQuestion.objects?.map(
                  (object, index) => (
                    <span
                      key={`${object}-${index}`}
                      className="animate-float"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                      }}
                    >
                      {object}
                    </span>
                  ),
                )}
              </div>

              <div
                data-testid="game-hitung-options"
                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {currentQuestion.options.map((option) => {
                  const isCorrect =
                    option === currentQuestion.answer;

                  const isSelected =
                    option === selectedAnswer;

                  let optionClass =
                    "border-orange-100 bg-orange-50 text-orange-900 hover:bg-orange-100";

                  if (answered && isCorrect) {
                    optionClass =
                      "border-emerald-400 bg-emerald-100 text-emerald-800";
                  } else if (
                    answered &&
                    isSelected &&
                    !isCorrect
                  ) {
                    optionClass =
                      "border-red-300 bg-red-100 text-red-800";
                  }

                  return (
                    <button
                      type="button"
                      key={option}
                      data-testid={`game-hitung-option-${option}`}
                      disabled={answered}
                      onClick={() => choose(option)}
                      className={`min-h-[75px] rounded-3xl border-4 font-heading text-3xl font-black transition-all active:scale-95 disabled:cursor-default ${optionClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* =================================================
              HURUF
          ================================================= */}

          {game === "huruf" && (
            <>
              <p
                data-testid="game-huruf-question"
                className="text-center font-heading text-2xl font-black text-slate-800 sm:text-3xl"
              >
                {currentQuestion.question}
              </p>

              <div className="mx-auto mt-7 flex size-36 items-center justify-center rounded-[36px] bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 shadow-inner">
                <span className="font-heading text-8xl font-black text-purple-600">
                  ?
                </span>
              </div>

              <div
                data-testid="game-huruf-options"
                className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {currentQuestion.options.map((option) => {
                  const isCorrect =
                    option === currentQuestion.answer;

                  const isSelected =
                    option === selectedAnswer;

                  let optionClass =
                    "border-purple-100 bg-purple-50 text-purple-700 hover:bg-purple-100";

                  if (answered && isCorrect) {
                    optionClass =
                      "border-emerald-400 bg-emerald-100 text-emerald-800";
                  } else if (
                    answered &&
                    isSelected &&
                    !isCorrect
                  ) {
                    optionClass =
                      "border-red-300 bg-red-100 text-red-800";
                  }

                  return (
                    <button
                      type="button"
                      key={option}
                      data-testid={`game-huruf-option-${option.toLowerCase()}`}
                      disabled={answered}
                      onClick={() => choose(option)}
                      className={`min-h-[110px] rounded-[28px] border-4 font-heading text-6xl font-black transition-all active:scale-95 disabled:cursor-default ${optionClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {currentQuestion.audio && (
                <div className="mt-6 flex justify-center">
                  <AudioButton
                    text={currentQuestion.audio}
                    label="🔊 Dengarkan Huruf"
                  />
                </div>
              )}
            </>
          )}

          {/* =================================================
              FEEDBACK
          ================================================= */}

          {feedback ? (
            <div
              data-testid="game-feedback"
              className={`mt-7 rounded-3xl border-4 p-5 text-center ${
                feedback.startsWith("Hebat")
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-amber-200 bg-amber-50 text-amber-800"
              }`}
            >
              {feedback.startsWith("Hebat") ? (
                <CheckCircle2 className="mx-auto mb-2 size-9" />
              ) : (
                <X className="mx-auto mb-2 size-9" />
              )}

              <p className="font-black">{feedback}</p>

              {!feedback.startsWith("Hebat") && (
                <p className="mt-2 text-sm font-bold opacity-80">
                  Tidak apa-apa, belajar itu dilakukan sedikit demi
                  sedikit 😊
                </p>
              )}
            </div>
          ) : (
            <div
              data-testid="game-hint"
              className="mt-7 rounded-2xl bg-slate-50 p-4 text-center text-sm font-bold text-slate-500"
            >
              <Sparkles className="mx-auto mb-1 size-5 text-yellow-500" />
              Pilih jawaban yang paling tepat ya! 🌟
            </div>
          )}

          {/* =================================================
              NEXT / RESET
          ================================================= */}

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              data-testid="game-reset-button"
              variant="outline"
              onClick={() => restartGame()}
              className="min-h-[54px] rounded-2xl border-2 border-slate-200 bg-white font-black text-slate-600 hover:bg-slate-50"
            >
              <RotateCcw className="size-5" />
              Mulai Ulang
            </Button>

            <Button
              type="button"
              disabled={!answered}
              onClick={nextQuestion}
              className="min-h-[54px] rounded-2xl bg-orange-500 font-black text-white shadow-[0_5px_0_#EA580C] hover:bg-orange-600 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40"
            >
              {questionIndex >= questions.length - 1
                ? "Lihat Hasil"
                : "Soal Berikutnya"}
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* =====================================================
          MOTIVATION
      ===================================================== */}

      <div className="rounded-[28px] border-4 border-white bg-gradient-to-r from-orange-100 via-yellow-100 to-pink-100 p-5 text-center shadow-lg">
        <div className="flex justify-center gap-2 text-2xl sm:text-3xl">
          <span>🧠</span>
          <span>⭐</span>
          <span>🎮</span>
          <span>🏆</span>
          <span>🌈</span>
        </div>

        <h3 className="mt-2 font-heading text-xl font-black text-slate-800">
          Belajar sambil bermain! 🎉
        </h3>

        <p className="mt-1 text-sm font-bold text-slate-600">
          Semakin sering bermain, semakin pintar kamu! 💪
        </p>
      </div>
    </div>
  );
}