import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import backgroundMusic from "@/assets/sounds/background.mp3";

export default function BackgroundMusic() {
  // =====================================================
  // AUDIO BACKGROUND MUSIC
  // =====================================================

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // State ini KHUSUS backsound.
  // Tidak berhubungan dengan suara AI / TTS.
  const [musicMuted, setMusicMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  // =====================================================
  // CREATE AUDIO
  // =====================================================

  useEffect(() => {
    const audio = new Audio(backgroundMusic);

    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";

    // Pastikan audio tidak muted saat pertama dibuat.
    audio.muted = false;

    audioRef.current = audio;

    // -----------------------------------------------------
    // EVENT PLAY
    // -----------------------------------------------------

    const handlePlay = () => {
      setPlaying(true);
    };

    // -----------------------------------------------------
    // EVENT PAUSE
    // -----------------------------------------------------

    const handlePause = () => {
      setPlaying(false);
    };

    // -----------------------------------------------------
    // EVENT ENDED
    // -----------------------------------------------------

    const handleEnded = () => {
      setPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    // -----------------------------------------------------
    // CLEANUP
    // -----------------------------------------------------

    return () => {
      audio.pause();
      audio.currentTime = 0;

      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);

      audioRef.current = null;
    };
  }, []);

  // =====================================================
  // START MUSIC AFTER USER INTERACTION
  // =====================================================

  useEffect(() => {
    if (musicMuted) {
      return;
    }

    const startMusic = () => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      // Jangan jalankan jika user sudah mematikan musik.
      if (musicMuted) {
        return;
      }

      // Jangan mempengaruhi audio lain.
      audio.muted = false;

      audio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {
          // Browser mungkin masih menolak autoplay.
          setPlaying(false);
        });
    };

    // -----------------------------------------------------
    // User klik / sentuh layar
    // -----------------------------------------------------

    document.addEventListener(
      "pointerdown",
      startMusic,
      {
        once: true,
      }
    );

    // -----------------------------------------------------
    // User menekan keyboard
    // -----------------------------------------------------

    document.addEventListener(
      "keydown",
      startMusic,
      {
        once: true,
      }
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        startMusic
      );

      document.removeEventListener(
        "keydown",
        startMusic
      );
    };
  }, [musicMuted]);

  // =====================================================
  // TOGGLE BACKGROUND MUSIC
  // =====================================================

  const toggleMusic = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    // ===================================================
    // MATIKAN BACKSOUND
    // ===================================================

    if (!musicMuted) {
      audio.pause();

      // Hanya audio background ini yang dimute.
      audio.muted = true;

      setMusicMuted(true);
      setPlaying(false);

      return;
    }

    // ===================================================
    // NYALAKAN BACKSOUND
    // ===================================================

    audio.muted = false;

    setMusicMuted(false);

    audio
      .play()
      .then(() => {
        setPlaying(true);
      })
      .catch(() => {
        setPlaying(false);
      });
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="fixed bottom-24 right-4 z-50 sm:bottom-6 sm:right-6">
      <div className="group relative">

        {/* =================================================
            BUTTON
        ================================================== */}

        <Button
          type="button"
          aria-label={
            musicMuted
              ? "Nyalakan musik"
              : "Matikan musik"
          }
          title={
            musicMuted
              ? "Nyalakan musik"
              : "Matikan musik"
          }
          onClick={toggleMusic}
          className={`relative grid size-14 place-items-center rounded-full border-4 border-white p-0 shadow-xl transition-all duration-200 active:scale-90 ${
            musicMuted
              ? "bg-slate-500 hover:bg-slate-600"
              : "bg-pink-500 hover:bg-pink-600"
          }`}
        >

          {/* =================================================
              ICON
          ================================================== */}

          {musicMuted ? (
            <VolumeX
              className="size-6 text-white"
            />
          ) : (
            <Volume2
              className="size-6 text-white"
            />
          )}

          {/* =================================================
              MUSIC PLAYING ANIMATION
          ================================================== */}

          {!musicMuted && playing && (
            <>
              <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-pink-400 opacity-30" />

              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-yellow-400 px-1 text-[9px] font-black text-yellow-900">
                ♪
              </span>
            </>
          )}
        </Button>

        {/* =================================================
            TOOLTIP
        ================================================== */}

        <div className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-xl bg-slate-800 px-3 py-2 text-xs font-black text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
          {musicMuted
            ? "Nyalakan musik 🎵"
            : "Matikan musik 🔇"}
        </div>
      </div>
    </div>
  );
}