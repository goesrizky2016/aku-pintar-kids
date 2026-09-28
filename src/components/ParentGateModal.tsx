import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ParentGateModalProps {
  open: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ParentGateModal({
  open,
  onSuccess,
  onCancel,
}: ParentGateModalProps) {
  const [answer, setAnswer] =
    useState("");

  const [error, setError] =
    useState(false);

  const [first, second] =
    useMemo(() => [4, 3], []);

  const correctAnswer =
    first + second;

  if (!open) {
    return null;
  }

  const submit = () => {
    const numericAnswer =
      Number(answer);

    if (
      numericAnswer ===
      correctAnswer
    ) {
      setAnswer("");
      setError(false);

      /*
        Jawaban benar.
        Kirim ke App.tsx.
      */
      onSuccess();

      return;
    }

    setError(true);
  };

  const handleAnswerChange = (
    value: string
  ) => {
    const numericValue =
      value
        .replace(/\D/g, "")
        .slice(0, 2);

    setAnswer(numericValue);
    setError(false);
  };

  return (
    <div
      data-testid="parent-gate-modal"
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm rounded-[32px] border-4 border-white bg-white p-6 text-center shadow-2xl">

        {/* ICON */}

        <div
          data-testid="parent-gate-icon"
          className="mx-auto grid size-16 place-items-center rounded-2xl bg-pink-100 text-pink-600"
        >
          <ShieldCheck className="size-9" />
        </div>

        {/* TITLE */}

        <h2
          data-testid="parent-gate-title"
          className="mt-4 font-heading text-2xl font-black text-slate-800"
        >
          Menu Orang Tua
        </h2>

        {/* QUESTION */}

        <p
          data-testid="parent-gate-question"
          className="mt-2 font-bold text-slate-600"
        >
          Bantu jawab ya:
          <br />
          <span className="text-xl">
            {first} + {second} = ?
          </span>
        </p>

        {/* INPUT */}

        <Input
          data-testid="parent-gate-answer-input"
          type="text"
          inputMode="numeric"
          value={answer}
          onChange={(event) =>
            handleAnswerChange(
              event.target.value
            )
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter"
            ) {
              submit();
            }
          }}
          className="mx-auto mt-4 min-h-[56px] max-w-[160px] rounded-2xl border-2 border-pink-200 text-center text-2xl font-black"
          aria-label="Jawaban hitungan"
          autoFocus
        />

        {/* ERROR */}

        {error && (
          <p
            data-testid="parent-gate-hint"
            className="mt-3 text-sm font-bold text-pink-600"
          >
            Jawabannya belum tepat.
            Coba hitung lagi 😊
          </p>
        )}

        {/* BUTTON */}

        <div className="mt-5 flex gap-2">
          <Button
            type="button"
            variant="outline"
            data-testid="parent-gate-cancel-button"
            onClick={() => {
              setAnswer("");
              setError(false);
              onCancel();
            }}
            className="min-h-[52px] flex-1 rounded-2xl font-black"
          >
            Nanti
          </Button>

          <Button
            type="button"
            data-testid="parent-gate-submit-button"
            onClick={submit}
            className="min-h-[52px] flex-1 rounded-2xl bg-pink-500 font-black text-white hover:bg-pink-600"
          >
            Masuk
          </Button>
        </div>
      </div>
    </div>
  );
}