import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, Palette, Settings, Star } from "lucide-react";
import { useApp } from "@/lib/AppContext";

const items = [
  { to: "/", label: "Beranda", icon: Home, id: "bottom-nav-home" },
  { to: "/huruf", label: "Belajar", icon: BookOpen, id: "bottom-nav-learn" },
  { to: "/mewarnai", label: "Warna", icon: Palette, id: "bottom-nav-color" },
  { to: "/bintangku", label: "Bintang", icon: Star, id: "bottom-nav-stars" },
];

export default function BottomNav() {
  const location = useLocation();
  const { openParentGate } = useApp();
  return (
    <nav data-testid="mobile-bottom-nav" className="fixed inset-x-0 bottom-0 z-30 border-t-4 border-white/80 bg-white/90 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(56,189,248,0.12)] backdrop-blur-xl sm:px-6">
      <div className="mx-auto grid max-w-2xl grid-cols-5 gap-1">
        {items.map(({ to, label, icon: Icon, id }) => {
          const active = location.pathname === to;
          return <Link key={to} to={to} data-testid={id} className={`flex min-h-[58px] flex-col items-center justify-center rounded-2xl text-[11px] font-black transition-all active:scale-95 ${active ? "bg-sky-100 text-sky-700 shadow-inner" : "text-slate-500 hover:bg-slate-50"}`}>
            <Icon className={`mb-0.5 size-6 ${active && label === "Bintang" ? "fill-amber-400 text-amber-500" : ""}`} />
            <span data-testid={`${id}-label`}>{label}</span>
          </Link>;
        })}
        <button type="button" data-testid="bottom-nav-parent" onClick={() => openParentGate("/orangtua")} className="flex min-h-[58px] flex-col items-center justify-center rounded-2xl text-[11px] font-black text-slate-500 transition-all hover:bg-pink-50 hover:text-pink-600 active:scale-95">
          <Settings className="mb-0.5 size-6" />
          <span data-testid="bottom-nav-parent-label">Orang Tua</span>
        </button>
      </div>
    </nav>
  );
}