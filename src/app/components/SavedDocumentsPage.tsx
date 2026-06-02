import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  BookmarkIcon,
  Search,
  Trash2,
  ArrowRight,
  Gavel,
  FileText,
  Briefcase,
  Landmark,
  Receipt,
  Leaf,
  Building2,
  Map,
  FolderOpen,
  Clock3,
  Sparkles,
  LibraryBig,
  Layers3,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { DocCard } from "./DocCard";
import { DocumentViewer } from "./DocumentViewer";
import { dokumenHukum, kategoriHukum } from "../data/mockData";
import type { Dokumen } from "../data/mockData";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Gavel,
  FileText,
  Briefcase,
  Landmark,
  Receipt,
  Leaf,
  Building2,
  Map,
};

interface SavedDocumentsPageProps {
  savedIds: string[];
  selectedDoc: Dokumen | null;
  onOpenDoc: (d: Dokumen) => void;
  onCloseDoc: () => void;
  onToggleSave: (id: string) => void;
  onClearAll: () => void;
  onBrowse: () => void;
  onFilterClick: (f: string) => void;
}

const collections = [
  { label: "Kontrak & Sewa", query: "sewa rumah", count: 8 },
  { label: "Kerja & PHK", query: "hak karyawan PHK", count: 12 },
  { label: "Keluarga", query: "perceraian dan hak asuh", count: 6 },
];

export function SavedDocumentsPage({
  savedIds,
  selectedDoc,
  onOpenDoc,
  onCloseDoc,
  onToggleSave,
  onClearAll,
  onBrowse,
  onFilterClick,
}: SavedDocumentsPageProps) {
  const [filter, setFilter] = useState("");

  const savedDocs = useMemo(
    () => dokumenHukum.filter((d) => savedIds.includes(d.id)),
    [savedIds],
  );

  const visible = useMemo(() => {
    if (!filter.trim()) return savedDocs;
    const q = filter.toLowerCase();
    return savedDocs.filter(
      (d) =>
        d.judul.toLowerCase().includes(q) ||
        d.tentang.toLowerCase().includes(q) ||
        d.nomor.toLowerCase().includes(q) ||
        d.kategori.some((k) => k.toLowerCase().includes(q)),
    );
  }, [savedDocs, filter]);

  const activeCategories = useMemo(
    () => Array.from(new Set(savedDocs.flatMap((doc) => doc.kategori))).slice(0, 5),
    [savedDocs],
  );

  // If a document is selected, show the document viewer
  if (selectedDoc) {
    return <DocumentViewer doc={selectedDoc} onBack={onCloseDoc} />;
  }

  return (
    <main className="bg-beige min-h-screen">
      <section className="relative overflow-hidden bg-maroon text-white">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1800&q=80"
          alt="Rak buku hukum dan palu sidang sebagai latar dokumen legal"
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon via-maroon/92 to-maroon/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(219,68,57,0.42)_0,transparent_32%),radial-gradient(circle_at_82%_10%,rgba(241,231,218,0.24)_0,transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="font-heading text-white text-[2.4rem] leading-none md:text-[3.4rem]">
                Dokumen
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/78 md:text-base">
                Jelajahi kategori hukum populer, lanjutkan riset dari koleksi tersimpan,
                lalu buka dokumen penting tanpa kembali ke halaman pencarian awal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[330px_1fr]">
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-card bg-white p-5 shadow-card" style={{ border: "1px solid var(--color-line-soft)" }}>
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-warm-red">Jelajahi</p>
              <h2 className="font-heading mb-2 text-[1.45rem]">Kategori Hukum</h2>
              <p className="mb-5 text-sm leading-6 text-ink-muted">
                Pilih topik untuk menjalankan pencarian semantik dengan kata kunci yang mudah dipahami.
              </p>
              <div className="space-y-2.5">
                {kategoriHukum.slice(0, 6).map((k) => {
                  const Icon = iconMap[k.icon] ?? FileText;
                  return (
                    <button
                      key={k.id}
                      onClick={() => onFilterClick(k.nama)}
                      className="group flex w-full items-center gap-3 rounded-2xl bg-beige-soft p-3 text-left transition hover:bg-warm-red-soft"
                      style={{ border: "1px solid var(--color-line-soft)" }}
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-pill bg-white text-maroon shadow-sm transition group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium text-ink">{k.nama}</span>
                        <span className="block truncate text-xs text-ink-muted">{k.jumlahDokumen} dokumen tersedia</span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-warm-red opacity-70 transition group-hover:translate-x-0.5" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-card bg-beige-soft p-5" style={{ border: "1px solid var(--color-line-soft)" }}>
              <div className="mb-4 flex items-center gap-2 text-maroon">
                <FolderOpen className="h-4 w-4" />
                <h3 className="font-heading text-[1.1rem]">Koleksi cepat</h3>
              </div>
              <div className="space-y-2">
                {collections.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => onFilterClick(item.query)}
                    className="flex w-full items-center justify-between rounded-2xl bg-white px-3 py-2.5 text-sm text-ink transition hover:text-warm-red"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-ink-muted">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="rounded-card bg-white p-5 shadow-card md:p-6" style={{ border: "1px solid var(--color-line-soft)" }}>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-warm-red">Koleksi pribadi</p>
                  <h2 className="font-heading text-[1.8rem]">Dokumen yang disimpan</h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-ink-muted">
                    Arsipkan regulasi penting sebagai bahan rujukan. Gunakan pencarian mini untuk menyaring koleksi Anda saja.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                    <Input
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      placeholder="Cari judul, nomor, kategori…"
                      className="h-11 rounded-pill bg-beige-soft pl-9 sm:w-[280px]"
                      style={{ border: "1px solid var(--color-line-soft)" }}
                    />
                  </div>
                  {savedDocs.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={onClearAll}
                      className="h-11 rounded-pill bg-white text-maroon hover:bg-warm-red-soft"
                      style={{ borderColor: "var(--color-line-soft)" }}
                    >
                      <Trash2 className="mr-1.5 h-4 w-4" /> Kosongkan
                    </Button>
                  )}
                </div>
              </div>

              {activeCategories.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {activeCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className="rounded-pill bg-beige-soft px-3 py-1.5 text-xs text-maroon transition hover:bg-warm-red-soft"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </section>

            {savedDocs.length === 0 ? (
              <EmptyState onBrowse={onBrowse} />
            ) : visible.length === 0 ? (
              <div className="rounded-card bg-white p-10 text-center shadow-card" style={{ border: "1px dashed var(--color-line-soft)" }}>
                <Search className="mx-auto mb-3 h-8 w-8 text-warm-red" />
                <h3 className="font-heading mb-2 text-[1.35rem]">Tidak ada yang cocok</h3>
                <p className="mx-auto mb-5 max-w-md text-sm text-ink-muted">
                  Coba kata kunci lain, atau hapus filter mini untuk melihat semua dokumen tersimpan.
                </p>
                <Button onClick={() => setFilter("")} className="rounded-pill bg-maroon text-white hover:bg-maroon-deep">
                  Tampilkan semua
                </Button>
              </div>
            ) : (
              <section>
                <div className="mb-4 flex items-center justify-between gap-3 text-sm text-ink-muted">
                  <span>Menampilkan {visible.length} dari {savedDocs.length} dokumen tersimpan</span>
                  <span className="hidden items-center gap-1 md:flex"><Sparkles className="h-3.5 w-3.5 text-warm-red" /> Siap dibaca ulang</span>
                </div>
                <div className="columns-1 gap-6 [column-fill:_balance] md:columns-2 xl:columns-3">
                  {visible.map((doc) => (
                    <div key={doc.id} className="mb-6 break-inside-avoid">
                      <DocCard doc={doc} onOpen={onOpenDoc} isSaved onToggleSave={onToggleSave} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ icon: Icon, label, value }: { icon: ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3 text-center">
      <Icon className="mx-auto mb-2 h-4 w-4 text-white/75" />
      <div className="font-heading text-xl leading-none text-white">{value}</div>
      <div className="mt-1 text-[11px] text-white/65">{label}</div>
    </div>
  );
}

function EmptyState({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="rounded-card bg-white p-10 text-center shadow-card md:p-14" style={{ border: "1px dashed var(--color-line-soft)" }}>
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-pill bg-warm-red-soft">
        <BookmarkIcon className="h-7 w-7 text-maroon" />
      </div>
      <h2 className="font-heading mb-2 text-[1.6rem] text-maroon">Belum ada dokumen tersimpan</h2>
      <p className="mx-auto mb-6 max-w-md text-sm leading-6 text-ink-muted">
        Tandai dokumen dengan ikon bookmark saat menelusuri hasil pencarian. Dokumen itu akan muncul di ruang kerja ini.
      </p>
      <Button onClick={onBrowse} className="rounded-pill bg-warm-red text-white hover:bg-warm-red/90">
        <Search className="mr-1.5 h-4 w-4" /> Telusuri Dokumen
      </Button>
    </div>
  );
}
