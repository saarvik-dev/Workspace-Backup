# Notion Backup Exporter: Automation & Optimization Plan

This plan describes the implementation steps to automate your Notion-to-GitHub backup, eliminate local computer storage requirements, dynamically discover pages, and perform fast incremental updates.

## User Review Required

Before starting, please make sure you have:
1. A Notion Integration Token (`NOTION_TOKEN`).
2. (Optional) If you want to use the database-based registry, create a database in Notion and share it with your Integration, then provide its ID. Otherwise, the script will automatically discover all top-level shared pages via the Notion Search API.
3. Access to add Repository Secrets to your GitHub repository.

---

## Proposed Changes

### Component 1: Entry Orchestration & Dynamic Page Discovery

#### [MODIFY] [index.js](file:///d:/Workspace-Backup/src/index.js)
- Update `runBackup` to load/save `backups/sync-metadata.json` for incremental syncing.
- Implement page discovery:
  1. Check for `NOTION_DATABASE_ID` in `.env` or environment variables to pull pages from a Notion database.
  2. If not set, check for `ROOT_PAGES` in `rootPages.js`.
  3. If empty, use `notion.search()` to automatically discover all top-level pages shared with the integration.
- Track overall statistics (pages synced, skipped, errors) and log them.

---

### Component 2: Incremental Sync Engine

#### [MODIFY] [parsePage.js](file:///d:/Workspace-Backup/src/parser/parsePage.js)
- Update `parsePage(pageId, folderPath)` to:
  1. Retrieve page metadata (including `last_edited_time` and page title) via `notion.pages.retrieve`.
  2. Compare `last_edited_time` against the cached entry in `sync-metadata.json`.
  3. If it matches, skip block fetching and file writing. Read the list of nested children from the cache and recurse into them.
  4. If it differs or cache is missing, perform a full page parse:
     - Fetch blocks.
     - Write `README.md`.
     - Track any discovered child pages and databases during parse.
     - Store the children and current `last_edited_time` in the cache.

#### [MODIFY] [databaseExporter.js](file:///d:/Workspace-Backup/src/database/databaseExporter.js)
- Retrieve database metadata via `notion.databases.retrieve` to check its `last_edited_time`.
- If database metadata matches cache, skip querying the database entries and just recurse into the cached row page IDs.
- Otherwise, query database rows and export them recursively.

---

### Component 3: Build & Automation

#### [NEW] [notion-backup.yml](file:///d:/Workspace-Backup/.github/workflows/notion-backup.yml)
Create a GitHub Actions workflow to run the backup exporter daily and commit/push changes automatically:
- Trigger on a daily schedule (cron expression) and manually via `workflow_dispatch`.
- Steps:
  1. Check out code.
  2. Set up Node.js.
  3. Install dependencies.
  4. Run backup script (`node src/index.js`) using secrets: `NOTION_TOKEN` and `NOTION_DATABASE_ID` (optional).
  5. Automatically commit updated Markdown files, downloaded assets, and `sync-metadata.json` if changes are detected, and push them back to the repository.

#### [MODIFY] [package.json](file:///d:/Workspace-Backup/package.json)
- Add operational npm scripts:
  - `"start"`: `"node src/index.js"`

---

## Verification Plan

### Automated Verification
We will run the script locally to verify:
1. Page discovery successfully finds pages via search (or database if ID is provided).
2. The initial run successfully writes the markdown files and populates `backups/sync-metadata.json`.
3. The second run successfully runs incrementally, skipping all unchanged pages and completing within seconds.

### Manual Verification
1. Verify the GitHub Actions workflow syntax.
2. Provide instructions for you to add your `NOTION_TOKEN` as a Repository Secret on GitHub and run the action manually to confirm it commits and pushes.
