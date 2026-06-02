export type JenisRegulasi = 'UUD' | 'UU' | 'PP' | 'Perpres' | 'Perda' | 'Permen' | 'Permenkeu';
export type StatusRegulasi = 'Berlaku' | 'Dicabut' | 'Diubah';

export interface Pasal {
  id: string;
  nomor: string;
  judul?: string;
  ayat: { nomor: string; isi: string }[];
  highlight?: boolean;
}

export interface Bab {
  id: string;
  nomor: string;
  judul: string;
  bagian?: { id: string; nomor: string; judul: string; pasal: Pasal[] }[];
  pasal?: Pasal[];
}

export interface Dokumen {
  id: string;
  judul: string;
  nomor: string;
  jenis: JenisRegulasi;
  tahun: number;
  tentang: string;
  status: StatusRegulasi;
  snippet: string;
  kategori: string[];
  relevansi?: number;
  instansi: string;
  bab: Bab[];
}

export const dokumenHukum: Dokumen[] = [
  {
    id: 'doc-001',
    judul: 'Undang-Undang No. 8 Tahun 1999',
    nomor: 'UU No. 8 Tahun 1999',
    jenis: 'UU',
    tahun: 1999,
    tentang: 'Perlindungan Konsumen',
    status: 'Berlaku',
    snippet:
      'Mengatur hak dan kewajiban konsumen serta pelaku usaha, termasuk ketentuan mengenai denda keterlambatan pembayaran dalam perjanjian sewa-menyewa properti. Pasal 62 mengatur sanksi bagi pelaku usaha yang merugikan konsumen.',
    kategori: ['Hukum Perdata', 'Konsumen'],
    relevansi: 92,
    instansi: 'DPR RI & Presiden RI',
    bab: [
      {
        id: 'bab-1',
        nomor: 'I',
        judul: 'Ketentuan Umum',
        pasal: [
          {
            id: 'p1',
            nomor: '1',
            judul: 'Definisi',
            ayat: [
              { nomor: '1', isi: 'Perlindungan konsumen adalah segala upaya yang menjamin adanya kepastian hukum untuk memberi perlindungan kepada konsumen.' },
              { nomor: '2', isi: 'Konsumen adalah setiap orang pemakai barang dan/atau jasa yang tersedia dalam masyarakat, baik bagi kepentingan diri sendiri, keluarga, orang lain, maupun makhluk hidup lain dan tidak untuk diperdagangkan.' },
              { nomor: '3', isi: 'Pelaku usaha adalah setiap orang perseorangan atau badan usaha, baik yang berbentuk badan hukum maupun bukan badan hukum yang didirikan dan berkedudukan atau melakukan kegiatan dalam wilayah hukum negara Republik Indonesia.' },
            ],
          },
        ],
      },
      {
        id: 'bab-2',
        nomor: 'II',
        judul: 'Asas dan Tujuan',
        pasal: [
          {
            id: 'p2',
            nomor: '2',
            ayat: [
              { nomor: '1', isi: 'Perlindungan konsumen berasaskan manfaat, keadilan, keseimbangan, keamanan dan keselamatan konsumen, serta kepastian hukum.' },
            ],
          },
          {
            id: 'p3',
            nomor: '3',
            ayat: [
              { nomor: '1', isi: 'Perlindungan konsumen bertujuan meningkatkan kesadaran, kemampuan dan kemandirian konsumen untuk melindungi diri.' },
            ],
          },
        ],
      },
      {
        id: 'bab-3',
        nomor: 'IV',
        judul: 'Perbuatan yang Dilarang Bagi Pelaku Usaha',
        pasal: [
          {
            id: 'p4',
            nomor: '18',
            judul: 'Klausula Baku yang Dilarang',
            highlight: true,
            ayat: [
              {
                nomor: '1',
                isi: 'Pelaku usaha dalam menawarkan barang dan/atau jasa yang ditujukan untuk diperdagangkan dilarang membuat atau mencantumkan klausula baku pada setiap dokumen dan/atau perjanjian apabila: (a) menyatakan pengalihan tanggung jawab pelaku usaha; (b) menyatakan bahwa pelaku usaha berhak menolak penyerahan kembali barang yang dibeli konsumen; (c) menyatakan bahwa pelaku usaha berhak menolak penyerahan kembali uang yang dibayarkan atas barang dan/atau jasa yang dibeli oleh konsumen; (d) menyatakan pemberian kuasa dari konsumen kepada pelaku usaha baik secara langsung maupun tidak langsung untuk melakukan segala tindakan sepihak yang berkaitan dengan barang yang dibeli oleh konsumen secara angsuran.',
              },
              {
                nomor: '2',
                isi: 'Pelaku usaha dilarang mencantumkan klausula baku yang letak atau bentuknya sulit terlihat atau tidak dapat dibaca secara jelas, atau yang pengungkapannya sulit dimengerti.',
              },
              {
                nomor: '3',
                isi: 'Setiap klausula baku yang telah ditetapkan oleh pelaku usaha pada dokumen atau perjanjian yang memenuhi ketentuan sebagaimana dimaksud pada ayat (1) dan ayat (2) dinyatakan batal demi hukum.',
              },
              {
                nomor: '4',
                isi: 'Pelaku usaha wajib menyesuaikan klausula baku yang bertentangan dengan undang-undang ini.',
              },
            ],
          },
          {
            id: 'p5',
            nomor: '62',
            judul: 'Sanksi Pidana',
            ayat: [
              {
                nomor: '1',
                isi: 'Pelaku usaha yang melanggar ketentuan sebagaimana dimaksud dalam Pasal 8, Pasal 9, Pasal 10, Pasal 13 ayat (2), Pasal 15, Pasal 17 ayat (1) huruf a, huruf b, huruf c, huruf e, ayat (2), dan Pasal 18 dipidana dengan pidana penjara paling lama 5 (lima) tahun atau pidana denda paling banyak Rp 2.000.000.000,00 (dua miliar rupiah).',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'doc-002',
    judul: 'Kitab Undang-Undang Hukum Perdata',
    nomor: 'KUHPer (BW)',
    jenis: 'UU',
    tahun: 1847,
    tentang: 'Hukum Perdata (Burgerlijk Wetboek)',
    status: 'Berlaku',
    snippet:
      'Buku III KUHPer mengatur hukum perikatan, termasuk perjanjian sewa-menyewa (Pasal 1548-1600). Pasal 1550 mengatur kewajiban penyewa untuk membayar harga sewa pada waktu yang telah ditentukan. Denda keterlambatan dapat diperjanjikan dalam kontrak sewa.',
    kategori: ['Hukum Perdata', 'Perjanjian', 'Sewa-Menyewa'],
    relevansi: 97,
    instansi: 'Pemerintah Hindia Belanda (masih berlaku)',
    bab: [
      {
        id: 'bab-1',
        nomor: 'III',
        judul: 'Buku Ketiga: Perikatan',
        bagian: [
          {
            id: 'bagian-1',
            nomor: 'BAB VII',
            judul: 'Sewa-Menyewa',
            pasal: [
              {
                id: 'p1548',
                nomor: '1548',
                ayat: [
                  { nomor: '1', isi: 'Sewa-menyewa ialah suatu perjanjian, dengan mana pihak yang satu mengikatkan dirinya untuk memberikan kepada pihak yang lainnya kenikmatan dari sesuatu barang, selama suatu waktu tertentu dan dengan pembayaran sesuatu harga, yang oleh pihak tersebut belakangan itu disanggupi pembayarannya.' },
                ],
              },
              {
                id: 'p1550',
                nomor: '1550',
                judul: 'Kewajiban Penyewa',
                ayat: [
                  { nomor: '1', isi: 'Penyewa mempunyai dua kewajiban utama: 1. Memakai barang sewa sebagai seorang kepala rumah tangga yang baik, sesuai dengan tujuan yang diberikan pada barang itu menurut perjanjian sewanya, atau jika tidak ada perjanjian mengenai itu, menurut tujuan yang dipersangkakan berhubung dengan keadaan. 2. Membayar harga sewa pada waktu-waktu yang telah ditentukan.' },
                ],
              },
              {
                id: 'p1560',
                nomor: '1560',
                highlight: true,
                judul: 'Kewajiban Membayar Sewa Tepat Waktu',
                ayat: [
                  {
                    nomor: '1',
                    isi: 'Penyewa harus membayar harga sewa menurut janji. Apabila tidak ada perjanjian dalam hal ini, penyewa diwajibkan membayar harga sewa menurut kebiasaan setempat.',
                  },
                  {
                    nomor: '2',
                    isi: 'Jika penyewa tidak memenuhi kewajibannya untuk membayar harga sewa, maka pihak yang menyewakan berhak memutuskan perjanjian sewa, dengan tidak mengurangi hak pihak yang menyewakan untuk menuntut penggantian segala kerugian, biaya, dan bunga.',
                  },
                  {
                    nomor: '3',
                    isi: 'Dalam hal perjanjian sewa mencantumkan klausula denda keterlambatan pembayaran, klausula tersebut sah dan mengikat kedua belah pihak sepanjang tidak bertentangan dengan ketentuan peraturan perundang-undangan yang berlaku dan kepatutan.',
                  },
                ],
              },
              {
                id: 'p1565',
                nomor: '1565',
                ayat: [
                  {
                    nomor: '1',
                    isi: 'Jika penyewa tidak membersihkan rumah sewaan atau membiarkan rumah sewaan rusak atau tidak terawat, maka pihak yang menyewakan berhak meminta pemenuhan perjanjian atau memutuskan perjanjian sewa dengan ganti rugi.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'doc-003',
    judul: 'Undang-Undang No. 11 Tahun 2008',
    nomor: 'UU No. 11 Tahun 2008',
    jenis: 'UU',
    tahun: 2008,
    tentang: 'Informasi dan Transaksi Elektronik (ITE)',
    status: 'Diubah',
    snippet:
      'Mengatur tentang informasi dan transaksi elektronik di Indonesia, termasuk tanda tangan digital, dokumen elektronik, dan penyelesaian sengketa secara elektronik. Telah diubah dengan UU No. 19 Tahun 2016.',
    kategori: ['Hukum Pidana', 'Teknologi Informasi'],
    relevansi: 45,
    instansi: 'DPR RI & Presiden RI',
    bab: [],
  },
  {
    id: 'doc-004',
    judul: 'Undang-Undang No. 13 Tahun 2003',
    nomor: 'UU No. 13 Tahun 2003',
    jenis: 'UU',
    tahun: 2003,
    tentang: 'Ketenagakerjaan',
    status: 'Diubah',
    snippet:
      'Mengatur tentang ketenagakerjaan di Indonesia secara komprehensif, meliputi hubungan kerja, waktu kerja dan istirahat, pengupahan, perlindungan tenaga kerja, serta pemutusan hubungan kerja (PHK). Telah diubah sebagian oleh UU Cipta Kerja.',
    kategori: ['Ketenagakerjaan', 'Hukum Perdata'],
    relevansi: 60,
    instansi: 'DPR RI & Presiden RI',
    bab: [],
  },
  {
    id: 'doc-005',
    judul: 'Peraturan Pemerintah No. 44 Tahun 1994',
    nomor: 'PP No. 44 Tahun 1994',
    jenis: 'PP',
    tahun: 1994,
    tentang: 'Penghunian Rumah oleh Bukan Pemilik',
    status: 'Berlaku',
    snippet:
      'Mengatur ketentuan penghunian rumah oleh bukan pemilik, termasuk sewa-menyewa tempat tinggal, hak dan kewajiban penghuni sewa (penyewa kos/kontrakan), serta mekanisme penyelesaian sengketa antara pemilik dan penyewa.',
    kategori: ['Hukum Perdata', 'Properti', 'Sewa-Menyewa'],
    relevansi: 89,
    instansi: 'Presiden RI',
    bab: [],
  },
  {
    id: 'doc-006',
    judul: 'Undang-Undang Dasar 1945',
    nomor: 'UUD 1945',
    jenis: 'UUD',
    tahun: 1945,
    tentang: 'Undang-Undang Dasar Negara Republik Indonesia',
    status: 'Berlaku',
    snippet:
      'Konstitusi Negara Republik Indonesia yang memuat hak-hak dasar warga negara, struktur pemerintahan, serta prinsip-prinsip dasar penyelenggaraan negara. Telah mengalami 4 kali amandemen (1999-2002).',
    kategori: ['Hukum Tata Negara', 'Konstitusi'],
    relevansi: 30,
    instansi: 'MPR RI',
    bab: [],
  },
  {
    id: 'doc-007',
    judul: 'Perda DKI Jakarta No. 3 Tahun 2012',
    nomor: 'Perda No. 3 Tahun 2012',
    jenis: 'Perda',
    tahun: 2012,
    tentang: 'Retribusi Daerah dan Pengelolaan Rumah Kos',
    status: 'Berlaku',
    snippet:
      'Mengatur ketentuan pengelolaan dan pendaftaran rumah kos di wilayah DKI Jakarta. Termasuk kewajiban pemilik kos, standar fasilitas, dan ketentuan sanksi atas pelanggaran perjanjian sewa-menyewa.',
    kategori: ['Hukum Perdata', 'Properti', 'Peraturan Daerah'],
    relevansi: 85,
    instansi: 'DPRD DKI Jakarta & Gubernur DKI Jakarta',
    bab: [],
  },
  {
    id: 'doc-008',
    judul: 'Kitab Undang-Undang Hukum Pidana',
    nomor: 'KUHP',
    jenis: 'UU',
    tahun: 1946,
    tentang: 'Kitab Undang-Undang Hukum Pidana (Wetboek van Strafrecht)',
    status: 'Diubah',
    snippet:
      'Kitab hukum pidana yang menjadi landasan hukum pidana positif Indonesia. Mengatur tentang tindak pidana umum, pemidanaan, dan ketentuan-ketentuan umum hukum pidana. Telah digantikan oleh KUHP Nasional (UU No. 1 Tahun 2023).',
    kategori: ['Hukum Pidana'],
    relevansi: 25,
    instansi: 'Pemerintah RI',
    bab: [],
  },
];

export const kategoriHukum = [
  {
    id: 'pidana',
    nama: 'Hukum Pidana',
    deskripsi: 'Peraturan tindak pidana, sanksi, dan pemidanaan',
    icon: 'Gavel',
    jumlahDokumen: 124,
    warna: '#DC2626',
  },
  {
    id: 'perdata',
    nama: 'Hukum Perdata',
    deskripsi: 'Perjanjian, properti, keluarga, dan waris',
    icon: 'FileText',
    jumlahDokumen: 312,
    warna: '#2563EB',
  },
  {
    id: 'ketenagakerjaan',
    nama: 'Ketenagakerjaan',
    deskripsi: 'Hubungan kerja, upah, dan PHK',
    icon: 'Briefcase',
    jumlahDokumen: 87,
    warna: '#7C3AED',
  },
  {
    id: 'tatanegara',
    nama: 'Hukum Tata Negara',
    deskripsi: 'Konstitusi, pemerintahan, dan pemilu',
    icon: 'Landmark',
    jumlahDokumen: 205,
    warna: '#0D9488',
  },
  {
    id: 'pajak',
    nama: 'Hukum Pajak',
    deskripsi: 'Perpajakan, bea cukai, dan retribusi',
    icon: 'Receipt',
    jumlahDokumen: 156,
    warna: '#D97706',
  },
  {
    id: 'lingkungan',
    nama: 'Hukum Lingkungan',
    deskripsi: 'Lingkungan hidup, sumber daya alam',
    icon: 'Leaf',
    jumlahDokumen: 93,
    warna: '#16A34A',
  },
  {
    id: 'bisnis',
    nama: 'Hukum Bisnis',
    deskripsi: 'Perseroan, investasi, dan persaingan usaha',
    icon: 'Building2',
    jumlahDokumen: 178,
    warna: '#0F172A',
  },
  {
    id: 'agraria',
    nama: 'Hukum Agraria',
    deskripsi: 'Pertanahan, hak atas tanah, dan tata ruang',
    icon: 'Map',
    jumlahDokumen: 67,
    warna: '#B45309',
  },
];

export const quickFilters = ['UUD', 'UU', 'PP', 'Perpres', 'Perda', 'Permen'];

export const tahunFilter = [
  { label: '2020 - Sekarang', min: 2020, max: 2030 },
  { label: '2010 - 2019', min: 2010, max: 2019 },
  { label: '2000 - 2009', min: 2000, max: 2009 },
  { label: '1990 - 1999', min: 1990, max: 1999 },
  { label: 'Sebelum 1990', min: 0, max: 1989 },
];

export const contohPertanyaan = [
  'aturan denda telat bayar kos',
  'hak karyawan di-PHK mendadak',
  'syarat sah sebuah perjanjian kontrak',
  'hukuman menyebarkan foto tanpa izin',
  'cara mengurus warisan tanpa surat wasiat',
  'aturan cuti melahirkan untuk karyawan swasta',
];
