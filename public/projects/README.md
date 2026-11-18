# Panduan Folder Proyek Video (v2 Support)

Setiap kali Anda ingin membuat video produk baru, buat satu folder khusus di dalam folder ini:
`public/projects/<nama_folder>/` (misalnya: `public/projects/video3/`).

---

## 1. Struktur Folder (Multi-Video / Sambung Klip)

Jika Anda memiliki beberapa potongan video yang ingin digabung menjadi satu (misal 4 klip @ 10 detik = total 40 detik):

```text
public/projects/video3/
├── clip1.mp4          (Klip 1: 0 - 10 detik)
├── clip2.mp4          (Klip 2: 10 - 20 detik)
├── clip3.mp4          (Klip 3: 20 - 30 detik)
├── clip4.mp4          (Klip 4: 30 - 40 detik)
├── project.json       (File hasil generate gemini_canvas_app_v2.html)
└── voiceover.mp3      (Opsional: jika menggunakan suara rekaman / dubbing)
```

Di dalam `project.json`, Gemini Canvas App v2 otomatis membuat array `clips`:
```json
{
  "projectId": "video3",
  "metadata": {
    "durationInFrames": 1200,
    "fps": 30,
    "width": 1080,
    "height": 1920
  },
  "videoSource": "projects/video3/clip1.mp4",
  "clips": [
    { "source": "projects/video3/clip1.mp4", "startFrame": 0, "endFrame": 300, "durationInFrames": 300 },
    { "source": "projects/video3/clip2.mp4", "startFrame": 300, "endFrame": 600, "durationInFrames": 300 },
    { "source": "projects/video3/clip3.mp4", "startFrame": 600, "endFrame": 900, "durationInFrames": 300 },
    { "source": "projects/video3/clip4.mp4", "startFrame": 900, "endFrame": 1200, "durationInFrames": 300 }
  ]
}
```

---

## 2. Cara Kerja Durasi & MP3

1. **Suara Asli Klip Video (`useOriginalVideoAudio: true`)**:
   - Tiap suara dari klip 1 s.d klip 4 akan otomatis dimainkan sesuai urutan dan waktu kemunculan klipnya masing-masing.
2. **Suara Dubbing MP3 (`customAudioPath`)**:
   - Jika MP3 lebih pendek dari video: narasi selesai di detik MP3 habis, video dan BGM terus berjalan sampai akhir video.
   - Jika MP3 lebih panjang dari video: agar narasi MP3 tidak terpotong, sesuaikan `durationSec` di Gemini Canvas App v2 dengan durasi MP3. Remotion akan menahan frame terakhir klip ke-4 sehingga visual tidak menjadi layar hitam.
3. **Musik Latar (`bgm.mp3`)**:
   - Musik latar (`backgroundMusicPath`) kini otomatis `loop: true`, sehingga jika lagunya lebih pendek dari video, lagu akan berulang otomatis tanpa jeda hening.

---

## 3. Cara Render di GitHub Actions

Buka tab **Actions** > **Render Video with Remotion** > **Run workflow**:

- **Render 1 Folder Tertentu**:
  Ketik nama folder di input `target`, misal: `video3`
  *(Otomatis mencari `public/projects/video3/project.json` dan menghasilkan `video3_final.mp4`)*
- **Render Beberapa Folder Sekaligus**:
  Ketik daftar folder dipisahkan tanda koma, misal: `video1, video2, video3`
  *(Akan merender satu per satu secara berurutan dan mengunggah semua hasil video)*
- **Render Semua Folder**:
  Ketik: `all`
  *(Akan mencari semua folder di `public/projects/*/project.json` dan merender semuanya)*
- **Auto Render via Git Push**:
  Cukup commit dan push file `project.json` ke branch. GitHub Actions akan mendeteksi semua folder yang berubah dan otomatis merender semuanya sekaligus!
