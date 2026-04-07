# Notion Workspace Backup

## 1. Project Overview

This project is a Node.js backup utility that exports selected Notion workspaces/pages into a local Markdown knowledge base.

It solves a common problem for personal notes and learning repositories: Notion content is convenient to write, but hard to version-control, browse offline, or archive in a portable format.

Key features implemented in this codebase:

- Backs up multiple configured root Notion pages in one run.
- Recursively exports nested child pages into matching folder structures.
- Converts Notion block content to Markdown (headings, lists, checkboxes, code blocks, dividers, tables).
- Downloads image and file assets locally under a shared assets directory.
- Collects external hyperlinks as a references section for cleaner reading.
- Detects child databases, exports database schema, and exports each row/page as Markdown.
- Handles Notion pagination for both blocks and database queries.

## 2. Architecture & Flow

### High-Level Design

The app is a script-first exporter with a modular pipeline:

- Entry orchestration: [src/index.js](src/index.js)
- Root source configuration: [src/config/rootPages.js](src/config/rootPages.js)
- Notion API client/pagination: [src/notion/client.js](src/notion/client.js), [src/notion/fetchAllBlocks.js](src/notion/fetchAllBlocks.js)
- Content parsing and recursion: [src/parser/parsePage.js](src/parser/parsePage.js)
- Specialized exporters:
- Assets: [src/exporters/assets.js](src/exporters/assets.js)
- Generic files: [src/files/fileHandler.js](src/files/fileHandler.js)
- Databases: [src/database/databaseExporter.js](src/database/databaseExporter.js)
- Table/rich text utilities: [src/tables/tableParser.js](src/tables/tableParser.js), [src/utils/richTextToMarkdown.js](src/utils/richTextToMarkdown.js)

### Data Flow (Step-by-Step)

1. [src/index.js](src/index.js) loads configured root pages and creates base backup folders in backups.
2. For each root page, it calls parsePage(pageId, folderPath).
3. parsePage fetches all top-level blocks via [src/notion/fetchAllBlocks.js](src/notion/fetchAllBlocks.js).
4. Each block is transformed by block type:

- Text blocks -> Markdown via richTextToMarkdown.
- Image/file-like blocks -> download to backups/assets, then embed/link in Markdown.
- Table blocks -> converted to Markdown table rows.
- Child page blocks -> recurse into a new subfolder and parse again.
- Child database blocks -> call database exporter.

5. Child blocks are recursively fetched for supported parent block types.
6. Page output is written as README.md inside the page folder.
7. If links were found in rich text, a final References section is appended.
8. When child databases are encountered:

- Schema is saved to backups/databases/<database-name>/schema.json
- Each database row is exported by reusing the same parsePage pipeline.

### Component Interaction Summary

- Orchestrator ([src/index.js](src/index.js)) controls which roots are backed up.
- Parser ([src/parser/parsePage.js](src/parser/parsePage.js)) is the core engine and delegates responsibilities.
- Notion adapters ([src/notion/\*](src/notion/client.js)) isolate API access and pagination.
- Exporter modules isolate I/O concerns (assets/files/databases).
- Utility modules normalize text and safe naming for filesystem output.

## 3. Tech Stack (with Why)

- Node.js (ESM modules): lightweight scripting runtime, strong filesystem/network APIs, easy automation in CI/cron environments.
- @notionhq/client: official Notion SDK, reduces API boilerplate and ensures stable access to pages/blocks/databases.
- dotenv: standard, simple local secret loading through .env without hardcoding tokens.
- node-fetch: explicit fetch client for predictable file/asset downloads and AbortController timeout handling.
- Native fs/path modules: direct control of folder creation and deterministic output paths.
- Markdown output format: portable, diff-friendly, Git-friendly, and easy to browse in any editor.

## 4. Setup & Installation

### Prerequisites

- Node.js 18+ (recommended). The lockfile indicates @notionhq/client requires Node >=18.
- npm
- A Notion internal integration token with access to the target pages/databases.

### Environment Variables

Create a .env file in the repository root:

```env
NOTION_TOKEN="your_notion_integration_token"
```

Variable used by the app:

- NOTION_TOKEN: read in [src/notion/client.js](src/notion/client.js) to authenticate all Notion API calls.

### Installation Steps

1. Install dependencies:

```bash
npm install
```

2. Add your token in .env.

3. Ensure your Notion pages are shared with the integration.

4. Update root pages to back up in [src/config/rootPages.js](src/config/rootPages.js).

### Run Locally

```bash
node src/index.js
```

Output is written under backups/.

## 5. How the Backup System Works

The backup logic is content-first and recursive:

- Entry point loops ROOT_PAGES and triggers parsePage for each root.
- parsePage fetches blocks in paginated batches (100 per request).
- Block parser maps Notion block types to Markdown fragments.
- Assets and attachments are downloaded with retry + timeout.
- Nested pages recurse into subfolders, preserving hierarchy.
- Databases are exported when encountered as child_database blocks:
- schema.json stores properties metadata.
- entries/<row-title>/README.md stores row content.

Reliability behavior currently implemented:

- Asset/file download retries: 3 attempts with 2s delay.
- Download timeout: 15s per request.
- On repeated download failure: item is skipped, backup continues.

Scheduling/automation status:

- No built-in scheduler is present in this repository.
- Backups are currently manual command executions.

## 6. Folder Structure

```text
.
├─ src/
│  ├─ index.js                  # backup runner (orchestrates configured roots)
│  ├─ config/
│  │  └─ rootPages.js           # list of root Notion page IDs/names to export
│  ├─ notion/
│  │  ├─ client.js              # Notion SDK client initialization
│  │  └─ fetchAllBlocks.js      # paginated block retrieval helper
│  ├─ parser/
│  │  └─ parsePage.js           # core block parsing + recursion + markdown writing
│  ├─ exporters/
│  │  └─ assets.js              # image downloader
│  ├─ files/
│  │  └─ fileHandler.js         # non-image attachment downloader
│  ├─ tables/
│  │  └─ tableParser.js         # Notion table -> markdown table conversion
│  ├─ database/
│  │  └─ databaseExporter.js    # child database export (schema + entries)
│  └─ utils/
│     ├─ richTextToMarkdown.js  # rich text annotation conversion + link collection
│     ├─ sanitizeName.js        # filesystem-safe folder names
│     ├─ text.js                # plain_text extraction helper
│     └─ pathHelper.js          # asset prefix helper (currently unused)
├─ backups/                     # generated output (markdown + assets)
├─ .env                         # local token (gitignored)
└─ package.json
```

## 7. Usage Guide

Typical workflow:

1. Configure token in .env.
2. Add/update root pages in [src/config/rootPages.js](src/config/rootPages.js).
3. Run exporter.
4. Review generated Markdown in backups/.
5. Commit backups to Git if desired.

Minimal command workflow:

```bash
npm install
node src/index.js
```

## 8. Adding a New Notion Page or Database (Important)

### A) Add a New Root Page for Backup

1. In Notion, open the page you want to back up.
2. Share that page with your integration.
3. Copy page ID from the URL.
4. Add a new object in [src/config/rootPages.js](src/config/rootPages.js):

```js
export const ROOT_PAGES = [
  {
    id: "2a20eb7a3bc380b4afc7ece03efd0bbe",
    name: "DSA Notes",
  },
  {
    id: "aaaaaaaa111122223333444455556666",
    name: "System Design Notes",
  },
];
```

5. Run backup:

```bash
node src/index.js
```

6. Verify output:

- backups/System Design Notes/README.md

### B) Add a Database for Backup

Current implementation exports databases when they appear as child_database blocks inside pages being parsed.

How to trigger it:

1. Ensure the database is embedded/linked as a child database within one of the configured root pages (or its descendants).
2. Ensure integration access covers that database.
3. Run:

```bash
node src/index.js
```

4. Verify output:

- backups/databases/<DatabaseTitle>/schema.json
- backups/databases/<DatabaseTitle>/entries/<RowTitle>/README.md

### Required Configuration Checklist

- .env contains NOTION_TOKEN.
- [src/config/rootPages.js](src/config/rootPages.js) contains correct page IDs.
- Target pages/databases are shared with the integration.

## 9. Edge Cases & Limitations

- No incremental sync: each run rewrites markdown snapshots and can overwrite existing generated files.
- No cleanup of deleted Notion content: stale local files can remain.
- No first-class scheduler/daemon/cron integration.
- No structured logging/observability (console logs only).
- No automated tests currently defined.
- Sequential processing can be slow for very large workspaces.
- Attachment filenames use block IDs (non-descriptive names).
- Non-image file extensions are not preserved explicitly in filename generation.
- References section may contain duplicate links; deduping is not implemented.
- [src/utils/pathHelper.js](src/utils/pathHelper.js) and one import in [src/index.js](src/index.js) are currently unused.

## 10. Future Improvements

- Add npm scripts (backup, backup:verbose, lint, test) for easier operation.
- Add CLI flags (target page, output directory, include/exclude types).
- Add incremental mode using page last_edited_time and manifest tracking.
- Add robust rate-limit handling and exponential backoff for Notion API calls.
- Add parallel download queue with configurable concurrency.
- Preserve original attachment filenames/extensions when possible.
- Add deduplication for references and assets.
- Add tests for parser behavior and markdown output snapshots.
- Add scheduling templates (GitHub Actions, cron, Windows Task Scheduler).

## 11. Developer Notes (Interview Focus)

Design decisions:

- Recursive parser model: simple mental model, naturally maps to hierarchical Notion content.
- Modular boundary between parsing and I/O: keeps core transformation logic readable and extensible.
- Markdown-first export: prioritizes portability and Git friendliness over perfect Notion fidelity.
- Shared assets directory: avoids per-page asset duplication and keeps repository size lower.

Trade-offs:

- Simplicity over throughput: synchronous writes and mostly sequential execution reduce complexity but limit performance.
- Human readability over inline link fidelity: links are collected into references instead of preserving inline markdown links.
- Deterministic configuration over discovery: hardcoded root pages are explicit but require manual updates.

Scalability rationale:

- Pagination is already implemented for blocks and databases, which is essential for large datasets.
- Parser/extender design allows adding support for more Notion block types without rewriting the pipeline.
- Moving to queued concurrency and incremental sync would scale this architecture significantly without major redesign.

## 12. Scripts / Commands Summary

### From package.json

- npm test
- Current behavior: placeholder command that exits with error (no test suite yet).

### Operational commands used in this project

- npm install
- Installs dependencies.

- node src/index.js
- Runs the full backup for all entries in [src/config/rootPages.js](src/config/rootPages.js).

### Quick Start Command Set

```bash
npm install
node src/index.js
```
