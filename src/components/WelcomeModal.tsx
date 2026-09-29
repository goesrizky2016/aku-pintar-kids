import { useState } from "react";
import { Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AgeGroup, Profile } from "@/lib/AppContext";

const ages: {
  value: AgeGroup;
  emoji: string;
  detail: string;
}[] = [
  {
    value: "2–3 Tahun",
    emoji: "👶",
    detail: "Gambar besar & suara",
  },
  {
    value: "4–5 Tahun",
    emoji: "🧒",
    detail: "Huruf & angka seru",
  },
  {
    value: "6–7 Tahun",
    emoji: "👦",
    detail: "Tantangan pintar",
  },
];

export default function WelcomeModal({
  open,
  initialProfile,
  onComplete,
}: {
  open: boolean;
  initialProfile: Profile | null;
  onComplete: (profile: Profile) => void;
}) {
  const [name, setName] = useState(initialProfile?.name ?? "");
  const [age, setAge] = useState<AgeGroup>(
    initialProfile?.age ?? "4–5 Tahun"
  );

  if (!open) return null;

  return (
    <div
      data-testid="welcome-age-selection-modal"
      className="fixed inset-0 z-50 grid place-items-center bg-sky-950/35 p-4 backdrop-blur-sm"
    >
      <div className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-[32px] border-4 border-white bg-gradient-to-br from-white via-sky-50 to-pink-50 p-5 shadow-2xl sm:p-8">
        <div className="absolute -right-2 -top-7 animate-bob text-5xl">
          🎈
        </div>

        <div className="text-center">
          <div
            data-testid="welcome-mascot"
            className="mx-auto mb-3 grid size-24 animate-float place-items-center rounded-[30px] bg-amber-100 text-6xl shadow-[0_8px_0_#FCD34D]"
          >
            🦊
          </div>

          <p
            data-testid="welcome-kicker"
            className="mb-1 font-heading text-sm font-black uppercase tracking-[0.2em] text-cyan-600"
          >
            Selamat datang!
          </p>

          <h1
            data-testid="welcome-title"
            className="font-heading text-4xl font-black text-slate-800"
          >
            Aku Pintar Kids
          </h1>

          <p
            data-testid="welcome-subtitle"
            className="mt-2 text-base font-bold text-slate-600"
          >
            Belajar • Bermain • Tumbuh 🌈
          </p>
        </div>

        <label
          data-testid="welcome-name-label"
          className="mt-6 block text-sm font-black text-slate-700"
          htmlFor="child-name"
        >
          Nama anak
        </label>

        <Input
          id="child-name"
          data-testid="welcome-name-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Contoh: Budi"
          className="mt-2 min-h-[52px] rounded-2xl border-2 border-sky-200 bg-white text-lg font-bold"
        />

        <p
          data-testid="welcome-age-label"
          className="mt-5 text-sm font-black text-slate-700"
        >
          Pilih usia teman belajar
        </p>

        <div className="mt-2 grid grid-cols-3 gap-2">
          {ages.map((option) => (
            <button
              type="button"
              key={option.value}
              data-testid={`welcome-age-group-${option.value
                .slice(0, 3)
                .replace("–", "-")}`}
              onClick={() => setAge(option.value)}
              className={`min-h-[116px] rounded-2xl border-4 p-2 text-center transition-all active:scale-95 ${
                age === option.value
                  ? "border-cyan-400 bg-cyan-50 shadow-[0_5px_0_#67E8F9]"
                  : "border-white bg-white shadow-md hover:-translate-y-1"
              }`}
            >
              <span
                data-testid={`welcome-age-emoji-${option.value.slice(0, 3)}`}
                className="block text-4xl"
              >
                {option.emoji}
              </span>

              <span
                data-testid={`welcome-age-text-${option.value.slice(0, 3)}`}
                className="mt-1 block text-xs font-black text-slate-800"
              >
                {option.value}
              </span>

              <span
                data-testid={`welcome-age-detail-${option.value.slice(0, 3)}`}
                className="mt-1 block text-[10px] font-bold text-slate-500"
              >
                {option.detail}
              </span>
            </button>
          ))}
        </div>

        <Button
          type="button"
          data-testid="welcome-start-app-button"
          onClick={() =>
            onComplete({
              name: name.trim() || "Anak Hebat",
              age,
              role: "anak",
            })
          }
          className="mt-6 min-h-[60px] w-full rounded-2xl bg-orange-500 text-lg font-black text-white shadow-[0_7px_0_#EA580C] hover:bg-orange-600 active:translate-y-1 active:shadow-none"
        >
          <Rocket className="size-6" />
          Mulai Belajar
        </Button>

        <p
          data-testid="welcome-footer-copy"
          className="mt-4 flex items-center justify-center gap-1 text-center text-xs font-bold text-slate-500"
        >
          <Sparkles className="size-4 text-amber-400" />
          Belajar jadi menyenangkan!
        </p>
      </div>
    </div>
  );
}