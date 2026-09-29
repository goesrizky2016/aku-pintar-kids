import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Heart,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import PageIntro from "@/components/PageIntro";
import AudioButton from "@/components/AudioButton";
import { animalItems } from "@/data/learning";
import { useApp } from "@/lib/AppContext";

/* =========================================================
   HABITAT STYLE
========================================================= */

const habitatStyles: Record<string, string> = {
  Semua:
    "bg-slate-800 text-white shadow-[0_5px_0_#334155]",

  Darat:
    "bg-emerald-500 text-white shadow-[0_5px_0_#059669]",

  Air:
    "bg-sky-500 text-white shadow-[0_5px_0_#0284C7]",

  Udara:
    "bg-violet-500 text-white shadow-[0_5px_0_#7C3AED]",
};

/* =========================================================
   HABITAT ICON
========================================================= */

const habitatIcons: Record<string, string> = {
  Semua: "🌈",
  Darat: "🌿",
  Air: "🌊",
  Udara: "☁️",
};

/* =========================================================
   HABITAT COLOR
========================================================= */

const habitatColors: Record<string, string> = {
  Darat:
    "bg-emerald-100 text-emerald-700",

  Air:
    "bg-sky-100 text-sky-700",

  Udara:
    "bg-violet-100 text-violet-700",
};

/* =========================================================
   ANIMAL CARD COLORS
========================================================= */

const animalColors = [
  "from-amber-100 to-orange-50",
  "from-pink-100 to-rose-50",
  "from-sky-100 to-cyan-50",
  "from-emerald-100 to-lime-50",
  "from-violet-100 to-purple-50",
  "from-yellow-100 to-amber-50",
];

/* =========================================================
   PAGE
========================================================= */

export default function Animals() {
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState("Semua");

  const [favorite, setFavorite] =
    useState<string[]>([]);

  const [completed, setCompleted] =
    useState<string[]>([]);

  const { completeModule } = useApp();

  /* =======================================================
     FILTER HEWAN
  ======================================================= */

  const visible = useMemo(() => {
    return animalItems.filter(
      (animal) =>
        filter === "Semua" ||
        animal.habitat === filter,
    );
  }, [filter]);

  /* =======================================================
     PASTIKAN HEWAN YANG DIPILIH ADA DI FILTER
  ======================================================= */

  useEffect(() => {
    const selectedAnimal =
      animalItems[selected];

    if (!selectedAnimal) {
      setSelected(0);
      return;
    }

    const stillVisible =
      filter === "Semua" ||
      selectedAnimal.habitat === filter;

    if (!stillVisible && visible.length > 0) {
      setSelected(
        animalItems.indexOf(visible[0]),
      );
    }
  }, [filter, selected, visible]);

  /* =======================================================
     CURRENT ITEM
  ======================================================= */

  const item =
    animalItems[selected] ??
    visible[0] ??
    animalItems[0];

  const itemIndex =
    animalItems.indexOf(item);

  const animalKey = item.name
    .toLowerCase()
    .replaceAll(" ", "-");

  /* =======================================================
     FAVORITE
  ======================================================= */

  const toggleFavorite = () => {
    setFavorite((current) =>
      current.includes(item.name)
        ? current.filter(
            (name) => name !== item.name,
          )
        : [...current, item.name],
    );
  };

  /* =======================================================
     COMPLETE
  ======================================================= */

  const markComplete = () => {
    if (!completed.includes(item.name)) {
      setCompleted((current) => [
        ...current,
        item.name,
      ]);

      completeModule("hewan", 10);
    }
  };

  /* =======================================================
     NEXT
  ======================================================= */

  const selectNextAnimal = () => {
    if (visible.length === 0) {
      return;
    }

    const currentVisibleIndex =
      visible.findIndex(
        (animal) =>
          animalItems.indexOf(animal) ===
          itemIndex,
      );

    const nextIndex =
      currentVisibleIndex >= 0
        ? (currentVisibleIndex + 1) %
          visible.length
        : 0;

    setSelected(
      animalItems.indexOf(
        visible[nextIndex],
      ),
    );
  };

  /* =======================================================
     PREVIOUS
  ======================================================= */

  const selectPreviousAnimal = () => {
    if (visible.length === 0) {
      return;
    }

    const currentVisibleIndex =
      visible.findIndex(
        (animal) =>
          animalItems.indexOf(animal) ===
          itemIndex,
      );

    const previousIndex =
      currentVisibleIndex > 0
        ? currentVisibleIndex - 1
        : visible.length - 1;

    setSelected(
      animalItems.indexOf(
        visible[previousIndex],
      ),
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div data-testid="page-animals">

      {/* ===================================================
          HEADER
      =================================================== */}

      <PageIntro
        emoji="🐶"
        title="Mengenal Hewan"
        description="Temui teman-teman hewan yang lucu dan ramah!"
        color="emerald"
      />

      {/* ===================================================
          FILTER HABITAT
      =================================================== */}

      <section
        data-testid="animals-filter-section"
        className="mb-5 rounded-[28px] border-4 border-white bg-white/70 p-4 shadow-lg sm:p-5"
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="text-2xl">
            🗺️
          </span>

          <div>
            <h2 className="font-heading text-lg font-black text-slate-800">
              Pilih tempat tinggal hewan
            </h2>

            <p className="text-xs font-bold text-slate-500">
              Hewan ini biasanya tinggal di mana?
            </p>
          </div>
        </div>

        <div
          className="flex flex-wrap gap-2"
          data-testid="animals-filters"
        >
          {[
            "Semua",
            "Darat",
            "Air",
            "Udara",
          ].map((value) => (
            <button
              type="button"
              key={value}
              data-testid={`animals-filter-${value.toLowerCase()}`}
              onClick={() => setFilter(value)}
              className={`
                min-h-[48px]
                rounded-2xl
                px-5
                font-black
                transition-all
                active:translate-y-1
                active:shadow-none

                ${
                  filter === value
                    ? habitatStyles[value]
                    : "border-2 border-white bg-white text-slate-600 shadow-sm hover:-translate-y-1 hover:bg-slate-50"
                }
              `}
            >
              {habitatIcons[value]}{" "}
              {value}
            </button>
          ))}
        </div>
      </section>

      {/* ===================================================
          MAIN CONTENT

          MOBILE:
          DETAIL DI ATAS
          LIST DI BAWAH

          DESKTOP:
          LIST KIRI
          DETAIL KANAN
      =================================================== */}

      <div className="grid gap-5 lg:grid-cols-[1fr_.9fr]">

        {/* =================================================
            DETAIL HEWAN

            order-1 = selalu muncul lebih dahulu di HP

            lg:order-2 = di desktop pindah ke kanan
        ================================================== */}

        <section
          data-testid="animal-detail-card"
          className="
            relative
            order-1
            overflow-hidden
            rounded-[32px]
            border-4
            border-white
            bg-gradient-to-br
            from-emerald-100
            via-lime-50
            to-yellow-50
            p-5
            text-center
            shadow-xl
            sm:p-8
            lg:order-2
          "
        >

          {/* ===============================================
              DEKORASI
          ================================================ */}

          <div className="absolute left-4 top-4 animate-bob text-3xl">
            🌿
          </div>

          <div className="absolute right-5 top-6 animate-float text-3xl">
            ☁️
          </div>

          <div className="absolute bottom-5 left-5 text-2xl">
            🌼
          </div>

          <div className="absolute bottom-5 right-5 text-2xl">
            🍃
          </div>

          {/* ===============================================
              LABEL
          ================================================ */}

          <div className="relative">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-4 py-2 text-xs font-black text-emerald-700 shadow-sm">
              <Sparkles className="size-4" />
              Kenalan yuk!
            </span>
          </div>

          {/* ===============================================
              ANIMAL EMOJI
          ================================================ */}

          <div
            data-testid="animal-detail-emoji"
            className="
              relative
              mt-4
              animate-float
              text-[90px]
              leading-none
              drop-shadow-md
              sm:text-[110px]
            "
          >
            {item.emoji}
          </div>

          {/* ===============================================
              NAME
          ================================================ */}

          <h2
            data-testid="animal-detail-name"
            className="
              mt-4
              font-heading
              text-3xl
              font-black
              text-emerald-900
              sm:text-4xl
            "
          >
            {item.name}
          </h2>

          {/* ===============================================
              HABITAT
          ================================================ */}

          <div
            className={`
              mx-auto
              mt-3
              inline-flex
              rounded-full
              px-4
              py-2
              text-sm
              font-black

              ${
                habitatColors[item.habitat] ??
                "bg-slate-100 text-slate-600"
              }
            `}
          >
            {habitatIcons[item.habitat]}{" "}
            Tinggal di {item.habitat}
          </div>

          {/* ===============================================
              FAKTA / PENJELASAN
          ================================================ */}

          <div className="mt-5 rounded-3xl bg-white/80 p-4 shadow-sm sm:p-5">
            <p className="mb-2 text-sm font-black uppercase tracking-wider text-emerald-600">
              💡 Tahukah kamu?
            </p>

            <p
              data-testid="animal-detail-fact"
              className="
                mx-auto
                max-w-sm
                text-sm
                font-bold
                leading-relaxed
                text-slate-600
                sm:text-base
              "
            >
              {item.fact}
            </p>
          </div>

          {/* ===============================================
              SUARA
          ================================================ */}

          <div className="mt-4 rounded-2xl bg-emerald-100/70 p-4">
            <p
              data-testid="animal-detail-sound"
              className="font-heading text-base font-black text-emerald-700 sm:text-lg"
            >
              🔊 Suara: {item.sound}
            </p>
          </div>

          {/* ===============================================
              AUDIO + FAVORITE + COMPLETE
          ================================================ */}

          <div className="mt-5 flex flex-wrap justify-center gap-3">

            <AudioButton
              text={`${item.name}. ${item.fact}. Suaranya ${item.sound}`}
              label="🔊 Dengarkan"
            />

            <button
              type="button"
              onClick={toggleFavorite}
              className={`
                min-h-[54px]
                rounded-2xl
                px-5
                font-black
                transition-all
                active:translate-y-1

                ${
                  favorite.includes(item.name)
                    ? "bg-pink-500 text-white shadow-[0_5px_0_#DB2777]"
                    : "bg-white text-pink-600 shadow-md hover:bg-pink-50"
                }
              `}
            >
              <Heart
                className={`
                  mr-1
                  inline
                  size-5

                  ${
                    favorite.includes(item.name)
                      ? "fill-current"
                      : ""
                  }
                `}
              />

              {favorite.includes(item.name)
                ? "Favorit ❤️"
                : "Suka ❤️"}
            </button>

            <button
              type="button"
              data-testid="animal-complete-button"
              onClick={markComplete}
              className={`
                min-h-[54px]
                rounded-2xl
                px-5
                font-black
                transition-all
                active:translate-y-1

                ${
                  completed.includes(item.name)
                    ? "bg-emerald-600 text-white shadow-[0_5px_0_#047857]"
                    : "bg-emerald-500 text-white shadow-[0_5px_0_#059669] hover:bg-emerald-600"
                }
              `}
            >
              {completed.includes(item.name) ? (
                <>
                  <CheckCircle2 className="mr-1 inline size-5" />
                  Sudah tahu!
                </>
              ) : (
                <>⭐ Aku tahu!</>
              )}
            </button>
          </div>

          {/* ===============================================
              NEXT / PREVIOUS

              DIPINDAHKAN KE DETAIL AGAR DI HP MUDAH
              DIAKSES TANPA SCROLL KE DAFTAR HEWAN
          ================================================ */}

          <div className="mt-6 grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={selectPreviousAnimal}
              aria-label="Hewan sebelumnya"
              className="
                flex
                min-h-[52px]
                items-center
                justify-center
                gap-1
                rounded-2xl
                bg-slate-700
                px-3
                font-black
                text-white
                shadow-[0_5px_0_#334155]
                transition-all
                hover:bg-slate-800
                active:translate-y-1
                active:shadow-none
              "
            >
              <ChevronLeft className="size-5" />
              <span>Sebelumnya</span>
            </button>

            <button
              type="button"
              onClick={selectNextAnimal}
              aria-label="Hewan berikutnya"
              className="
                flex
                min-h-[52px]
                items-center
                justify-center
                gap-1
                rounded-2xl
                bg-emerald-500
                px-3
                font-black
                text-white
                shadow-[0_5px_0_#059669]
                transition-all
                hover:bg-emerald-600
                active:translate-y-1
                active:shadow-none
              "
            >
              <span>Berikutnya</span>
              <ChevronRight className="size-5" />
            </button>

          </div>

          {/* ===============================================
              INDICATOR
          ================================================ */}

          <p className="mt-3 text-xs font-bold text-slate-500">
            Hewan{" "}
            {visible.findIndex(
              (animal) =>
                animalItems.indexOf(animal) ===
                itemIndex,
            ) + 1}{" "}
            dari {visible.length}
          </p>
        </section>

        {/* =================================================
            DAFTAR HEWAN

            MOBILE:
            muncul setelah detail

            DESKTOP:
            tetap di kiri
        ================================================== */}

        <section
          data-testid="animals-catalog"
          className="
            order-2
            rounded-[32px]
            border-4
            border-white
            bg-white/65
            p-4
            shadow-xl
            sm:p-5
            lg:order-1
          "
        >

          {/* ===============================================
              HEADER LIST
          ================================================ */}

          <div className="mb-4 flex items-center justify-between gap-3">

            <div>
              <h2 className="font-heading text-2xl font-black text-slate-800">
                🐾 Teman Hewan
              </h2>

              <p className="text-sm font-bold text-slate-500">
                Ada {visible.length} hewan di sini
              </p>
            </div>

            <div className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-black text-emerald-700">
              {completed.length} dipelajari
            </div>

          </div>

          {/* ===============================================
              ANIMAL GRID
          ================================================ */}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

            {visible.map((animal, index) => {
              const animalIndex =
                animalItems.indexOf(animal);

              const key = animal.name
                .toLowerCase()
                .replaceAll(" ", "-");

              const isSelected =
                selected === animalIndex;

              const isCompleted =
                completed.includes(
                  animal.name,
                );

              const isFavorite =
                favorite.includes(
                  animal.name,
                );

              return (
                <button
                  type="button"
                  key={animal.name}
                  data-testid={`animal-card-${key}`}
                  onClick={() => {
                    setSelected(animalIndex);
                    completeModule("hewan", 5);
                  }}
                  className={`
                    relative
                    min-h-[150px]
                    overflow-hidden
                    rounded-[28px]
                    border-4
                    p-3
                    text-center
                    shadow-md
                    transition-all
                    hover:-translate-y-1
                    active:scale-95
                    sm:min-h-[165px]
                    sm:p-4

                    ${
                      isSelected
                        ? "border-emerald-400 bg-emerald-100 shadow-[0_5px_0_#34D399]"
                        : "border-white bg-white hover:border-emerald-200"
                    }
                  `}
                >

                  {/* BINTANG */}

                  <span className="absolute right-2 top-2 text-sm">
                    {isCompleted
                      ? "✅"
                      : isFavorite
                        ? "❤️"
                        : "✨"}
                  </span>

                  {/* NOMOR */}

                  <span className="absolute left-3 top-3 rounded-full bg-white/70 px-2 py-1 text-[10px] font-black text-slate-500">
                    {index + 1}
                  </span>

                  {/* EMOJI */}

                  <span
                    data-testid={`animal-emoji-${key}`}
                    className={`
                      mx-auto
                      flex
                      size-20
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-br
                      text-5xl
                      sm:size-24
                      sm:text-6xl
                      ${animalColors[index % animalColors.length]}
                    `}
                  >
                    {animal.emoji}
                  </span>

                  {/* NAME */}

                  <strong
                    data-testid={`animal-name-${key}`}
                    className="mt-2 block font-heading text-base font-black text-slate-800 sm:text-lg"
                  >
                    {animal.name}
                  </strong>

                  {/* HABITAT */}

                  <small
                    data-testid={`animal-habitat-${key}`}
                    className={`
                      mt-1
                      inline-block
                      rounded-full
                      px-2
                      py-1
                      text-[10px]
                      font-black

                      ${
                        habitatColors[
                          animal.habitat
                        ] ??
                        "bg-slate-100 text-slate-600"
                      }
                    `}
                  >
                    {habitatIcons[
                      animal.habitat
                    ]}{" "}
                    {animal.habitat}
                  </small>

                </button>
              );
            })}

          </div>

        </section>
      </div>

      {/* ===================================================
          KALIMAT PENUTUP
      =================================================== */}

      <div className="mt-5 rounded-[28px] border-4 border-white bg-gradient-to-r from-yellow-100 via-pink-100 to-sky-100 p-5 text-center shadow-lg">

        <div className="text-3xl">
          🐶 🐱 🐰 🐼 🐯
        </div>

        <p className="mt-2 font-heading text-lg font-black text-slate-700">
          Hewan adalah teman kita! 💕
        </p>

        <p className="mt-1 text-sm font-bold text-slate-500">
          Yuk sayangi dan jaga hewan di sekitar kita.
        </p>

      </div>

    </div>
  );
}