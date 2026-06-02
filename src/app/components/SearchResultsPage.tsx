import { useMemo, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Filter, SlidersHorizontal, ChevronRight, X } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { DocCard } from "./DocCard";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  dokumenHukum,
  tahunFilter,
  quickFilters,
  type Dokumen,
} from "../data/mockData";

interface Props {
  query: string;
  onSearch: (q: string) => void;
  onOpenDoc: (d: Dokumen) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  breadcrumbRootLabel?: string;
  breadcrumbRootPath?: string;
}

export function SearchResultsPage({
  query,
  onSearch,
  onOpenDoc,
  savedIds,
  onToggleSave,
  breadcrumbRootLabel = "Beranda",
  breadcrumbRootPath = "/",
}: Props) {
  const [jenis, setJenis] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [tahunIdx, setTahunIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return dokumenHukum
      .filter((d) => (jenis.length ? jenis.includes(d.jenis) : true))
      .filter((d) => (status.length ? status.includes(d.status) : true))
      .filter((d) => {
        if (tahunIdx === null) return true;
        const t = tahunFilter[tahunIdx];
        return d.tahun >= t.min && d.tahun <= t.max;
      })
      .sort((a, b) => (b.relevansi ?? 0) - (a.relevansi ?? 0));
  }, [jenis, status, tahunIdx]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const clearAll = () => {
    setJenis([]);
    setStatus([]);
    setTahunIdx(null);
  };

  const activeCount = jenis.length + status.length + (tahunIdx !== null ? 1 : 0);

  return (
    <div className="bg-beige min-h-screen">
      {/* Sub-hero / query bar */}
      <section
        className="py-8"
        style={{
          backgroundColor: "var(--color-beige-soft)",
          borderBottom: "1px solid var(--color-line-soft)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-2 text-xs text-ink-muted mb-3">
            <a href={breadcrumbRootPath} className="hover:text-warm-red transition-colors">
              {breadcrumbRootLabel}
            </a>
            <ChevronRight className="h-3 w-3" />
            <span style={{ color: "var(--color-maroon)" }}>Hasil Pencarian</span>
          </div>
          <h1 className="font-heading mb-1" style={{ fontSize: "1.875rem" }}>
            {filtered.length} dokumen ditemukan
          </h1>
          <p className="text-ink-muted mb-5">
            Untuk kueri:{" "}
            <span style={{ color: "var(--color-warm-red)" }}>“{query}”</span>
          </p>
          <SearchBar initialQuery={query} onSearch={onSearch} size="md" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Filter sidebar */}
        <aside
          className="rounded-card bg-white p-5 shadow-card h-fit lg:sticky lg:top-24"
          style={{ border: "1px solid var(--color-line-soft)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-warm-red" />
              <h3 className="font-heading" style={{ fontSize: "1.05rem" }}>
                Filter
              </h3>
              {activeCount > 0 && (
                <Badge
                  className="rounded-pill border-0 text-white"
                  style={{ backgroundColor: "var(--color-warm-red)" }}
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
                <label key={j} className="flex items-center gap-2 cursor-pointer text-sm">
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
                <label key={s} className="flex items-center gap-2 cursor-pointer text-sm">
                  <Checkbox
                    checked={status.includes(s)}
                    onCheckedChange={() => toggle(status, setStatus, s)}
                  />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Tahun" last>
            <div className="space-y-2">
              {tahunFilter.map((t, i) => (
                <label key={t.label} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="tahun"
                    checked={tahunIdx === i}
                    onChange={() => setTahunIdx(i)}
                    style={{ accentColor: "var(--color-warm-red)" }}
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
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 900: 2 }}>
              <Masonry gutter="20px">
                {filtered.map((d) => (
                  <DocCard
                    key={d.id}
                    doc={d}
                    onOpen={onOpenDoc}
                    query={query}
                    isSaved={savedIds.includes(d.id)}
                    onToggleSave={onToggleSave}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
        </div>
      </section>
    </div>
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
