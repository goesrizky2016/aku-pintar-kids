import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  Download,
  Eraser,
  Paintbrush,
  RotateCcw,
  Trash2,
  Sparkles,
  Palette,
  Check,
} from "lucide-react";

import PageIntro from "@/components/PageIntro";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/AppContext";

/* =========================================================
   DATA WARNA
========================================================= */

const colors = [
  {
    name: "Merah",
    value: "#ef4444",
  },
  {
    name: "Merah Muda",
    value: "#fb7185",
  },
  {
    name: "Oranye",
    value: "#f97316",
  },
  {
    name: "Kuning",
    value: "#eab308",
  },
  {
    name: "Hijau",
    value: "#22c55e",
  },
  {
    name: "Hijau Muda",
    value: "#84cc16",
  },
  {
    name: "Hijau Tua",
    value: "#15803d",
  },
  {
    name: "Biru",
    value: "#3b82f6",
  },
  {
    name: "Biru Muda",
    value: "#38bdf8",
  },
  {
    name: "Biru Tua",
    value: "#1d4ed8",
  },
  {
    name: "Ungu",
    value: "#a855f7",
  },
  {
    name: "Ungu Tua",
    value: "#7e22ce",
  },
  {
    name: "Pink",
    value: "#ec4899",
  },
  {
    name: "Cokelat",
    value: "#92400e",
  },
  {
    name: "Cokelat Muda",
    value: "#d97706",
  },
  {
    name: "Abu-abu",
    value: "#6b7280",
  },
  {
    name: "Hitam",
    value: "#111827",
  },
  {
    name: "Putih",
    value: "#ffffff",
  },
];

/* =========================================================
   KOMPONEN PENSIL WARNA
========================================================= */

function ColorPencil({
  color,
  selected = false,
}: {
  color: string;
  selected?: boolean;
}) {
  return (
    <div
      className={`relative flex h-[58px] w-[34px] items-center justify-center transition-all duration-200 ${
        selected ? "-translate-y-1 scale-110" : "group-hover:-translate-y-1"
      }`}
    >
      {/* Ujung pensil */}
      <div
        className="absolute left-1/2 top-0 z-10 -translate-x-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: "9px solid transparent",
          borderRight: "9px solid transparent",
          borderBottom: `18px solid ${color}`,
        }}
      />

      {/* Kayu ujung pensil */}
      <div
        className="absolute top-[10px] left-1/2 z-20 -translate-x-1/2"
        style={{
          width: 8,
          height: 9,
          background:
            "linear-gradient(135deg, #f8e7c2 0%, #fff7df 50%, #d8bd8b 100%)",
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* Isi pensil */}
      <div
        className="absolute top-[8px] left-1/2 z-30 -translate-x-1/2 rounded-full"
        style={{
          width: 4,
          height: 10,
          backgroundColor:
            color === "#ffffff" ? "#94a3b8" : color,
        }}
      />

      {/* Badan pensil */}
      <div
        className="absolute top-[16px] h-[37px] w-[27px] overflow-hidden rounded-b-[6px] rounded-t-[2px] border border-black/10 shadow-md"
        style={{
          background: `linear-gradient(
            90deg,
            rgba(255,255,255,0.25) 0%,
            ${color} 22%,
            ${color} 78%,
            rgba(0,0,0,0.18) 100%
          )`,
        }}
      >
        {/* Garis pensil */}
        <div className="absolute left-[5px] top-0 h-full w-[3px] bg-white/25" />

        {/* Bagian bawah */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[6px]"
          style={{
            backgroundColor:
              color === "#ffffff"
                ? "#cbd5e1"
                : "rgba(0,0,0,0.15)",
          }}
        />
      </div>

      {/* Highlight */}
      <div className="absolute top-[19px] left-[9px] z-20 h-[28px] w-[3px] rounded-full bg-white/35" />
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Coloring() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [color, setColor] = useState(colors[0].value);
  const [size, setSize] = useState(18);
  const [drawing, setDrawing] = useState(false);

  const { completeModule } = useApp();

  const history = useRef<ImageData[]>([]);

  /* =========================================================
     PREPARE CANVAS
  ========================================================= */

  const prepareCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.setLineDash([]);

    /* Background */
    ctx.fillStyle = "#fffdf5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* Border */
    ctx.strokeStyle = "#f9a8d4";
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 8]);

    ctx.strokeRect(
      18,
      18,
      canvas.width - 36,
      canvas.height - 36,
    );

    ctx.setLineDash([]);
  };

  useEffect(() => {
    prepareCanvas();
  }, []);

  /* =========================================================
     GET POINTER POSITION
  ========================================================= */

  const point = (
    event: ReactPointerEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    return {
      x:
        (event.clientX - rect.left) *
        (canvas.width / rect.width),

      y:
        (event.clientY - rect.top) *
        (canvas.height / rect.height),
    };
  };

  /* =========================================================
     START DRAWING
  ========================================================= */

  const start = (
    event: ReactPointerEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const p = point(event);

    if (!ctx || !canvas || !p) return;

    /* Simpan kondisi sebelum menggambar */
    history.current.push(
      ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      ),
    );

    ctx.beginPath();

    ctx.moveTo(p.x, p.y);

    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    setDrawing(true);

    canvas.setPointerCapture(event.pointerId);
  };

  /* =========================================================
     DRAW
  ========================================================= */

  const draw = (
    event: ReactPointerEvent<HTMLCanvasElement>,
  ) => {
    if (!drawing) return;

    const ctx = canvasRef.current?.getContext("2d");

    const p = point(event);

    if (!ctx || !p) return;

    ctx.lineTo(p.x, p.y);

    ctx.stroke();
  };

  /* =========================================================
     STOP DRAWING
  ========================================================= */

  const stop = () => {
    setDrawing(false);
  };

  /* =========================================================
     CLEAR
  ========================================================= */

  const clear = () => {
    prepareCanvas();

    history.current = [];

    setDrawing(false);
  };

  /* =========================================================
     UNDO
  ========================================================= */

  const undo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const previous = history.current.pop();

    if (!ctx || !previous) return;

    ctx.putImageData(previous, 0, 0);
  };

  /* =========================================================
     SAVE
  ========================================================= */

  const save = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const link = document.createElement("a");

    link.download = "gambar-aku-pintar.png";

    link.href = canvas.toDataURL("image/png");

    link.click();

    completeModule("mewarnai", 20);
  };

  /* =========================================================
     SELECT COLOR
  ========================================================= */

  const selectColor = (value: string) => {
    setColor(value);
  };

  const selectedColorName =
    colors.find((item) => item.value === color)?.name ??
    "Merah";

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div
      data-testid="page-coloring"
      className="space-y-5"
    >
      {/* =====================================================
          PAGE INTRO
      ===================================================== */}

      <PageIntro
        emoji="🎨"
        title="Menggambar"
        description="Pilih pensil warna, gerakkan jari, dan buat karya yang cantik!"
        color="fuchsia"
      />

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        {/* ===================================================
            CANVAS SECTION
        =================================================== */}

        <section
          data-testid="coloring-canvas-section"
          className="overflow-hidden rounded-[32px] border-4 border-white bg-white/90 shadow-xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-sky-100 px-5 py-4 sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-2xl bg-white text-2xl shadow-sm">
                  🎨
                </div>

                <div>
                  <h2
                    data-testid="coloring-canvas-title"
                    className="font-heading text-xl font-black text-slate-800 sm:text-2xl"
                  >
                    Kanvas Ceriamu
                  </h2>

                  <p className="text-xs font-bold text-slate-500 sm:text-sm">
                    Yuk mulai menggambar!
                  </p>
                </div>
              </div>

              <div
                data-testid="coloring-mode-label"
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-pink-600 shadow-sm"
              >
                <Sparkles className="size-4" />

                Mode Mudah
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="p-3 sm:p-6">
            <div className="relative overflow-hidden rounded-[28px] border-4 border-pink-100 bg-gradient-to-br from-pink-50 via-yellow-50 to-sky-50 p-2 shadow-inner sm:p-3">
              {/* Decorations */}
              <div className="pointer-events-none absolute left-5 top-4 z-10 text-xl opacity-70">
                ✨
              </div>

              <div className="pointer-events-none absolute right-5 top-4 z-10 text-xl opacity-70">
                🌈
              </div>

              <div className="pointer-events-none absolute bottom-4 left-5 z-10 text-xl opacity-70">
                ⭐
              </div>

              <div className="pointer-events-none absolute bottom-4 right-5 z-10 text-xl opacity-70">
                🎨
              </div>

              <canvas
                ref={canvasRef}
                width={720}
                height={500}
                data-testid="coloring-canvas"
                onPointerDown={start}
                onPointerMove={draw}
                onPointerUp={stop}
                onPointerCancel={stop}
                onPointerLeave={stop}
                className="relative z-0 block h-auto w-full touch-none rounded-[22px] bg-[#fffdf5]"
              />
            </div>

            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Button
                type="button"
                data-testid="coloring-undo-button"
                variant="outline"
                onClick={undo}
                className="min-h-[54px] rounded-2xl border-2 border-slate-200 bg-white font-black text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:translate-y-1"
              >
                <RotateCcw className="size-5" />

                Undo
              </Button>

              <Button
                type="button"
                data-testid="coloring-clear-button"
                variant="outline"
                onClick={clear}
                className="min-h-[54px] rounded-2xl border-2 border-orange-200 bg-orange-50 font-black text-orange-700 shadow-sm transition-all hover:bg-orange-100 active:translate-y-1"
              >
                <Trash2 className="size-5" />

                Bersihkan
              </Button>

              <Button
                type="button"
                data-testid="coloring-reset-button"
                variant="outline"
                onClick={clear}
                className="min-h-[54px] rounded-2xl border-2 border-purple-200 bg-purple-50 font-black text-purple-700 shadow-sm transition-all hover:bg-purple-100 active:translate-y-1"
              >
                <Eraser className="size-5" />

                Reset
              </Button>

              <Button
                type="button"
                data-testid="coloring-save-button"
                onClick={save}
                className="min-h-[54px] rounded-2xl bg-pink-500 font-black text-white shadow-[0_5px_0_#DB2777] transition-all hover:bg-pink-600 active:translate-y-1 active:shadow-none"
              >
                <Download className="size-5" />

                Simpan
              </Button>
            </div>
          </div>
        </section>

        {/* ===================================================
            COLOR CONTROL
        =================================================== */}

        <aside
          data-testid="coloring-controls"
          className="rounded-[32px] border-4 border-white bg-white/90 p-5 shadow-xl sm:p-6"
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl bg-pink-100">
              <Palette className="size-6 text-pink-500" />
            </div>

            <div>
              <h2
                data-testid="coloring-palette-title"
                className="font-heading text-2xl font-black text-slate-800"
              >
                Pilih Warna
              </h2>

              <p className="text-xs font-bold text-slate-500">
                Pilih pensil favoritmu!
              </p>
            </div>
          </div>

          {/* =================================================
              PALETTE
          ================================================= */}

          <div
            data-testid="coloring-palette"
            className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4"
          >
            {colors.map((entry) => {
              const selected =
                color === entry.value;

              return (
                <button
                  type="button"
                  key={entry.name}
                  data-testid={`coloring-color-${entry.name
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  onClick={() =>
                    selectColor(entry.value)
                  }
                  className={`group relative flex min-h-[100px] flex-col items-center justify-center rounded-2xl border-4 transition-all duration-200 active:scale-90 ${
                    selected
                      ? "border-pink-400 bg-pink-50 shadow-[0_5px_0_#F472B6]"
                      : "border-slate-100 bg-white hover:-translate-y-1 hover:border-pink-200 hover:bg-pink-50 hover:shadow-md"
                  }`}
                  aria-label={entry.name}
                >
                  {/* Pensil */}
                  <ColorPencil
                    color={entry.value}
                    selected={selected}
                  />

                  {/* Nama */}
                  <span className="mt-1 text-[10px] font-black leading-tight text-slate-600 sm:text-[11px]">
                    {entry.name}
                  </span>

                  {/* Check */}
                  {selected && (
                    <span className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-pink-500 text-white shadow-md">
                      <Check className="size-4 stroke-[4]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* =================================================
              SELECTED COLOR
          ================================================= */}

          <div className="mt-5 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 p-4">
            <div className="flex items-center gap-4">
              {/* Pensil besar */}
              <div className="flex h-[75px] w-[55px] items-center justify-center rounded-2xl bg-white shadow-sm">
                <ColorPencil
                  color={color}
                  selected
                />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-500">
                  Pensil pilihanmu
                </p>

                <p className="font-heading text-lg font-black text-slate-800">
                  {selectedColorName}
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span
                    className="size-4 rounded-full border-2 border-white shadow"
                    style={{
                      backgroundColor: color,
                    }}
                  />

                  <span className="text-[10px] font-bold text-slate-400">
                    {color.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              BRUSH SIZE
          ================================================= */}

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <label
                data-testid="coloring-size-label"
                htmlFor="brush-size"
                className="flex items-center gap-2 font-black text-slate-700"
              >
                <Paintbrush className="size-5 text-pink-500" />

                Ukuran Kuas
              </label>

              <span
                data-testid="coloring-size-value"
                className="rounded-full bg-pink-100 px-3 py-1 text-xs font-black text-pink-700"
              >
                {size} px
              </span>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <input
                id="brush-size"
                data-testid="coloring-size-slider"
                type="range"
                min="6"
                max="40"
                value={size}
                onChange={(event) =>
                  setSize(Number(event.target.value))
                }
                className="w-full accent-pink-500"
              />

              <div className="mt-3 flex items-center justify-between text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="text-lg">•</span>

                  Kecil
                </span>

                <span className="flex items-center gap-1">
                  <span className="text-2xl">●</span>

                  Besar
                </span>
              </div>
            </div>

            {/* Brush Preview */}
            <div className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-dashed border-pink-200 bg-pink-50 p-4">
              <div
                className="flex shrink-0 items-center justify-center rounded-full border-2 border-white shadow"
                style={{
                  width: Math.min(size + 10, 50),
                  height: Math.min(size + 10, 50),
                  backgroundColor: color,
                }}
              />

              <div>
                <p className="text-xs font-bold text-slate-500">
                  Contoh ukuran kuas
                </p>

                <p className="font-black text-slate-700">
                  Siap menggambar! 🖌️
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              TIP
          ================================================= */}

          <div
            data-testid="coloring-tip"
            className="mt-6 rounded-2xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-4"
          >
            <div className="flex gap-3">
              <span className="text-2xl">
                💡
              </span>

              <div>
                <p className="font-black text-amber-800">
                  Tips Menggambar
                </p>

                <p className="mt-1 text-sm font-bold leading-relaxed text-amber-700">
                  Gunakan jari atau mouse untuk
                  menggambar. Tidak harus sempurna,
                  yang penting menyenangkan! 😊
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* =====================================================
          FOOTER MOTIVATION
      ===================================================== */}

      <div className="rounded-[28px] border-4 border-white bg-gradient-to-r from-pink-100 via-purple-100 to-sky-100 p-5 text-center shadow-lg">
        <div className="flex justify-center gap-2 text-2xl sm:text-3xl">
          <span>🖍️</span>
          <span>🎨</span>
          <span>⭐</span>
          <span>🌈</span>
          <span>🖍️</span>
        </div>

        <h3 className="mt-2 font-heading text-xl font-black text-slate-800">
          Kamu adalah seniman hebat! 🎉
        </h3>

        <p className="mt-1 text-sm font-bold text-slate-600">
          Terus berkreasi dan jangan takut mencoba
          warna baru.
        </p>
      </div>
    </div>
  );
}