import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const colorClasses: Record<string, string> = {
  sky: "bg-sky-100/80", amber: "bg-amber-100/80", emerald: "bg-emerald-100/80", rose: "bg-rose-100/80", indigo: "bg-indigo-100/80", fuchsia: "bg-fuchsia-100/80", orange: "bg-orange-100/80", yellow: "bg-yellow-100/80", pink: "bg-pink-100/80",
};

export default function PageIntro({ emoji, title, description, color = "sky" }: { emoji: string; title: string; description: string; color?: string }) {
  return <div data-testid={`page-intro-${title.toLowerCase().replaceAll(" ", "-")}`} className={`mb-5 flex items-start gap-3 rounded-[28px] border-4 border-white/80 p-4 shadow-lg sm:p-5 ${colorClasses[color] ?? colorClasses.sky}`}>
    <Link to="/" data-testid="page-intro-back-button" className="mt-1"><Button type="button" variant="ghost" size="icon-lg" className="rounded-2xl bg-white/70 text-slate-600 hover:bg-white"><ArrowLeft /></Button></Link>
    <div>
      <div data-testid="page-intro-emoji" className="text-4xl">{emoji}</div>
      <h1 data-testid="page-intro-title" className="font-heading text-3xl font-black text-slate-800 sm:text-4xl">{title}</h1>
      <p data-testid="page-intro-description" className="mt-1 text-sm font-bold text-slate-600 sm:text-base">{description}</p>
    </div>
  </div>;
}