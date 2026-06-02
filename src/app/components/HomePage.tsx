import { useMemo, useState } from "react";
import Masonry, {
  ResponsiveMasonry,
} from "react-responsive-masonry";
import {
  TrendingUp,
  BookOpen,
  Sparkles,
  Clock,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Bookmark,
  Filter,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { SearchBar } from "./SearchBar";
import { DocCard } from "./DocCard";
import {
  dokumenHukum,
  contohPertanyaan,
  quickFilters,
  tahunFilter,
  type Dokumen,
} from "../data/mockData";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface HomePageProps {
  onSearch: (q: string) => void;
  onFilterClick: (f: string) => void;
  onOpenDoc?: (d: Dokumen) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export function HomePage({
  onSearch,
  onFilterClick,
  onOpenDoc,
  savedIds,
  onToggleSave,
}: HomePageProps) {
  const recent = dokumenHukum.slice(0, 6);
  const [searchQuery, setSearchQuery] = useState("");
  const [jenis, setJenis] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [tahunIdx, setTahunIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!searchQuery) return [];
    return dokumenHukum
      .filter((d) => (jenis.length ? jenis.includes(d.jenis) : true))
      .filter((d) => (status.length ? status.includes(d.status) : true))
      .filter((d) => {
        if (tahunIdx === null) return true;
        const t = tahunFilter[tahunIdx];
        return d.tahun >= t.min && d.tahun <= t.max;
      })
      .sort((a, b) => (b.relevansi ?? 0) - (a.relevansi ?? 0));
  }, [searchQuery, jenis, status, tahunIdx]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const clearAll = () => {
    setJenis([]);
    setStatus([]);
    setTahunIdx(null);
  };

  const activeCount = jenis.length + status.length + (tahunIdx !== null ? 1 : 0);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterClick = (filter: string) => {
    setSearchQuery(filter);
    onFilterClick(filter);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    clearAll();
  };

  return (
    <div className="bg-beige min-h-screen">
      {/* ===== Hero ===== */}
      <section className="relative">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 10%, var(--color-maroon) 0, transparent 40%), radial-gradient(circle at 80% 60%, var(--color-warm-red) 0, transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
          <h1
            className="font-heading mb-5"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              lineHeight: 1.05,
            }}
          >
            Pusat Dokumen Hukum
            <br />
            <span style={{ color: "var(--color-warm-red)" }}>
              untuk Semua Warga.
            </span>
          </h1>
          <p
            className="max-w-2xl mx-auto text-ink-muted mb-8"
            style={{ fontSize: "1.05rem" }}
          >
            Tanyakan masalah hukum dengan bahasa sehari-hari.
            SatuHukum akan menemukan undang-undang, peraturan,
            dan pasal yang paling relevan dari ribuan dokumen
            resmi.
          </p>

          <SearchBar
            onSearch={handleSearch}
            suggestions={contohPertanyaan.slice(0, 5)}
          />

          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="text-xs text-ink-muted mr-1">
              Cepat:
            </span>
            {quickFilters.map((f) => (
              <button
                key={f}
                onClick={() => handleFilterClick(f)}
                className="text-sm px-3 py-1.5 rounded-pill bg-white hover:bg-beige-soft text-maroon transition"
                style={{
                  border: "1px solid var(--color-line)",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-ink-muted">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-warm-red" />{" "}
              12.480+ dokumen resmi
            </span>
            <span className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-warm-red" />{" "}
              Dipakai akademisi &amp; praktisi
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warm-red" /> Update
              peraturan harian
            </span>
          </div>
        </div>
      </section>

      {/* ===== Marquee Announcements ===== */}
      {!searchQuery && (
        <section
          className="relative overflow-hidden py-3"
          style={{ backgroundColor: "var(--color-maroon)" }}
        >
          <div className="flex whitespace-nowrap animate-marquee">
            <div className="flex items-center gap-8 px-4">
              <MarqueeItem text="🔴 BARU: Peraturan Menteri Ketenagakerjaan No. 5 Tahun 2026 tentang Upah Minimum Regional" />
              <MarqueeItem text="⚖️ UPDATE: Revisi UU Cipta Kerja - Perubahan ketentuan izin usaha dan ketenagakerjaan" />
              <MarqueeItem text="📋 INFO: Perpanjangan batas waktu pelaporan SPT Tahunan hingga 30 Juni 2026" />
              <MarqueeItem text="🏛️ PENTING: Putusan MK No. 18/PUU-XXI/2026 - Uji materi Pasal 27 UU ITE" />
              <MarqueeItem text="📢 PENGUMUMAN: Sistem SatuHukum kini dilengkapi pencarian semantik berbasis AI" />
              <MarqueeItem text="⭐ TRENDING: UU Perlindungan Data Pribadi - Hak dan kewajiban pengguna platform digital" />
            </div>
            <div className="flex items-center gap-8 px-4">
              <MarqueeItem text="🔴 BARU: Peraturan Menteri Ketenagakerjaan No. 5 Tahun 2026 tentang Upah Minimum Regional" />
              <MarqueeItem text="⚖️ UPDATE: Revisi UU Cipta Kerja - Perubahan ketentuan izin usaha dan ketenagakerjaan" />
              <MarqueeItem text="📋 INFO: Perpanjangan batas waktu pelaporan SPT Tahunan hingga 30 Juni 2026" />
              <MarqueeItem text="🏛️ PENTING: Putusan MK No. 18/PUU-XXI/2026 - Uji materi Pasal 27 UU ITE" />
              <MarqueeItem text="📢 PENGUMUMAN: Sistem SatuHukum kini dilengkapi pencarian semantik berbasis AI" />
              <MarqueeItem text="⭐ TRENDING: UU Perlindungan Data Pribadi - Hak dan kewajiban pengguna platform digital" />
            </div>
          </div>
        </section>
      )}

      {/* ===== Search Results Section ===== */}
      {searchQuery && (
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading mb-1" style={{ fontSize: "1.875rem" }}>
                {filtered.length} dokumen ditemukan
              </h2>
              <p className="text-ink-muted">
                Untuk kueri:{" "}
                <span style={{ color: "var(--color-warm-red)" }}>
                  "{searchQuery}"
                </span>
              </p>
            </div>
            <Button
              onClick={handleClearSearch}
              variant="outline"
              className="rounded-pill"
            >
              <X className="h-4 w-4 mr-1" /> Tutup Pencarian
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Filter sidebar */}
            <aside
              className="rounded-card bg-white p-5 shadow-card h-fit lg:sticky lg:top-24"
              style={{ border: "1px solid var(--color-line-soft)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-warm-red" />
                  <h3
                    className="font-heading"
                    style={{ fontSize: "1.05rem" }}
                  >
                    Filter
                  </h3>
                  {activeCount > 0 && (
                    <Badge
                      className="rounded-pill border-0 text-white"
                      style={{
                        backgroundColor: "var(--color-warm-red)",
                      }}
                    >
                      {activeCount}
                    </Badge>
                  )}
                </div>
                {activeCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs flex items-center gap-1 text-ink-muted hover:text-warm-red"
                  >
                    <X className="h-3 w-3" /> Reset
                  </button>
                )}
              </div>

              <FilterGroup title="Jenis Regulasi">
                <div className="space-y-2">
                  {quickFilters.map((j) => (
                    <label
                      key={j}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                    >
                      <Checkbox
                        checked={jenis.includes(j)}
                        onCheckedChange={() => toggle(jenis, setJenis, j)}
                      />
                      <span>{j}</span>
                    </label>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Status">
                <div className="space-y-2">
                  {["Berlaku", "Diubah", "Dicabut"].map((s) => (
                    <label
                      key={s}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                    >
                      <Checkbox
                        checked={status.includes(s)}
                        onCheckedChange={() =>
                          toggle(status, setStatus, s)
                        }
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Tahun" last>
                <div className="space-y-2">
                  {tahunFilter.map((t, i) => (
                    <label
                      key={t.label}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                    >
                      <input
                        type="radio"
                        name="tahun"
                        checked={tahunIdx === i}
                        onChange={() => setTahunIdx(i)}
                        style={{
                          accentColor: "var(--color-warm-red)",
                        }}
                      />
                      <span>{t.label}</span>
                    </label>
                  ))}
                </div>
              </FilterGroup>

              <Button
                className="w-full mt-5 rounded-pill text-white"
                style={{ backgroundColor: "var(--color-warm-red)" }}
              >
                <Filter className="h-4 w-4 mr-1" /> Terapkan Filter
              </Button>
            </aside>

            {/* Result masonry */}
            <div>
              {filtered.length === 0 ? (
                <div
                  className="rounded-card bg-white p-10 text-center shadow-card"
                  style={{ border: "1px solid var(--color-line-soft)" }}
                >
                  <h3 className="font-heading mb-2">Tidak ada hasil</h3>
                  <p className="text-ink-muted text-sm">
                    Coba ubah kata kunci atau hapus beberapa filter.
                  </p>
                </div>
              ) : (
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 350: 1, 900: 2 }}
                >
                  <Masonry gutter="20px">
                    {filtered.map((d) => (
                      <DocCard
                        key={d.id}
                        doc={d}
                        onOpen={onOpenDoc ?? (() => {})}
                        query={searchQuery}
                        isSaved={savedIds.includes(d.id)}
                        onToggleSave={onToggleSave}
                      />
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===== Masonry: Recent + topics + edu ===== */}
      {!searchQuery && (
        <section className="mx-auto max-w-7xl px-6 py-14">
        <SectionHeader
          eyebrow="Konten Pilihan"
          title="Dokumen, Topik &amp; Edukasi Hukum"
          subtitle="Tata letak masonry membantu menampilkan beragam konten secara terstruktur dan padat informasi."
        />

        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 720: 2, 1100: 3 }}
        >
          <Masonry gutter="20px">
            {/* Topic card */}
            <TopicCard
              title="Sedang Banyak Dicari"
              icon={TrendingUp}
              items={[
                "Aturan denda telat bayar kos",
                "Hak karyawan saat di-PHK",
                "Perceraian dan hak asuh anak",
                "Sengketa tanah warisan",
                "Hukuman penyebaran data pribadi",
              ]}
              onClick={handleFilterClick}
            />

            {recent.slice(0, 2).map((d) => (
              <DocCard
                key={d.id}
                doc={d}
                onOpen={onOpenDoc ?? (() => {})}
                isSaved={savedIds.includes(d.id)}
                onToggleSave={onToggleSave}
              />
            ))}

            <EduCard
              tag="Edukasi"
              title="Apa itu Klausula Baku dalam Kontrak?"
              body="Pelajari batasan klausula baku menurut UU Perlindungan Konsumen agar Anda tidak tertipu dalam menandatangani perjanjian."
              cta="Baca Artikel"
            />

            {recent.slice(2, 4).map((d) => (
              <DocCard
                key={d.id}
                doc={d}
                onOpen={onOpenDoc ?? (() => {})}
                isSaved={savedIds.includes(d.id)}
                onToggleSave={onToggleSave}
              />
            ))}

            <QuoteCard
              quote="Hukum bukan untuk dihafal, tetapi untuk dipahami dan dijalankan."
              author="— Filosofi SatuHukum"
            />

            {recent.slice(4, 6).map((d) => (
              <DocCard
                key={d.id}
                doc={d}
                onOpen={onOpenDoc ?? (() => {})}
                isSaved={savedIds.includes(d.id)}
                onToggleSave={onToggleSave}
              />
            ))}

            <EduCard
              tag="Update Regulasi"
              title="UU KUHP Nasional Mulai Berlaku 2026"
              body="Ringkasan perubahan utama dari KUHP lama ke KUHP Nasional yang efektif berlaku Januari 2026."
              cta="Lihat Ringkasan"
            />
          </Masonry>
        </ResponsiveMasonry>
      </section>
      )}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <p
        className="text-xs uppercase tracking-[0.18em] mb-2"
        style={{ color: "var(--color-warm-red)" }}
      >
        {eyebrow}
      </p>
      <h2
        className="font-heading mb-2"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p
          className="text-ink-muted max-w-2xl"
          style={{ fontSize: "0.95rem" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function TopicCard({
  title,
  icon: Icon,
  items,
  onClick,
}: {
  title: string;
  icon: any;
  items: string[];
  onClick: (s: string) => void;
}) {
  return (
    <div
      className="w-full rounded-card p-4 shadow-card sm:p-5"
      style={{
        backgroundColor: "var(--color-beige-soft)",
        border: "1px solid var(--color-line-soft)",
      }}
    >
      <div className="mb-3 flex items-center gap-2 sm:mb-4">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-pill text-white sm:h-9 sm:w-9"
          style={{ backgroundColor: "var(--color-warm-red)" }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <h3
          className="font-heading min-w-0 leading-tight"
          style={{ fontSize: "clamp(1rem, 4.4vw, 1.1rem)" }}
        >
          {title}
        </h3>
      </div>
      <ul className="space-y-1.5 sm:space-y-2">
        {items.map((it, i) => (
          <li key={it}>
            <button
              onClick={() => onClick(it)}
              className="grid w-full grid-cols-[2rem_1fr] items-start gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-ink transition hover:bg-white active:bg-white sm:grid-cols-[2.25rem_1fr] sm:gap-3 sm:px-3"
            >
              <span
                className="font-heading text-center leading-6 text-warm-red"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 leading-6">{it}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EduCard({
  tag,
  title,
  body,
  cta,
}: {
  tag: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div
      className="rounded-card p-6 shadow-card"
      style={{
        backgroundColor: "#fff",
        border: "1px solid var(--color-line-soft)",
      }}
    >
      <span
        className="inline-block text-xs px-2 py-0.5 rounded-pill mb-3"
        style={{
          backgroundColor: "var(--color-warm-red-soft)",
          color: "var(--color-maroon)",
        }}
      >
        {tag}
      </span>
      <h3
        className="font-heading mb-2"
        style={{ fontSize: "1.2rem" }}
      >
        {title}
      </h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        {body}
      </p>
      <button className="text-sm inline-flex items-center gap-1 text-warm-red hover:underline">
        {cta} <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function QuoteCard({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) {
  return (
    <div
      className="rounded-card p-6 shadow-card text-center"
      style={{
        backgroundColor: "var(--color-warm-red)",
        color: "#fff",
      }}
    >
      <p
        className="font-heading italic"
        style={{ fontSize: "1.25rem", lineHeight: 1.4 }}
      >
        &quot;{quote}&quot;
      </p>
      <p className="mt-3 text-sm opacity-90">{author}</p>
    </div>
  );
}

function MarqueeItem({ text }: { text: string }) {
  return (
    <span
      className="text-sm"
      style={{ color: "var(--color-beige)" }}
    >
      {text}
    </span>
  );
}

function FilterGroup({
  title,
  children,
  last,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className="py-4"
      style={{
        borderBottom: last ? "none" : "1px solid var(--color-line-soft)",
      }}
    >
      <p
        className="text-xs uppercase tracking-wider mb-3"
        style={{ color: "var(--color-maroon)" }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}
