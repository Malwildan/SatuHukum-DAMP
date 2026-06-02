import { useMemo } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import {
  ArrowLeft,
  Bookmark,
  Download,
  Copy,
  Share2,
  Building2,
  Calendar,
  ChevronRight,
  FileText,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { DocCard } from "./DocCard";
import { dokumenHukum, type Dokumen } from "../data/mockData";

interface Props {
  doc: Dokumen;
  query?: string;
  onBack: () => void;
  onOpenDoc?: (doc: Dokumen) => void;
  isSaved?: boolean;
  savedIds?: string[];
  onToggleSave?: (id: string) => void;
}

export function DocumentViewer({
  doc,
  query,
  onBack,
  onOpenDoc,
  isSaved = false,
  savedIds = [],
  onToggleSave,
}: Props) {
  const related = useMemo(
    () =>
      dokumenHukum
        .filter((d) => d.id !== doc.id)
        .filter((d) => d.kategori.some((k) => doc.kategori.includes(k)))
        .slice(0, 4),
    [doc],
  );

  const allPasal = useMemo(() => {
    const flat: { babJudul: string; nomor: string; judul?: string; highlight?: boolean }[] = [];
    doc.bab.forEach((b) => {
      const list = b.pasal ?? b.bagian?.flatMap((s) => s.pasal) ?? [];
      list.forEach((p) =>
        flat.push({ babJudul: b.judul, nomor: p.nomor, judul: p.judul, highlight: p.highlight }),
      );
    });
    return flat;
  }, [doc]);

  return (
    <div className="bg-beige min-h-screen">
      {/* Breadcrumb + back */}
      <div
        className="py-4"
        style={{
          backgroundColor: "var(--color-beige-soft)",
          borderBottom: "1px solid var(--color-line-soft)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <button onClick={onBack} className="hover:text-warm-red">
              Dokumen
            </button>
            <ChevronRight className="h-3 w-3" />
            <span style={{ color: "var(--color-maroon)" }}>{doc.nomor}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="rounded-pill"
            style={{
              borderColor: "var(--color-line)",
              color: "var(--color-maroon)",
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Kembali
          </Button>
        </div>
      </div>

      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-6">
        <div
          className="rounded-card p-8 shadow-card relative overflow-hidden"
          style={{
            backgroundColor: "var(--color-maroon)",
            color: "var(--color-beige)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 85% 20%, var(--color-warm-red) 0, transparent 40%)",
            }}
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge
                className="rounded-pill border-0"
                style={{
                  backgroundColor: "var(--color-warm-red)",
                  color: "#fff",
                }}
              >
                {doc.jenis}
              </Badge>
              <Badge
                className="rounded-pill border-0"
                style={{
                  backgroundColor: "var(--color-beige)",
                  color: "var(--color-maroon)",
                }}
              >
                {doc.status}
              </Badge>
              <span className="text-sm opacity-90">{doc.nomor}</span>
            </div>

            <h1
              className="font-heading mb-3"
              style={{ color: "var(--color-beige)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              {doc.tentang}
            </h1>
            <p className="opacity-90 mb-6 max-w-3xl">{doc.snippet}</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6 text-sm">
              <MetaItem icon={Building2} label="Instansi" value={doc.instansi} />
              <MetaItem icon={Calendar} label="Tahun" value={String(doc.tahun)} />
              <MetaItem
                icon={FileText}
                label="Kategori"
                value={doc.kategori.join(", ")}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => onToggleSave?.(doc.id)}
                className="rounded-pill text-white"
                style={{
                  backgroundColor: isSaved
                    ? "var(--color-maroon-deep)"
                    : "var(--color-warm-red)",
                }}
              >
                <Bookmark
                  className="h-4 w-4 mr-1"
                  fill={isSaved ? "currentColor" : "none"}
                />{" "}
                {isSaved ? "Tersimpan" : "Simpan"}
              </Button>
              <Button
                className="rounded-pill"
                style={{
                  backgroundColor: "var(--color-beige)",
                  color: "var(--color-maroon)",
                }}
              >
                <Download className="h-4 w-4 mr-1" /> Unduh PDF
              </Button>
              <Button
                variant="outline"
                className="rounded-pill"
                style={{
                  borderColor: "var(--color-beige)",
                  color: "var(--color-beige)",
                  backgroundColor: "transparent",
                }}
              >
                <Copy className="h-4 w-4 mr-1" /> Salin Kutipan
              </Button>
              <Button
                variant="outline"
                className="rounded-pill"
                style={{
                  borderColor: "var(--color-beige)",
                  color: "var(--color-beige)",
                  backgroundColor: "transparent",
                }}
              >
                <Share2 className="h-4 w-4 mr-1" /> Bagikan
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-6 pb-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        {/* TOC */}
        <aside
          className="rounded-card bg-white p-5 shadow-card h-fit lg:sticky lg:top-24"
          style={{ border: "1px solid var(--color-line-soft)" }}
        >
          <p
            className="text-xs uppercase tracking-wider mb-3"
            style={{ color: "var(--color-maroon)" }}
          >
            Daftar Isi
          </p>
          <ul className="space-y-1.5 max-h-[60vh] overflow-auto pr-2">
            {allPasal.map((p) => (
              <li key={p.nomor}>
                <a
                  href={`#pasal-${p.nomor}`}
                  className="block text-sm rounded-md px-2 py-1.5 hover:bg-beige-soft text-ink"
                  style={{
                    color: p.highlight ? "var(--color-warm-red)" : undefined,
                    fontWeight: p.highlight ? 600 : undefined,
                  }}
                >
                  Pasal {p.nomor}
                  {p.judul && (
                    <span className="block text-xs text-ink-muted truncate">{p.judul}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Articles */}
        <div className="space-y-6">
          {query && (
            <div
              className="rounded-card p-4 flex items-start gap-3"
              style={{
                backgroundColor: "var(--color-warm-red-soft)",
                border: "1px solid var(--color-line-soft)",
              }}
            >
              <Sparkles
                className="h-4 w-4 mt-1 shrink-0"
                style={{ color: "var(--color-warm-red)" }}
              />
              <div className="text-sm text-ink">
                <span className="font-heading text-maroon">Pasal relevan ditemukan</span> berdasarkan
                kueri Anda <span className="italic">“{query}”</span>. Bagian yang disorot di bawah
                dianggap paling sesuai oleh AI semantik.
              </div>
            </div>
          )}

          {doc.bab.map((bab) => {
            const list = bab.pasal ?? bab.bagian?.flatMap((s) => s.pasal) ?? [];
            return (
              <div
                key={bab.id}
                className="rounded-card bg-white p-6 shadow-card"
                style={{ border: "1px solid var(--color-line-soft)" }}
              >
                <p
                  className="text-xs uppercase tracking-wider mb-1"
                  style={{ color: "var(--color-warm-red)" }}
                >
                  BAB {bab.nomor}
                </p>
                <h2 className="font-heading mb-5" style={{ fontSize: "1.5rem" }}>
                  {bab.judul}
                </h2>
                <div className="space-y-5">
                  {list.map((p) => (
                    <article
                      id={`pasal-${p.nomor}`}
                      key={p.id}
                      className="rounded-lg p-5"
                      style={{
                        backgroundColor: p.highlight
                          ? "var(--color-warm-red-soft)"
                          : "var(--color-beige-soft)",
                        borderLeft: p.highlight
                          ? "4px solid var(--color-warm-red)"
                          : "4px solid var(--color-line)",
                      }}
                    >
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3
                          className="font-heading"
                          style={{ fontSize: "1.1rem", color: "var(--color-maroon)" }}
                        >
                          Pasal {p.nomor}
                        </h3>
                        {p.judul && <span className="text-sm text-ink-muted italic">{p.judul}</span>}
                        {p.highlight && (
                          <Badge
                            className="rounded-pill border-0 text-white ml-auto"
                            style={{ backgroundColor: "var(--color-warm-red)" }}
                          >
                            Relevan
                          </Badge>
                        )}
                      </div>
                      <ol className="space-y-2 text-sm text-ink leading-relaxed">
                        {p.ayat.map((a) => (
                          <li key={a.nomor} className="flex gap-3">
                            <span
                              className="shrink-0 font-heading"
                              style={{ color: "var(--color-warm-red)" }}
                            >
                              ({a.nomor})
                            </span>
                            <span>{a.isi}</span>
                          </li>
                        ))}
                      </ol>
                    </article>
                  ))}
                  {list.length === 0 && (
                    <p className="text-sm text-ink-muted italic">
                      Konten pasal belum tersedia dalam pratinjau ini.
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {doc.bab.length === 0 && (
            <div
              className="rounded-card bg-white p-8 text-center shadow-card"
              style={{ border: "1px solid var(--color-line-soft)" }}
            >
              <FileText className="h-8 w-8 mx-auto mb-3 text-warm-red" />
              <h3 className="font-heading mb-1">Isi dokumen sedang dimuat</h3>
              <p className="text-sm text-ink-muted">
                Pratinjau penuh akan tersedia setelah dokumen diindeks oleh sistem.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="mb-6">
            <p
              className="text-xs uppercase tracking-[0.18em] mb-2"
              style={{ color: "var(--color-warm-red)" }}
            >
              Referensi Terkait
            </p>
            <h2 className="font-heading">Dokumen Hukum Serupa</h2>
          </div>
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 720: 2, 1100: 3 }}>
            <Masonry gutter="20px">
              {related.map((d) => (
                <DocCard
                  key={d.id}
                  doc={d}
                  onOpen={onOpenDoc ?? (() => {})}
                  isSaved={savedIds.includes(d.id)}
                  onToggleSave={onToggleSave}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </section>
      )}
    </div>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div
      className="rounded-lg p-3 flex items-start gap-3"
      style={{ backgroundColor: "rgba(241,231,218,0.12)" }}
    >
      <Icon className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "var(--color-beige)" }} />
      <div>
        <p className="text-xs opacity-75">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
}
