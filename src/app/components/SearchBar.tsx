import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, Mic, X, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (q: string) => void;
  size?: "lg" | "md";
  placeholder?: string;
  suggestions?: string[];
}

export function SearchBar({
  initialQuery = "",
  onSearch,
  size = "lg",
  placeholder = "Tanyakan dengan bahasa sehari-hari, contoh: aturan denda telat bayar kos…",
  suggestions = [],
}: SearchBarProps) {
  const [value, setValue] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  useEffect(() => setValue(initialQuery), [initialQuery]);

  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDropdownStyle({
          position: "fixed",
          top: `${rect.bottom + 8}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          zIndex: 9999,
        });
      }
    };

    if (focused) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);

      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }
  }, [focused]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        focused &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [focused]);

  const submit = (q?: string) => {
    const v = (q ?? value).trim();
    if (v) onSearch(v);
  };

  const isLg = size === "lg";

  return (
    <div ref={containerRef} className="w-full relative">
      <div
        className="flex items-stretch gap-2 bg-white rounded-pill shadow-float pl-5 pr-2 transition"
        style={{
          border: "1px solid var(--color-line)",
          paddingTop: isLg ? "0.55rem" : "0.35rem",
          paddingBottom: isLg ? "0.55rem" : "0.35rem",
        }}
      >
        <Search
          className="self-center shrink-0"
          style={{
            color: "var(--color-warm-red)",
            height: isLg ? 22 : 18,
            width: isLg ? 22 : 18,
          }}
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit();
            } else if (e.key === "Escape") {
              setFocused(false);
            }
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-ink placeholder:text-ink-muted"
          style={{
            fontSize: isLg ? "1.05rem" : "0.95rem",
            fontFamily: "var(--font-body)",
          }}
        />
        {value && (
          <button
            onClick={() => setValue("")}
            className="self-center grid place-items-center h-8 w-8 rounded-pill hover:bg-beige-soft"
            aria-label="Hapus"
          >
            <X className="h-4 w-4 text-ink-muted" />
          </button>
        )}
        <button
          className="self-center grid place-items-center h-9 w-9 rounded-pill hover:bg-beige-soft"
          aria-label="Voice input"
        >
          <Mic className="h-4 w-4 text-maroon" />
        </button>
        <Button
          onClick={() => submit()}
          className="rounded-pill px-5 text-white"
          style={{ backgroundColor: "var(--color-warm-red)" }}
        >
          <Sparkles className="h-4 w-4 mr-1" />
          Cari
        </Button>
      </div>

      {focused && suggestions.length > 0 &&
        createPortal(
          <div
            className="bg-white rounded-card shadow-float p-2"
            style={{
              ...dropdownStyle,
              border: "1px solid var(--color-line)",
            }}
          >
            <p className="px-3 pt-2 pb-1 text-xs text-ink-muted uppercase tracking-wide">
              Contoh pertanyaan
            </p>
            {suggestions.map((s) => (
              <button
                key={s}
                onMouseDown={() => submit(s)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-beige-soft flex items-center gap-2 text-ink"
              >
                <Search className="h-4 w-4 text-warm-red" />
                {s}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
