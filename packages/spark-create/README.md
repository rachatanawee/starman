# @spark/create

Create a new Spark project from template.

## Usage

### Create a new project

```bash
bunx @spark/create my-project
```

### With options

```bash
bunx @spark/create my-project --port 3200
```

### Interactive mode

```bash
bunx @spark/create
```

## Options

- `project-name` - Name of the project (optional, will prompt if not provided)
- `-t, --template <template>` - Template to use (default: spark-base)
- `-p, --port <port>` - Development server port (default: 3100)

## What it does

1. Copies the spark-base template
2. Updates package.json with your project name
3. Sets up .env.local with default values
4. Installs dependencies with bun
5. Ready to run!

## After creation

```bash
cd my-project
bun run dev
```

Your app will be running on the specified port (default: http://localhost:3100)

## Project Structure

The created project follows the **Modular Monolith** architecture:

```
my-project/
├── app/                    # Next.js App Router
├── shared/                 # Shared components & utilities
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   └── tablecn/       # DataGrid components
│   └── lib/
├── core/                   # Core infrastructure
│   ├── layout/            # Layout components
│   └── settings/          # Settings context
├── modules/                # Domain modules (add your own)
├── lib/                    # App-specific utilities
└── messages/               # i18n translations
```

## Documentation

- `MODULAR_MONOLITH.md` - Architecture and structure guide
- `BASE_TEMPLATE_FILES.md` - Template file descriptions
- `TROUBLESHOOTING.md` - Common issues and solutions

## Development

To work on this CLI tool:

```bash
cd packages/spark-create
bun install
bun run build
```

To test locally:

```bash
bun run dist/index.js my-test-project
```
