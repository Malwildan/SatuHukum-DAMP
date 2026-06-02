import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { SearchResultsPage } from "./components/SearchResultsPage";
import { DocumentViewer } from "./components/DocumentViewer";
import { SavedDocumentsPage } from "./components/SavedDocumentsPage";
import { dokumenHukum } from "./data/mockData";
import type { Dokumen } from "./data/mockData";

type View = "home" | "results" | "document" | "saved";
type SearchRouteState = {
  breadcrumbRootLabel?: string;
  breadcrumbRootPath?: string;
};

function getStoredSavedIds() {
  try {
    const stored = window.localStorage.getItem("satuhukum-saved-docs");
    if (stored) return JSON.parse(stored) as string[];
  } catch {
    // Keep demo defaults when storage is unavailable.
  }

  return [dokumenHukum[0]?.id, dokumenHukum[2]?.id].filter(Boolean) as string[];
}

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [savedIds, setSavedIds] = useState<string[]>(getStoredSavedIds);

  const searchQuery = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("q") ?? "";
  }, [location.search]);
  const searchRouteState = location.state as SearchRouteState | null;

  const currentView: View = useMemo(() => {
    if (location.pathname.startsWith("/documents/")) return "document";
    if (location.pathname === "/documents") return "saved";
    if (location.pathname === "/search") return "results";
    return "home";
  }, [location.pathname]);

  useEffect(() => {
    window.localStorage.setItem("satuhukum-saved-docs", JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.search]);

  const goToSearch = (query: string) => {
    const trimmed = query.trim();
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/");
  };

  const goToDocumentSearch = (query: string) => {
    const trimmed = query.trim();
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/documents", {
      state: {
        breadcrumbRootLabel: "Dokumen",
        breadcrumbRootPath: "/documents",
      },
    });
  };

  const openDoc = (doc: Dokumen, query = searchQuery) => {
    const suffix = query ? `?q=${encodeURIComponent(query)}` : "";
    navigate(`/documents/${doc.id}${suffix}`, {
      state: { from: `${location.pathname}${location.search}`, query },
    });
  };

  const handleNavigate = (view: View) => {
    if (view === "home") {
      navigate("/");
      return;
    }

    if (view === "saved") {
      navigate("/documents");
      return;
    }

    if (view === "results") {
      goToSearch(searchQuery || "hukum sewa menyewa kos");
      return;
    }

    navigate(`/documents/${dokumenHukum[1]?.id ?? dokumenHukum[0]?.id}`);
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-beige min-h-screen">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        savedCount={savedIds.length}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onSearch={goToSearch}
              onFilterClick={goToSearch}
              onOpenDoc={(doc) => openDoc(doc, searchQuery)}
              savedIds={savedIds}
              onToggleSave={toggleSave}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchResultsPage
              query={searchQuery || "hukum sewa menyewa kos"}
              onSearch={goToSearch}
              onOpenDoc={(doc) => openDoc(doc, searchQuery)}
              savedIds={savedIds}
              onToggleSave={toggleSave}
              breadcrumbRootLabel={searchRouteState?.breadcrumbRootLabel}
              breadcrumbRootPath={searchRouteState?.breadcrumbRootPath}
            />
          }
        />
        <Route
          path="/documents"
          element={
            <SavedDocumentsPage
              savedIds={savedIds}
              selectedDoc={null}
              onOpenDoc={(doc) => openDoc(doc)}
              onCloseDoc={() => navigate("/documents")}
              onToggleSave={toggleSave}
              onClearAll={() => setSavedIds([])}
              onBrowse={() => navigate("/")}
              onFilterClick={goToDocumentSearch}
            />
          }
        />
        <Route
          path="/documents/:docId"
          element={
            <DocumentRoute
              fallbackQuery={searchQuery}
              onOpenDoc={openDoc}
              savedIds={savedIds}
              onToggleSave={toggleSave}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function DocumentRoute({
  fallbackQuery,
  onOpenDoc,
  savedIds,
  onToggleSave,
}: {
  fallbackQuery: string;
  onOpenDoc: (doc: Dokumen, query?: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}) {
  const { docId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const doc = dokumenHukum.find((item) => item.id === docId);
  const state = location.state as { from?: string; query?: string } | null;
  const query = fallbackQuery || state?.query || "";

  if (!doc) return <Navigate to="/documents" replace />;

  const handleBack = () => {
    if (state?.from) {
      navigate(state.from);
      return;
    }

    navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/documents");
  };

  return (
    <DocumentViewer
      doc={doc}
      query={query}
      onBack={handleBack}
      onOpenDoc={(relatedDoc) => onOpenDoc(relatedDoc, query)}
      isSaved={savedIds.includes(doc.id)}
      savedIds={savedIds}
      onToggleSave={onToggleSave}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
