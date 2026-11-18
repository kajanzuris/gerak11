# 🎬 Remotion Universal Video Generator (Data-Driven)

Template otomatisasi produksi video promosi produk vertikal (TikTok, Reels, Shorts) berbasis **Remotion**, digerakkan secara dinamis oleh file konfigurasi `project.json` hasil analisis **Gemini AI Canvas**, dan dirender secara otomatis melalui **GitHub Actions**.

---

## 🚀 Fitur Template
- **Data-Driven Composition**: Cukup ubah/buat file `project.json`, tanpa perlu coding ulang template Remotion.
- **Dynamic Lighting Transition**: Efek dramatis *dark vignette* pada fase masalah yang meledak menjadi pencahayaan terang bersih (*light bloom*) pada fase solusi.
- **3D Parallax Floating Card**: Video bertransformasi menjadi kartu perspektif 3D melayang dengan latar blur dan partikel *ambient bokeh*.
- **Motion & Kinetic Panels**: Tipografi tebal dengan animasi pegas (*spring physics*), badge kontras tinggi, dan stampel dinamis.
- **Contextual Visual Stickers**: Animasi detak jantung EKG (`heartbeat_ekg`), apel membal (`bouncing_apple`), panah kinetik dorong (`downward_arrows`), tetesan keringat (`sweat_drops`), dan kilauan bintang (`sparkles`).
- **3-Pill Checklist Keunggulan**: Panel checklist animasi centang hijau meluncur satu per satu di kiri atas.
- **Interactive Callout Pins**: Garis penunjuk beranimasi putus-putus dengan lingkaran target berdenyut yang menyorot fitur fisik produk.
- **Word-by-Word Karaoke Subtitles**: Subtitle dinamis dengan sorotan badge kuning pada kata yang sedang diucapkan.
- **Branding Header & Footer**: Menghilangkan watermark bawaan video mentah dan menambahkan progress bar video modern di bagian bawah.
- **Audio Switch**: Fleksibel memilih menggunakan audio asli video atau menggantinya dengan MP3 voiceover kustom, plus sound effects kinetik (whoosh, pop, ding, slice, dll).

---

## 📁 Struktur Folder

```text
├── .github/
│   └── workflows/
│       └── render_video.yml       # Alur render otomatis GitHub Actions
├── public/
│   ├── default_project.json       # Contoh konfigurasi data-driven video
│   ├── video0222.mp4              # File video mentah contoh
│   ├── voiceover.mp3              # File audio contoh
│   └── *.wav                      # Sound effects (whoosh, pop, ding, slice, dll)
├── src/
│   ├── components/                # Komponen visual dinamis
│   ├── types/project.ts           # TypeScript Schema untuk project.json
│   ├── UniversalVideo.tsx         # Komposisi utama data-driven
│   ├── Root.tsx
│   └── index.ts
├── GEMINI_CANVAS_SYSTEM_PROMPT.md # Prompt panduan untuk Gemini Canvas
├── remotion.config.ts
└── package.json
```

---

## 💻 Cara Menjalankan Secara Lokal

1. **Install Dependencies**:
   ```bash
   npm install
   npx remotion browser ensure
   ```

2. **Jalankan Remotion Studio (Preview Interaktif)**:
   ```bash
   npx remotion studio src/index.ts
   ```

3. **Render Video ke File MP4**:
   ```bash
   npx remotion render src/index.ts UniversalVideo output.mp4 --props=public/default_project.json
   ```

---

## ☁️ Cara Render Otomatis via GitHub Actions

1. Buka tab **Actions** di repository GitHub Anda.
2. Pilih workflow **Render Video with Remotion**.
3. Klik tombol **Run workflow**.
4. Masukkan path file `project.json` yang ingin dirender (default: `public/default_project.json`).
5. Tunggu proses selesai, dan unduh hasil videonya di bagian **Artifacts**!
