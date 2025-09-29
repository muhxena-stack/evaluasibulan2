# 🍳 Resep Masakan Jawa

Ini adalah proyek aplikasi web sederhana yang menampilkan kumpulan resep masakan khas Jawa. Aplikasi ini dibuat untuk pemula yang ingin belajar dasar-dasar pengembangan web menggunakan HTML, CSS, dan JavaScript modern (ES6 Modules).

## ✨ Fitur

-   **Daftar Resep**: Menampilkan semua resep masakan dalam format kartu yang menarik.
-   **Pencarian**: Memungkinkan pengguna untuk mencari resep berdasarkan namanya secara *real-time*.
-   **Detail Resep**: Halaman khusus untuk melihat detail lengkap sebuah resep, termasuk bahan-bahan dan langkah-langkah pembuatan.
-   **Favorit**: Pengguna dapat menyimpan resep favorit mereka. Data favorit akan disimpan di browser menggunakan `localStorage`, sehingga tidak akan hilang meskipun browser ditutup.
-   **Bagikan Resep**: Fitur untuk menyalin link unik sebuah resep yang bisa dibagikan kepada orang lain.
-   **Unduh Resep**: Pengguna dapat mengunduh detail resep dalam format file `.json`.

## 🚀 Cara Menjalankan Proyek

Proyek ini tidak memerlukan instalasi atau server khusus. Anda hanya perlu:

1.  Pastikan semua file (termasuk folder `assets` dan `src`) berada dalam satu direktori yang sama.
2.  Buka file `index.html` langsung menggunakan browser modern seperti Google Chrome, Firefox, atau Microsoft Edge.

## 📂 Struktur Folder

Struktur folder proyek ini diatur agar mudah dipahami:

```
.
├── assets/
│   ├── css/
│   │   └── styles.css      # File styling (CSS)
│   └── data/
│       └── resep.json      # Database resep dalam format JSON
├── src/
│   ├── modules/
│   │   ├── api.js          # Mengelola pengambilan data resep
│   │   ├── storage.js      # Mengelola penyimpanan (favorit)
│   │   ├── ui.js           # Mengelola tampilan (render HTML)
│   │   └── utils.js        # Fungsi-fungsi bantuan
│   └── main.js             # File JavaScript utama (logika aplikasi)
├── detail.html             # Halaman untuk detail resep
├── favorites.html          # Halaman untuk resep favorit
├── index.html              # Halaman utama
└── README.md               # File ini (penjelasan proyek)
```

## 💻 Teknologi yang Digunakan

-   **HTML5**: Untuk struktur konten halaman web.
-   **CSS3**: Untuk styling dan tata letak.
-   **JavaScript (ES6 Modules)**: Untuk logika aplikasi, interaktivitas, dan manipulasi DOM.