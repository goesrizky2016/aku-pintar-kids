import { Link } from "react-router-dom";
import {
  Settings,
  Volume2,
  VolumeX,
  Star,
  LogOut,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/lib/AppContext";

export default function Header({
  onAgeClick,
  onLogout,
}: {
  onAgeClick: () => void;
  onLogout: () => void;
}) {
  const {
    profile,
    stars,
    muted,
    setMuted,
    openParentGate,
  } = useApp();

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin keluar dari aplikasi?"
    );

    if (!confirmed) return;

    onLogout();
  };

  return (
    <header
      data-testid="header-top-bar"
      className="sticky top-0 z-30 border-b-4 border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-xl sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">

        {/* =====================================================
            LOGO
        ====================================================== */}
        <Link
          to="/"
          data-testid="app-header-title"
          className="flex min-w-0 items-center gap-2"
        >
          <span
            data-testid="header-logo-emoji"
            className="grid size-11 shrink-0 place-items-center rounded-2xl bg-amber-100 text-2xl shadow-[0_4px_0_#FCD34D]"
          >
            🌈
          </span>

          <span className="truncate font-heading text-lg font-black leading-tight text-slate-800 sm:text-2xl">
            Aku Pintar Kids
          </span>
        </Link>

        {/* =====================================================
            RIGHT MENU
        ====================================================== */}
        <div className="flex items-center gap-2">

          {/* ===================================================
              PROFILE
          ==================================================== */}
          <button
            type="button"
            data-testid="header-age-selector-button"
            onClick={onAgeClick}
            className="hidden min-h-[48px] rounded-2xl bg-sky-100 px-3 text-left text-xs font-extrabold text-sky-800 transition-transform hover:scale-105 sm:block"
          >
            <span
              data-testid="header-age-label"
              className="block text-[10px] uppercase tracking-wide"
            >
              Teman belajar
            </span>

            <span
              data-testid="header-age-value"
              className="flex items-center gap-1"
            >
              <UserRound className="size-3" />

              {profile?.name
                ? profile.name
                : "Pilih profil"}
            </span>
          </button>

          {/* ===================================================
              STARS
          ==================================================== */}
          <Badge
            data-testid="header-star-count-badge"
            className="h-11 rounded-2xl bg-yellow-100 px-3 text-base font-black text-amber-800 hover:bg-yellow-100"
          >
            <Star className="size-4 fill-amber-400 text-amber-500" />

            {stars}
          </Badge>

          {/* ===================================================
              AUDIO
          ==================================================== */}
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            data-testid="header-audio-mute-toggle"
            onClick={() => setMuted(!muted)}
            className="rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200"
            aria-label={
              muted
                ? "Nyalakan suara"
                : "Matikan suara"
            }
          >
            {muted ? (
              <VolumeX />
            ) : (
              <Volume2 />
            )}
          </Button>

          {/* ===================================================
              ORANG TUA
          ==================================================== */}
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            data-testid="header-parent-gate-button"
            onClick={() =>
              openParentGate("/orangtua")
            }
            className="rounded-2xl bg-pink-100 text-pink-700 hover:bg-pink-200"
            aria-label="Menu orang tua"
          >
            <Settings />
          </Button>

          {/* ===================================================
              LOGOUT
          ==================================================== */}
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            data-testid="header-logout-button"
            onClick={handleLogout}
            className="rounded-2xl bg-red-100 text-red-600 hover:bg-red-200"
            aria-label="Keluar dari aplikasi"
          >
            <LogOut />
          </Button>

        </div>
      </div>
    </header>
  );
}