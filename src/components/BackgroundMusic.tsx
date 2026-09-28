import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import { useApp } from "@/lib/AppContext";
import { Button } from "@/components/ui/button";

import backgroundMusic from "@/assets/sounds/background.mp3";

export default function BackgroundMusic() {
  const { muted, setMuted } = useApp();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);

  /*
   * Membuat audio hanya satu kali.
   */
  useEffect(() => {
    const audio = new Audio(backgroundMusic);

    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";

    audioRef.current = audio;

    const handlePlay = () => {
      setPlaying(true);
    };

    const handlePause = () => {
      setPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.pause();
      audio.currentTime = 0;

      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);

      audioRef.current = null;
    };
  }, []);

  /*
   * Mengatur mute / unmute.
   */
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = muted;

    if (muted) {
      audio.pause();
      return;
    }

    /*
     * Browser biasanya melarang autoplay.
     * Karena itu kita coba play terlebih dahulu.
     */
    audio
      .play()
      .then(() => {
        setPlaying(true);
      })
      .catch(() => {
        setPlaying(false);
      });
  }, [muted]);

  /*
   * Menunggu interaksi pertama pengguna.
   *
   * Setelah user menyentuh / mengklik halaman,
   * browser biasanya mengizinkan audio dimainkan.
   */
  useEffect(() => {
    if (muted) return;

    const startMusic = () => {
      const audio = audioRef.current;

      if (!audio || audio.muted) return;

      audio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {
          setPlaying(false);
        });
    };

    document.addEventListener("pointerdown", startMusic, {
      once: true,
    });

    document.addEventListener("keydown", startMusic, {
      once: true,
    });

    return () => {
      document.removeEventListener("pointerdown", startMusic);
      document.removeEventListener("keydown", startMusic);
    };
  }, [muted]);

  /*
   * Tombol mute / unmute.
   */
  const toggleMusic = () => {
    const nextMuted = !muted;

    setMuted(nextMuted);

    const audio = audioRef.current;

    if (!audio) return;

    if (nextMuted) {
      audio.pause();
      setPlaying(false);
      return;
    }

    audio.muted = false;

    audio
      .play()
      .then(() => {
        setPlaying(true);
      })
      .catch(() => {
        setPlaying(false);
      });
  };

  /*
   * Bisa disembunyikan sementara ketika diperlukan.
   */
  if (!showButton) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-4 z-50 sm:bottom-6 sm:right-6">
      <div className="relative">
        <Button
          type="button"
          aria-label={
            muted
              ? "Nyalakan musik"
              : "Matikan musik"
          }
          onClick={toggleMusic}
          className={`group relative grid size-14 place-items-center rounded-full border-4 border-white p-0 shadow-xl transition-all duration-200 active:scale-90 ${
            muted
              ? "bg-slate-500 hover:bg-slate-600"
              : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
          {muted ? (
            <VolumeX className="size-6 text-white" />
          ) : (
            <Volume2 className="size-6 text-white" />
          )}

          {!muted && playing && (
            <>
              <span className="absolute inset-0 animate-ping rounded-full bg-pink-400 opacity-30" />

              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-yellow-400 px-1 text-[9px] font-black text-yellow-900">
                ♪
              </span>
            </>
          )}
        </Button>

        <div className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-xl bg-slate-800 px-3 py-2 text-xs font-black text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          {muted ? "Nyalakan musik 🎵" : "Matikan musik 🔇"}
        </div>
      </div>
    </div>
  );
}