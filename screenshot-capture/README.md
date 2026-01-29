# Screenshot Capture

Playwright project to capture full-page screenshots of all ERP pages.

## Setup

```bash
bun install
bunx playwright install chromium
```

## Run

Make sure the ERP app is running on http://localhost:3000

```bash
bun test
```

Screenshots will be saved in `screenshots/` directory.
