import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Check,
  CircleHelp,
  Leaf,
  Sparkles,
  Volume2,
} from "lucide-react";

import PageIntro from "@/components/PageIntro";
import AudioButton from "@/components/AudioButton";
import { fruitItems, vehicleItems } from "@/data/learning";
import { useApp } from "@/lib/AppContext";

export default function Catalog({
  kind,
}: {
  kind: "buah" | "kendaraan";
}) {
  const items = kind === "buah" ? fruitItems : vehicleItems;

  const [selected, setSelected] = useState(0);
  const [category, setCategory] = useState("Semua");

  const { completeModule } = useApp();

  const isFruit = kind === "buah";

  const title = isFruit
    ? "Mengenal Buah"
    : "Mengenal Kendaraan";

  const description = isFruit
    ? "Ayo kenali berbagai buah yang warna-warni dan lezat!"
    : "Ayo kenali berbagai kendaraan yang bergerak di darat, air, dan udara!";

  /*
   * ========================================================
   * CATEGORY
   * ========================================================
   */

  const categories = isFruit
    ? ["Semua", "Buah Merah", "Buah Kuning", "Buah Hijau", "Buah Lainnya"]
    : ["Semua", "Darat", "Air", "Udara"];

  /*
   * ========================================================
   * FILTER
   * ========================================================
   */

  const visibleItems = useMemo(() => {
    if (category === "Semua") {
      return items;
    }

    if (isFruit) {
      const fruitCategory: Record<string, string[]> = {
        "Buah Merah": [
          "Apel",
          "Stroberi",
          "Semangka",
            "Ceri",
          "Delima",
          "Raspberry",
        ],

        "Buah Kuning": [
          "Pisang",
          "Nanas",
          "Mangga",
          "Lemon",
          "Melon",
        ],

        "Buah Hijau": [
          "Alpukat",
          "Kiwi",
          "Apel Hijau",
          "Jambu Biji",
          "Melon Hijau",
        ],

        "Buah Lainnya": [
          "Jeruk",
          "Anggur",
          "Pepaya",
          "Kelapa",
          "Durian",
          "Manggis",
          "Rambutan",
          "Salak",
          "Pir",
        ],
      };

      return items.filter((item) =>
        fruitCategory[category]?.includes(item.name),
      );
    }

    const vehicleCategory: Record<string, string[]> = {
      Darat: [
        "Mobil",
        "Bus",
        "Ambulans",
        "Pemadam Kebakaran",
        "Sepeda",
        "Motor",
        "Kereta Api",
        "Truk",
        "Taksi",
        "Bajaj",
        "Becak",
        "Traktor",
        "Sepeda Motor",
        "Mobil Polisi",
      ],

      Air: [
        "Kapal",
        "Kapal Pesiar",
        "Perahu",
        "Kapal Selam",
        "Speedboat",
        "Feri",
      ],

      Udara: [
        "Pesawat",
        "Helikopter",
        "Roket",
        "Balon Udara",
        "Pesawat Tempur",
      ],
    };

    return items.filter((item) =>
      vehicleCategory[category]?.includes(item.name),
    );
  }, [category, isFruit, items]);

  /*
   * ========================================================
   * SELECTED ITEM
   * ========================================================
   */

  const currentItem =
    visibleItems.find(
      (item) => item === items[selected],
    ) ?? visibleItems[0] ?? items[0];

  const currentIndex = currentItem
    ? items.indexOf(currentItem)
    : 0;

  /*
   * ========================================================
   * SELECT ITEM
   * ========================================================
   */

  const selectItem = (index: number) => {
    setSelected(index);
    completeModule(kind, 5);
  };

  /*
   * ========================================================
   * NEXT
   * ========================================================
   */

  const nextItem = () => {
    if (!currentItem) return;

    const currentVisibleIndex =
      visibleItems.findIndex(
        (item) => item.name === currentItem.name,
      );

    const nextIndex =
      currentVisibleIndex >= visibleItems.length - 1
        ? 0
        : currentVisibleIndex + 1;

    const next = visibleItems[nextIndex];

    if (!next) return;

    const globalIndex = items.indexOf(next);

    setSelected(globalIndex);

    completeModule(kind, 5);
  };

  /*
   * ========================================================
   * PREVIOUS
   * ========================================================
   */

  const previousItem = () => {
    if (!currentItem) return;

    const currentVisibleIndex =
      visibleItems.findIndex(
        (item) => item.name === currentItem.name,
      );

    const previousIndex =
      currentVisibleIndex <= 0
        ? visibleItems.length - 1
        : currentVisibleIndex - 1;

    const previous = visibleItems[previousIndex];

    if (!previous) return;

    const globalIndex = items.indexOf(previous);

    setSelected(globalIndex);

    completeModule(kind, 5);
  };

  /*
   * ========================================================
   * THEME
   * ========================================================
   */

  const theme = isFruit
    ? {
        main: "rose",
        button:
          "bg-rose-500 hover:bg-rose-600",
        light:
          "bg-rose-100 text-rose-700",
        border:
          "border-rose-300",
        shadow:
          "shadow-[0_5px_0_#FB7185]",
        gradient:
          "from-rose-100 via-orange-50 to-yellow-50",
        icon:
          "bg-rose-100 text-rose-500",
        accent:
          "text-rose-600",
      }
    : {
        main: "indigo",
        button:
          "bg-indigo-500 hover:bg-indigo-600",
        light:
          "bg-indigo-100 text-indigo-700",
        border:
          "border-indigo-300",
        shadow:
          "shadow-[0_5px_0_#818CF8]",
        gradient:
          "from-indigo-100 via-sky-50 to-cyan-50",
        icon:
          "bg-indigo-100 text-indigo-500",
        accent:
          "text-indigo-600",
      };

  /*
   * ========================================================
   * RETURN
   * ========================================================
   */

  return (
    <div
      data-testid={`page-${kind}`}
      className="space-y-5"
    >
      {/* ====================================================
          INTRO
      ==================================================== */}

      <PageIntro
        emoji={isFruit ? "🍎" : "🚗"}
        title={title}
        description={description}
        color={isFruit ? "rose" : "indigo"}
      />

      {/* ====================================================
          CATEGORY FILTER
      ==================================================== */}

      <section
        className={`rounded-[28px] border-4 border-white bg-white/85 p-4 shadow-lg sm:p-5`}
      >
        <div className="mb-3 flex items-center gap-3">
          <div
            className={`grid size-11 place-items-center rounded-2xl ${theme.icon}`}
          >
            {isFruit ? (
              <Leaf className="size-6" />
            ) : (
              <Car className="size-6" />
            )}
          </div>

          <div>
            <h2 className="font-heading text-xl font-black text-slate-800">
              Pilih Kategori
            </h2>

            <p className="text-xs font-bold text-slate-500">
              Pilih yang ingin kamu pelajari
            </p>
          </div>
        </div>

        <div
          data-testid={`${kind}-filters`}
          className="flex flex-wrap gap-2"
        >
          {categories.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item);

                  const first =
                    item === "Semua"
                      ? items[0]
                      : items.find((entry) =>
                          visibleItems.includes(entry),
                        );

                  if (first) {
                    setSelected(items.indexOf(first));
                  }
                }}
                className={`min-h-[46px] rounded-2xl px-4 text-sm font-black transition-all active:scale-95 ${
                  active
                    ? `${theme.button} text-white shadow-[0_4px_0_rgba(0,0,0,.15)]`
                    : "border-2 border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        {/* ==================================================
            CATALOG
        ================================================== */}

        <section
          data-testid={`${kind}-catalog`}
          className="rounded-[32px] border-4 border-white bg-white/70 p-3 shadow-xl sm:p-5"
        >
          {/* Catalog Header */}

          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-heading text-xl font-black text-slate-800">
                {isFruit
                  ? "Koleksi Buah 🍓"
                  : "Koleksi Kendaraan 🚙"}
              </h2>

              <p className="text-xs font-bold text-slate-500">
                {visibleItems.length} pilihan tersedia
              </p>
            </div>

            <div
              className={`rounded-full px-4 py-2 text-xs font-black ${theme.light}`}
            >
              {category}
            </div>
          </div>

          {/* Cards */}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {visibleItems.map((entry) => {
              const index = items.indexOf(entry);

              const isSelected =
                currentItem?.name === entry.name;

              const safeName = entry.name
                .toLowerCase()
                .replaceAll(" ", "-");

              return (
                <button
                  type="button"
                  key={entry.name}
                  data-testid={`${kind}-card-${index + 1}`}
                  onClick={() => selectItem(index)}
                  className={`group relative min-h-[175px] overflow-hidden rounded-[28px] border-4 p-3 text-center transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? `${theme.border} ${theme.light} ${theme.shadow} -translate-y-1`
                      : "border-white bg-white shadow-md hover:-translate-y-1 hover:shadow-xl"
                  }`}
                >
                  {/* Decoration */}

                  <div className="pointer-events-none absolute right-2 top-2 text-xs opacity-40">
                    ✨
                  </div>

                  {/* Image / Emoji */}

                  <div className="mx-auto flex h-[105px] items-center justify-center rounded-[22px] bg-gradient-to-br from-white to-slate-50">
                    <span
                      data-testid={`${kind}-emoji-${index + 1}`}
                      className="text-7xl leading-none transition-transform duration-300 group-hover:scale-110"
                    >
                      {entry.emoji}
                    </span>
                  </div>

                  {/* Name */}

                  <strong
                    data-testid={`${kind}-name-${index + 1}`}
                    className="mt-3 block font-heading text-sm font-black text-slate-800 sm:text-base"
                  >
                    {entry.name}
                  </strong>

                  {/* Selected */}

                  {isSelected && (
                    <span className="absolute left-2 top-2 grid size-7 place-items-center rounded-full bg-white shadow">
                      <Check
                        className={`size-4 ${theme.accent}`}
                        strokeWidth={4}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* ==================================================
            DETAIL
        ================================================== */}

        <section
          data-testid={`${kind}-detail-card`}
          className={`relative overflow-hidden rounded-[32px] border-4 border-white bg-gradient-to-br ${theme.gradient} p-5 text-center shadow-xl sm:p-7`}
        >
          {/* Decorations */}

          <div className="pointer-events-none absolute left-4 top-4 text-2xl opacity-50">
            ✨
          </div>

          <div className="pointer-events-none absolute right-4 top-4 text-2xl opacity-50">
            ⭐
          </div>

          <div className="pointer-events-none absolute bottom-5 left-5 text-xl opacity-40">
            🌈
          </div>

          <div className="pointer-events-none absolute bottom-5 right-5 text-xl opacity-40">
            🎉
          </div>

          {/* Label */}

          <div
            className={`relative mx-auto inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-black ${theme.accent}`}
          >
            {isFruit ? (
              <>
                <Leaf className="size-4" />
                BELAJAR BUAH
              </>
            ) : (
              <>
                <Car className="size-4" />
                BELAJAR KENDARAAN
              </>
            )}
          </div>

          {/* Emoji */}

          <div
            data-testid={`${kind}-detail-emoji`}
            className="relative mx-auto mt-5 flex h-[210px] items-center justify-center rounded-[32px] bg-white/65 shadow-inner"
          >
            <span className="animate-float text-[125px] leading-none sm:text-[145px]">
              {currentItem?.emoji}
            </span>
          </div>

          {/* Name */}

          <h2
            data-testid={`${kind}-detail-name`}
            className="relative mt-5 font-heading text-3xl font-black text-slate-800 sm:text-4xl"
          >
            {currentItem?.name}
          </h2>

          {/* Description */}

          <p
            data-testid={`${kind}-detail-description`}
            className="relative mt-4 rounded-2xl bg-white/80 p-4 text-sm font-bold leading-relaxed text-slate-600 sm:text-base"
          >
            <span className="font-black text-slate-800">
              Ini adalah {currentItem?.name.toLowerCase()}.
            </span>{" "}
            {currentItem?.description}
          </p>

          {/* Audio */}

          <div className="relative mt-5">
            <AudioButton
              text={`Ini adalah ${currentItem?.name}. ${currentItem?.description}`}
              label="🔊 Dengarkan"
            />
          </div>

          {/* Navigation */}

          <div className="relative mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={previousItem}
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-white font-black text-slate-700 shadow-[0_4px_0_rgba(0,0,0,.12)] transition-all hover:bg-slate-50 active:translate-y-1 active:shadow-none"
            >
              <ArrowLeft className="size-5" />
              Sebelumnya
            </button>

            <button
              type="button"
              onClick={nextItem}
              className={`flex min-h-[52px] items-center justify-center gap-2 rounded-2xl ${theme.button} font-black text-white shadow-[0_4px_0_rgba(0,0,0,.15)] transition-all active:translate-y-1 active:shadow-none`}
            >
              Berikutnya
              <ArrowRight className="size-5" />
            </button>
          </div>

          {/* Complete */}

          <button
            type="button"
            data-testid={`${kind}-complete-button`}
            onClick={() => completeModule(kind, 10)}
            className={`relative mt-3 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl ${theme.button} px-5 font-black text-white shadow-[0_5px_0_rgba(0,0,0,.15)] transition-all active:translate-y-1 active:shadow-none`}
          >
            <Sparkles className="size-5" />

            Aku Tahu!

            <span>⭐</span>
          </button>

          {/* Counter */}

          <div className="relative mt-4 text-xs font-bold text-slate-500">
            {currentIndex + 1} dari {items.length}
          </div>
        </section>
      </div>

      {/* ====================================================
          BOTTOM TIP
      ==================================================== */}

      <div
        className={`rounded-[28px] border-4 border-white bg-gradient-to-r ${
          isFruit
            ? "from-rose-100 via-orange-100 to-yellow-100"
            : "from-indigo-100 via-sky-100 to-cyan-100"
        } p-5 text-center shadow-lg`}
      >
        <div className="flex justify-center gap-3 text-3xl">
          {isFruit ? (
            <>
              <span>🍎</span>
              <span>🍌</span>
              <span>🍓</span>
              <span>🍉</span>
              <span>🍍</span>
            </>
          ) : (
            <>
              <span>🚗</span>
              <span>🚌</span>
              <span>✈️</span>
              <span>🚢</span>
              <span>🚁</span>
            </>
          )}
        </div>

        <h3 className="mt-3 font-heading text-xl font-black text-slate-800">
          {isFruit
            ? "Buah itu menyenangkan! 🍓"
            : "Ayo mengenal kendaraan! 🚗"}
        </h3>

        <p className="mt-1 text-sm font-bold text-slate-600">
          {isFruit
            ? "Kenali nama, bentuk, dan warna buah satu per satu."
            : "Setiap kendaraan punya bentuk dan kegunaan yang berbeda."}
        </p>
      </div>
    </div>
  );
}