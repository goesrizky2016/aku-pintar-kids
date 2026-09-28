export interface AlphabetItem {
  letter: string;
  word: string;
  emoji: string;
}

export interface NumberItem {
  value: number;
  name: string;
  emoji: string;
}

export interface AnimalItem {
  name: string;
  emoji: string;
  habitat: "Darat" | "Air" | "Udara";
  fact: string;
  sound: string;
}

export interface SimpleLearningItem {
  name: string;
  emoji: string;
  description: string;
}

/* =========================================================
   DATA HURUF A-Z
========================================================= */

export const alphabetItems: AlphabetItem[] = [
  ["A", "Apel", "🍎"],
  ["B", "Bola", "⚽"],
  ["C", "Cicak", "🦎"],
  ["D", "Domba", "🐑"],
  ["E", "Elang", "🦅"],
  ["F", "Foto", "📸"],
  ["G", "Gajah", "🐘"],
  ["H", "Harimau", "🐯"],
  ["I", "Ikan", "🐟"],
  ["J", "Jeruk", "🍊"],
  ["K", "Kucing", "🐱"],
  ["L", "Lumba-lumba", "🐬"],
  ["M", "Monyet", "🐵"],
  ["N", "Nanas", "🍍"],
  ["O", "Obor", "🔦"],
  ["P", "Pisang", "🍌"],
  ["Q", "Qari", "📖"],
  ["R", "Rumah", "🏠"],
  ["S", "Sapi", "🐄"],
  ["T", "Topi", "🧢"],
  ["U", "Ular", "🐍"],
  ["V", "Voli", "🏐"],
  ["W", "Wortel", "🥕"],
  ["X", "Xilofon", "🎼"],
  ["Y", "Yoyo", "🪀"],
  ["Z", "Zebra", "🦓"],
].map(([letter, word, emoji]) => ({
  letter,
  word,
  emoji,
}));

/* =========================================================
   DATA ANGKA 1-10
========================================================= */

/* =========================================================
   DATA ANGKA 1-10
========================================================= */

export const numberItems: NumberItem[] = [
  {
    value: 1,
    name: "Satu",
    emoji: "🍎",
  },
  {
    value: 2,
    name: "Dua",
    emoji: "🍎",
  },
  {
    value: 3,
    name: "Tiga",
    emoji: "🍎",
  },
  {
    value: 4,
    name: "Empat",
    emoji: "🍎",
  },
  {
    value: 5,
    name: "Lima",
    emoji: "🍎",
  },
  {
    value: 6,
    name: "Enam",
    emoji: "🍎",
  },
  {
    value: 7,
    name: "Tujuh",
    emoji: "🍎",
  },
  {
    value: 8,
    name: "Delapan",
    emoji: "🍎",
  },
  {
    value: 9,
    name: "Sembilan",
    emoji: "🍎",
  },
  {
    value: 10,
    name: "Sepuluh",
    emoji: "🍎",
  },
];

/* =========================================================
   DATA HEWAN
   TOTAL: 50 HEWAN
========================================================= */

export const animalItems: AnimalItem[] = [
  /* =======================================================
     HEWAN DARAT
  ======================================================= */

  {
    name: "Anjing",
    emoji: "🐶",
    habitat: "Darat",
    fact: "Anjing sering menjadi teman baik manusia dan suka bermain.",
    sound: "Guk guk!",
  },
  {
    name: "Kucing",
    emoji: "🐱",
    habitat: "Darat",
    fact: "Kucing suka bermain, tidur, dan mengeong.",
    sound: "Meong!",
  },
  {
    name: "Gajah",
    emoji: "🐘",
    habitat: "Darat",
    fact: "Gajah memiliki belalai yang panjang dan tubuh yang besar.",
    sound: "Praaak!",
  },
  {
    name: "Singa",
    emoji: "🦁",
    habitat: "Darat",
    fact: "Singa adalah hewan besar yang hidup berkelompok.",
    sound: "Aum!",
  },
  {
    name: "Kelinci",
    emoji: "🐰",
    habitat: "Darat",
    fact: "Kelinci memiliki telinga panjang dan suka melompat.",
    sound: "Hop hop!",
  },
  {
    name: "Zebra",
    emoji: "🦓",
    habitat: "Darat",
    fact: "Zebra memiliki pola garis hitam dan putih pada tubuhnya.",
    sound: "Meringkik!",
  },
  {
    name: "Harimau",
    emoji: "🐯",
    habitat: "Darat",
    fact: "Harimau memiliki garis-garis pada tubuhnya dan merupakan kucing besar.",
    sound: "Grrr!",
  },
  {
    name: "Jerapah",
    emoji: "🦒",
    habitat: "Darat",
    fact: "Jerapah memiliki leher yang sangat panjang.",
    sound: "Hummm!",
  },
  {
    name: "Monyet",
    emoji: "🐵",
    habitat: "Darat",
    fact: "Monyet suka memanjat pohon dan bergerak dengan lincah.",
    sound: "Uh uh ah ah!",
  },
  {
    name: "Gorila",
    emoji: "🦍",
    habitat: "Darat",
    fact: "Gorila adalah primata besar yang kuat.",
    sound: "Uuuh uuh!",
  },
  {
    name: "Beruang",
    emoji: "🐻",
    habitat: "Darat",
    fact: "Beruang memiliki tubuh besar dan bulu yang tebal.",
    sound: "Grrr!",
  },
  {
    name: "Panda",
    emoji: "🐼",
    habitat: "Darat",
    fact: "Panda suka makan bambu dan memiliki warna hitam putih.",
    sound: "Humm!",
  },
  {
    name: "Rubah",
    emoji: "🦊",
    habitat: "Darat",
    fact: "Rubah memiliki ekor yang lebat dan telinga yang runcing.",
    sound: "Ring ring!",
  },
  {
    name: "Rusa",
    emoji: "🦌",
    habitat: "Darat",
    fact: "Rusa memiliki kaki yang panjang dan dapat berlari cepat.",
    sound: "Mbee!",
  },
  {
    name: "Kuda",
    emoji: "🐴",
    habitat: "Darat",
    fact: "Kuda dapat berlari dengan cepat dan memiliki surai.",
    sound: "Hiii hiiii!",
  },
  {
    name: "Sapi",
    emoji: "🐄",
    habitat: "Darat",
    fact: "Sapi merupakan hewan yang banyak dipelihara di peternakan.",
    sound: "Mooo!",
  },
  {
    name: "Kambing",
    emoji: "🐐",
    habitat: "Darat",
    fact: "Kambing suka memakan rumput dan memiliki tanduk.",
    sound: "Mbeeek!",
  },
  {
    name: "Domba",
    emoji: "🐑",
    habitat: "Darat",
    fact: "Domba memiliki bulu yang tebal dan lembut.",
    sound: "Mbeeek!",
  },
  {
    name: "Babi",
    emoji: "🐷",
    habitat: "Darat",
    fact: "Babi memiliki hidung yang disebut moncong.",
    sound: "Oink oink!",
  },
  {
    name: "Ayam",
    emoji: "🐔",
    habitat: "Darat",
    fact: "Ayam memiliki dua kaki dan ayam jantan biasanya berkokok.",
    sound: "Kukuruyuk!",
  },
  {
    name: "Bebek",
    emoji: "🦆",
    habitat: "Darat",
    fact: "Bebek memiliki kaki berselaput dan pandai berenang.",
    sound: "Kwek kwek!",
  },
  {
    name: "Koala",
    emoji: "🐨",
    habitat: "Darat",
    fact: "Koala suka tinggal di pohon dan memakan daun.",
    sound: "Grunt!",
  },
  {
    name: "Kanguru",
    emoji: "🦘",
    habitat: "Darat",
    fact: "Kanguru bergerak dengan cara melompat menggunakan kaki yang kuat.",
    sound: "Grunt grunt!",
  },
  {
    name: "Badak",
    emoji: "🦏",
    habitat: "Darat",
    fact: "Badak memiliki tubuh besar dan tanduk di bagian hidung.",
    sound: "Mendengus!",
  },
  {
    name: "Kuda Nil",
    emoji: "🦛",
    habitat: "Darat",
    fact: "Kuda nil memiliki tubuh besar dan sering berada di dalam air.",
    sound: "Honk honk!",
  },

  /* =======================================================
     HEWAN AIR
  ======================================================= */

  {
    name: "Ikan",
    emoji: "🐟",
    habitat: "Air",
    fact: "Ikan hidup dan berenang di dalam air.",
    sound: "Blub blub!",
  },
  {
    name: "Ikan Tropis",
    emoji: "🐠",
    habitat: "Air",
    fact: "Ikan tropis memiliki warna tubuh yang indah.",
    sound: "Blub blub!",
  },
  {
    name: "Lumba-lumba",
    emoji: "🐬",
    habitat: "Air",
    fact: "Lumba-lumba adalah hewan laut yang pandai berenang dan melompat.",
    sound: "Klik klik!",
  },
  {
    name: "Paus",
    emoji: "🐋",
    habitat: "Air",
    fact: "Paus adalah salah satu hewan terbesar yang hidup di laut.",
    sound: "Whooosh!",
  },
  {
    name: "Hiu",
    emoji: "🦈",
    habitat: "Air",
    fact: "Hiu adalah ikan besar yang hidup di laut.",
    sound: "Menyelam!",
  },
  {
    name: "Gurita",
    emoji: "🐙",
    habitat: "Air",
    fact: "Gurita memiliki delapan lengan dan hidup di laut.",
    sound: "Blub blub!",
  },
  {
    name: "Kepiting",
    emoji: "🦀",
    habitat: "Air",
    fact: "Kepiting memiliki capit dan berjalan menyamping.",
    sound: "Krek krek!",
  },
  {
    name: "Udang",
    emoji: "🦐",
    habitat: "Air",
    fact: "Udang memiliki tubuh kecil dan hidup di air.",
    sound: "Blub blub!",
  },
  
  {
    name: "Penyu",
    emoji: "🐢",
    habitat: "Air",
    fact: "Penyu memiliki tempurung dan dapat berenang di laut.",
    sound: "Huuu!",
  },
  {
    name: "Buaya",
    emoji: "🐊",
    habitat: "Air",
    fact: "Buaya adalah reptil yang sering hidup di sungai dan rawa.",
    sound: "Grrr!",
  },
  {
    name: "Katak",
    emoji: "🐸",
    habitat: "Air",
    fact: "Katak dapat hidup di darat dan di sekitar air.",
    sound: "Krok krok!",
  },

  /* =======================================================
     HEWAN UDARA
  ======================================================= */

  {
    name: "Burung",
    emoji: "🐦",
    habitat: "Udara",
    fact: "Burung memiliki sayap dan banyak jenis burung dapat terbang.",
    sound: "Cuit cuit!",
  },
  {
    name: "Elang",
    emoji: "🦅",
    habitat: "Udara",
    fact: "Elang memiliki penglihatan yang tajam dan dapat terbang tinggi.",
    sound: "Kiiiik!",
  },
  {
    name: "Burung Hantu",
    emoji: "🦉",
    habitat: "Udara",
    fact: "Burung hantu memiliki mata besar dan banyak yang aktif pada malam hari.",
    sound: "Huu huu!",
  },
  {
    name: "Beo",
    emoji: "🦜",
    habitat: "Udara",
    fact: "Burung beo memiliki paruh kuat dan dapat menirukan beberapa suara.",
    sound: "Cuit cuit!",
  },
  {
    name: "Merak",
    emoji: "🦚",
    habitat: "Udara",
    fact: "Merak jantan memiliki ekor indah yang dapat dikembangkan.",
    sound: "Kiiik!",
  },
  {
    name: "Flamingo",
    emoji: "🦩",
    habitat: "Udara",
    fact: "Flamingo memiliki kaki panjang dan bulu berwarna merah muda.",
    sound: "Krak krak!",
  },
  {
    name: "Angsa",
    emoji: "🦢",
    habitat: "Udara",
    fact: "Angsa memiliki leher panjang dan dapat berenang.",
    sound: "Kwek kwek!",
  },
  {
    name: "Kupu-kupu",
    emoji: "🦋",
    habitat: "Udara",
    fact: "Kupu-kupu memiliki sayap indah dan sering hinggap di bunga.",
    sound: "Kepak kepak!",
  },
  {
    name: "Lebah",
    emoji: "🐝",
    habitat: "Udara",
    fact: "Lebah membantu bunga melakukan penyerbukan dan menghasilkan madu.",
    sound: "Bzzzz!",
  },
  {
    name: "Kepik",
    emoji: "🐞",
    habitat: "Udara",
    fact: "Kepik memiliki tubuh kecil dan sering berwarna merah dengan bintik hitam.",
    sound: "Bzzzz!",
  },
];

/* =========================================================
   DATA BUAH
   TOTAL: 25 BUAH
========================================================= */

export const fruitItems: SimpleLearningItem[] = [
  {
    name: "Apel",
    emoji: "🍎",
    description: "Apel biasanya berwarna merah atau hijau dan rasanya segar.",
  },
  {
    name: "Pisang",
    emoji: "🍌",
    description: "Pisang berwarna kuning dan rasanya manis.",
  },
  {
    name: "Jeruk",
    emoji: "🍊",
    description: "Jeruk berwarna oranye dan memiliki rasa segar.",
  },
  {
    name: "Semangka",
    emoji: "🍉",
    description: "Semangka memiliki banyak air dan sangat menyegarkan.",
  },
  {
    name: "Anggur",
    emoji: "🍇",
    description: "Anggur tumbuh bergerombol dan tersedia dalam berbagai warna.",
  },
  {
    name: "Stroberi",
    emoji: "🍓",
    description: "Stroberi berwarna merah dan memiliki biji kecil di permukaannya.",
  },
  {
    name: "Mangga",
    emoji: "🥭",
    description: "Mangga matang biasanya manis dan memiliki aroma harum.",
  },
  {
    name: "Nanas",
    emoji: "🍍",
    description: "Nanas memiliki kulit berduri dan daging buah berwarna kuning.",
  },
  {
    name: "Kelapa",
    emoji: "🥥",
    description: "Kelapa memiliki air yang menyegarkan dan daging buah putih.",
  },
  {
    name: "Melon",
    emoji: "🍈",
    description: "Melon memiliki daging buah yang lembut dan rasanya manis.",
  },
  {
    name: "Alpukat",
    emoji: "🥑",
    description: "Alpukat memiliki kulit hijau dan daging buah yang lembut.",
  },
  {
    name: "Kiwi",
    emoji: "🥝",
    description: "Kiwi memiliki kulit cokelat dan daging buah berwarna hijau.",
  },
  {
    name: "Pir",
    emoji: "🍐",
    description: "Pir memiliki bentuk seperti lonceng dan rasanya manis.",
  },
  {
    name: "Ceri",
    emoji: "🍒",
    description: "Ceri berukuran kecil dan biasanya berwarna merah.",
  },
  {
    name: "Lemon",
    emoji: "🍋",
    description: "Lemon berwarna kuning dan memiliki rasa asam.",
  },
  {
    name: "Persik",
    emoji: "🍑",
    description: "Persik memiliki kulit lembut dan daging buah yang manis.",
  },
  
];

/* =========================================================
   DATA KENDARAAN
   TOTAL: 25 KENDARAAN
========================================================= */

export const vehicleItems: SimpleLearningItem[] = [
  {
    name: "Mobil",
    emoji: "🚗",
    description: "Mobil digunakan untuk membawa orang di jalan raya.",
  },
  {
    name: "Bus",
    emoji: "🚌",
    description: "Bus dapat membawa banyak orang dalam satu perjalanan.",
  },
  {
    name: "Ambulans",
    emoji: "🚑",
    description: "Ambulans digunakan untuk membantu membawa orang yang membutuhkan pertolongan medis.",
  },
  {
    name: "Pemadam Kebakaran",
    emoji: "🚒",
    description: "Mobil pemadam digunakan untuk membantu memadamkan kebakaran.",
  },
  {
    name: "Sepeda",
    emoji: "🚲",
    description: "Sepeda bergerak dengan tenaga dari kayuhan kaki.",
  },
  {
    name: "Motor",
    emoji: "🏍️",
    description: "Motor memiliki dua roda dan menggunakan mesin untuk bergerak.",
  },
  {
    name: "Kereta Api",
    emoji: "🚂",
    description: "Kereta api berjalan di atas rel dan dapat membawa banyak penumpang.",
  },
  {
    name: "Truk",
    emoji: "🚚",
    description: "Truk digunakan untuk membawa berbagai macam barang.",
  },
  {
    name: "Taksi",
    emoji: "🚕",
    description: "Taksi digunakan untuk mengantar penumpang ke tempat tujuan.",
  },
  {
    name: "Bajaj",
    emoji: "🛺",
    description: "Bajaj adalah kendaraan roda tiga yang digunakan untuk membawa penumpang.",
  },
  {
    name: "Becak",
    emoji: "🚲",
    description: "Becak merupakan kendaraan sederhana yang dapat digunakan untuk mengantar penumpang.",
  },
  {
    name: "Traktor",
    emoji: "🚜",
    description: "Traktor sering digunakan untuk membantu pekerjaan di sawah dan kebun.",
  },
  {
    name: "Mobil Polisi",
    emoji: "🚓",
    description: "Mobil polisi digunakan oleh petugas untuk membantu menjaga keamanan.",
  },
  {
    name: "Kapal",
    emoji: "🚢",
    description: "Kapal dapat membawa orang atau barang dan bergerak di atas air.",
  },
  
  {
    name: "Perahu",
    emoji: "🛶",
    description: "Perahu dapat digunakan untuk bergerak di sungai, danau, atau laut.",
  },
  
  {
    name: "Speedboat",
    emoji: "🚤",
    description: "Speedboat adalah perahu bermesin yang dapat bergerak dengan cepat.",
  },
  {
    name: "Feri",
    emoji: "⛴️",
    description: "Feri digunakan untuk membawa penumpang dan kendaraan melalui perairan.",
  },
  {
    name: "Pesawat",
    emoji: "✈️",
    description: "Pesawat dapat membawa penumpang dan terbang tinggi di langit.",
  },
  {
    name: "Helikopter",
    emoji: "🚁",
    description: "Helikopter dapat terbang dan melayang menggunakan baling-baling.",
  },
  {
    name: "Roket",
    emoji: "🚀",
    description: "Roket digunakan untuk membawa benda atau manusia ke luar angkasa.",
  },
  
  {
    name: "Pesawat Tempur",
    emoji: "🛩️",
    description: "Pesawat tempur adalah pesawat yang dirancang untuk keperluan militer.",
  },
  {
    name: "Skuter",
    emoji: "🛴",
    description: "Skuter merupakan kendaraan kecil yang dapat digunakan untuk perjalanan jarak dekat.",
  },
];