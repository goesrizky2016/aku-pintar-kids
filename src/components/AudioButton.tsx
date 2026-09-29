import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speakIndonesian } from "@/lib/speech";
import { useApp } from "@/lib/AppContext";

export default function AudioButton({ text, label = "Dengarkan" }: { text: string; label?: string }) {
  const { muted } = useApp();
  return (
    <Button
      type="button"
      data-testid="audio-pronounce-button"
      onClick={() => speakIndonesian(text, muted)}
      className="min-h-[54px] rounded-2xl border-2 border-white/70 bg-cyan-500 px-5 text-base font-extrabold text-white shadow-[0_5px_0_#0891B2] hover:bg-cyan-600 active:translate-y-1 active:shadow-none"
      aria-label={`${label}: ${text}`}
    >
      <Volume2 className="size-5" /> {muted ? "Suara mati" : label}
    </Button>
  );
}