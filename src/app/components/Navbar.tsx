import { useState } from "react";
import { Scale, Search, FileText, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

type View = "home" | "results" | "document" | "saved";

interface NavbarProps {
  currentView: View;
  onNavigate: (v: View) => void;
  savedCount?: number;
}

const navItems: { label: string; view: View; icon: any }[] = [
  { label: "Cari Dokumen", view: "home", icon: Search },
  { label: "Dokumen", view: "saved", icon: FileText },
];

export function Navbar({ currentView, onNavigate, savedCount = 0 }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (view: View) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-maroon text-white shadow-float">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-6">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 group"
        >
          <span className="grid place-items-center h-10 w-10 rounded-pill bg-warm-red text-white shadow-card">
            <Scale className="h-5 w-5" />
          </span>
          <span className="text-left leading-tight">
            <span
              className="block font-heading text-xl"
              style={{ color: "var(--color-beige)" }}
            >
              SatuHukum
            </span>
            <span
              className="block text-xs"
              style={{ color: "var(--color-beige-deep)" }}
            >
              Sistem Manajemen Dokumen Hukum Nasional
            </span>
          </span>
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map(({ label, view, icon: Icon }) => {
              const active =
                view === "home"
                  ? currentView === "home" ||
                    currentView === "results" ||
                    currentView === "document"
                  : currentView === view;
              return (
                <button
                  key={view}
                  onClick={() => onNavigate(view)}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-pill text-sm transition-colors"
                  style={{
                    backgroundColor: active
                      ? "var(--color-warm-red)"
                      : "transparent",
                    color: active ? "#fff" : "var(--color-beige)",
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {view === "saved" && savedCount > 0 && (
                    <span
                      className="ml-1 grid place-items-center min-w-5 h-5 px-1.5 rounded-pill text-xs"
                      style={{
                        backgroundColor: active
                          ? "#fff"
                          : "var(--color-warm-red)",
                        color: active ? "var(--color-warm-red)" : "#fff",
                      }}
                    >
                      {savedCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden grid place-items-center h-10 w-10 rounded-pill text-white"
            style={{ backgroundColor: "var(--color-maroon-deep)" }}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="right"
          className="w-[300px] sm:w-[400px] bg-maroon text-white border-l border-warm-red/20"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3">
              <span className="grid place-items-center h-10 w-10 rounded-pill bg-warm-red text-white shadow-card">
                <Scale className="h-5 w-5" />
              </span>
              <span className="text-left leading-tight">
                <span
                  className="block font-heading text-xl"
                  style={{ color: "var(--color-beige)" }}
                >
                  SatuHukum
                </span>
              </span>
            </SheetTitle>
          </SheetHeader>

          <nav className="mt-8 space-y-2">
            {navItems.map(({ label, view, icon: Icon }) => {
              const active =
                view === "home"
                  ? currentView === "home" ||
                    currentView === "results" ||
                    currentView === "document"
                  : currentView === view;
              return (
                <button
                  key={view}
                  onClick={() => handleNavigate(view)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    active ? "rounded-none" : "rounded-2xl"
                  }`}
                  style={{
                    backgroundColor: active
                      ? "var(--color-warm-red)"
                      : "transparent",
                    color: active ? "#fff" : "var(--color-beige)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="flex-1">{label}</span>
                  {view === "saved" && savedCount > 0 && (
                    <span
                      className="grid place-items-center min-w-6 h-6 px-2 rounded-pill text-xs font-medium"
                      style={{
                        backgroundColor: active
                          ? "#fff"
                          : "var(--color-warm-red)",
                        color: active ? "var(--color-warm-red)" : "#fff",
                      }}
                    >
                      {savedCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 pt-8 border-t border-warm-red/20">
            <p className="text-xs text-beige-deep px-4 mb-3 uppercase tracking-wide">
              Tentang
            </p>
            <div className="px-4 space-y-2 text-sm" style={{ color: "var(--color-beige)" }}>
              <p>Sistem Manajemen Dokumen Hukum Nasional</p>
              <p className="text-xs opacity-75">
                Akses mudah ke ribuan dokumen hukum Indonesia
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
