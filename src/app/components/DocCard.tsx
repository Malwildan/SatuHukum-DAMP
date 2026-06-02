import { Bookmark, ExternalLink, FileText } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { Dokumen } from "../data/mockData";

interface DocCardProps {
  doc: Dokumen;
  onOpen: (d: Dokumen) => void;
  query?: string;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
}

const statusStyle = (s: Dokumen["status"]) => {
  switch (s) {
    case "Berlaku":
      return { backgroundColor: "#e9f5ec", color: "#1f7a3a" };
    case "Diubah":
      return { backgroundColor: "#fdf2e0", color: "#a05a00" };
    case "Dicabut":
      return {
        backgroundColor: "var(--color-warm-red-soft)",
        color: "var(--color-maroon)",
      };
  }
};

function highlight(text: string, query?: string) {
  if (!query) return text;
  const terms = query.split(/\s+/).filter((t) => t.length > 2);
  if (!terms.length) return text;
  const re = new RegExp(`(${terms.join("|")})`, "gi");
  const parts = text.split(re);
  return parts.map((p, i) =>
    re.test(p) ? (
      <mark
        key={i}
        style={{
          backgroundColor: "var(--color-warm-red-soft)",
          color: "var(--color-maroon)",
          padding: "0 2px",
          borderRadius: "3px",
        }}
      >
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

export function DocCard({ doc, onOpen, query, isSaved, onToggleSave }: DocCardProps) {
  return (
    <article
      className="group rounded-card bg-white shadow-card hover:shadow-card-hover transition-all overflow-hidden flex flex-col"
      style={{ border: "1px solid var(--color-line-soft)" }}
    >
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              className="rounded-pill px-2.5 py-0.5 border-0 text-white"
              style={{ backgroundColor: "var(--color-maroon)" }}
            >
              {doc.jenis}
            </Badge>
            <Badge
              className="rounded-pill px-2.5 py-0.5 border-0"
              style={statusStyle(doc.status)}
            >
              {doc.status}
            </Badge>
            <span className="text-xs text-ink-muted">{doc.tahun}</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSave?.(doc.id);
            }}
            data-doc-id={doc.id}
            data-saved={isSaved ? "true" : "false"}
            className="shrink-0 grid place-items-center h-8 w-8 rounded-pill hover:bg-beige-soft transition-colors"
            aria-label={isSaved ? "Hapus dari tersimpan" : "Simpan dokumen"}
            style={
              isSaved
                ? { backgroundColor: "var(--color-warm-red)" }
                : undefined
            }
          >
            <Bookmark
              className="h-4 w-4"
              style={{
                color: isSaved ? "#fff" : "var(--color-maroon)",
                fill: isSaved ? "#fff" : "transparent",
              }}
            />
          </button>
        </div>

        <div>
          <h3 className="font-heading mb-1" style={{ fontSize: "1.15rem", lineHeight: 1.25 }}>
            {doc.judul}
          </h3>
          <p className="text-sm text-ink-muted italic">{doc.tentang}</p>
        </div>

        <p className="text-sm text-ink leading-relaxed">
          {highlight(doc.snippet, query)}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {doc.kategori.slice(0, 3).map((k) => (
            <span
              key={k}
              className="text-xs px-2 py-0.5 rounded-pill bg-beige-soft text-maroon"
              style={{ border: "1px solid var(--color-line-soft)" }}
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      <div
        className="px-5 py-3 flex items-center justify-between gap-3"
        style={{
          borderTop: "1px solid var(--color-line-soft)",
          backgroundColor: "var(--color-beige-soft)",
        }}
      >
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <FileText className="h-3.5 w-3.5" />
          <span>{doc.nomor}</span>
          {doc.relevansi !== undefined && (
            <span
              className="ml-2 px-2 py-0.5 rounded-pill text-white"
              style={{ backgroundColor: "var(--color-warm-red)", fontSize: "10px" }}
            >
              Relevansi {doc.relevansi}%
            </span>
          )}
        </div>
        <Button
          size="sm"
          onClick={() => onOpen(doc)}
          className="rounded-pill text-white"
          style={{ backgroundColor: "var(--color-maroon)" }}
        >
          Baca <ExternalLink className="h-3.5 w-3.5 ml-1" />
        </Button>
      </div>
    </article>
  );
}
