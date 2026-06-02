# SatuHukum DAMP

SatuHukum DAMP adalah prototipe aplikasi React untuk pengalaman pencarian dan pembacaan dokumen hukum Indonesia. Aplikasi ini membantu pengguna mencari pertanyaan hukum dengan bahasa sehari-hari, menelusuri kategori regulasi, memfilter hasil dokumen, membuka halaman detail dokumen, dan menyimpan dokumen penting untuk dibaca kembali.

Saat ini proyek masih berupa demo frontend-only yang menggunakan data mock lokal di `src/app/data/mockData.ts`. Aplikasi belum terhubung ke backend API, sehingga hasil pencarian, isi dokumen, kategori, dan data awal dokumen tersimpan berasal dari data contoh yang sudah dibundel di dalam proyek.

Referensi desain awal: https://www.figma.com/design/nR09DyYGU5I6ar9gKUGXG5/

## Fitur

- Halaman beranda dengan contoh pertanyaan bergaya pencarian semantik dan filter regulasi cepat.
- Halaman hasil pencarian dengan filter jenis regulasi, status, dan rentang tahun.
- Halaman pembaca dokumen dengan metadata, pasal relevan yang disorot, daftar isi, dan dokumen terkait.
- Halaman dokumen tersimpan untuk dokumen hukum yang di-bookmark.
- Status dokumen tersimpan disimpan di browser melalui `localStorage`.
- Layout masonry responsif untuk kartu dokumen dan bagian konten.

## Teknologi

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS 4
- Radix UI primitives
- Lucide React icons
- React Responsive Masonry

## Prasyarat

Pastikan Node.js dan npm sudah terinstal sebelum menjalankan proyek. Disarankan menggunakan versi LTS terbaru dari Node.js.

## Cara Menjalankan Proyek

Instal dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Vite akan menampilkan URL lokal, biasanya:

```text
http://localhost:5173/
```

Buka URL tersebut di browser untuk menggunakan aplikasi.

## Script yang Tersedia

Menjalankan development server lokal:

```bash
npm run dev
```

Membuat production build ke folder `dist/`:

```bash
npm run build
```

Melihat hasil production build secara lokal:

```bash
npx vite preview
```

## Struktur Proyek

```text
src/
  app/
    App.tsx                    Routing aplikasi dan state dokumen tersimpan
    components/                Komponen halaman dan komponen UI
    data/mockData.ts           Data demo dokumen hukum dan metadata filter
  styles/                      Style global, font, tema, dan entry Tailwind
index.html                     Entry point HTML untuk Vite
vite.config.ts                 Konfigurasi Vite
```

## Route Utama

- `/` - Halaman beranda dengan pencarian, filter cepat, dokumen pilihan, dan kartu topik.
- `/search?q=...` - Halaman hasil pencarian dengan filter dan kartu dokumen.
- `/documents` - Halaman dokumen tersimpan dan penelusuran kategori hukum.
- `/documents/:docId` - Halaman detail/pembaca dokumen.

## Catatan

- Aplikasi ini masih berupa prototipe frontend statis.
- Perilaku pencarian disimulasikan menggunakan data lokal dan nilai relevansi.
- Dokumen tersimpan disimpan dengan key `satuhukum-saved-docs` di `localStorage` browser.
- Beberapa aksi dokumen, seperti unduh PDF, salin kutipan, dan bagikan, masih berupa placeholder UI.
