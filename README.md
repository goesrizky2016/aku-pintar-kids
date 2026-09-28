# Aku Pintar Kids

Aplikasi web edukasi anak usia 2–7 tahun: huruf, angka, hewan, buah, kendaraan, mewarnai, permainan, bintang, dan pengaturan orang tua.

## Menjalankan di komputer

Pastikan Node.js 18+ sudah terpasang.

```bash
npm install
npm run dev
```

Kemudian buka alamat Vite yang muncul, biasanya `http://localhost:5173`.

## Build production

```bash
npm run build
npm run preview
```

## Struktur

```text
src/
├── components/
│   ├── ui/
│   └── ...
├── data/
├── lib/
├── pages/
├── App.tsx
├── main.tsx
└── index.css
```

Progress, profil, jumlah bintang, dan status suara disimpan di `localStorage` browser.
