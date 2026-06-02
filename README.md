# SatuHukum DAMP

SatuHukum DAMP is a React prototype for an Indonesian legal document search and reading experience. It lets users search everyday legal questions, browse regulation categories, filter document results, open document detail pages, and save useful documents for later.

The current project is a frontend-only demo based on local mock data in `src/app/data/mockData.ts`. It does not connect to a backend API yet, so search results, document content, categories, and saved-document defaults are all driven by the bundled sample data.

Original design reference: https://www.figma.com/design/01GGTDp7kPRfj0pkzTIHy6/satu-hukum---damp

## Features

- Home page with semantic-search-style prompts and quick regulation filters.
- Search results page with filters for regulation type, status, and year range.
- Document viewer with metadata, highlighted relevant articles, table of contents, and related documents.
- Saved documents page for bookmarked legal documents.
- Saved document state persisted in browser `localStorage`.
- Responsive masonry layouts for document cards and content sections.

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS 4
- Radix UI primitives
- Lucide React icons
- React Responsive Masonry

## Prerequisites

Install Node.js and npm before running the project. A current LTS version of Node.js is recommended.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173/
```

Open that URL in your browser to use the app.

## Available Scripts

Run the local development server:

```bash
npm run dev
```

Build the production bundle into `dist/`:

```bash
npm run build
```

Preview the production build locally:

```bash
npx vite preview
```

## Project Structure

```text
src/
  app/
    App.tsx                    Application routes and saved-document state
    components/                Page and UI components
    data/mockData.ts           Demo legal document data and filter metadata
  styles/                      Global styles, fonts, theme, and Tailwind entry
index.html                     Vite HTML entry point
vite.config.ts                 Vite configuration
```

## Main Routes

- `/` - Home page with search, quick filters, featured documents, and topic cards.
- `/search?q=...` - Search results with filters and document cards.
- `/documents` - Saved documents and legal category browsing.
- `/documents/:docId` - Document detail viewer.

## Notes

- The app is currently a static frontend prototype.
- Search behavior is simulated with local data and relevance values.
- Saved documents are stored under the `satuhukum-saved-docs` key in browser `localStorage`.
- Some document actions, such as PDF download, copy citation, and share, are UI placeholders.
