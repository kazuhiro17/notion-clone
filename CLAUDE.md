# CLAUDE.md

## 言語ポリシー

このリポジトリに関する会話・ドキュメントは日本語で行います。コードコメント、ドキュメント、コミットメッセージも日本語を優先します（明示的な依頼がある場合を除く）。

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Project Architecture

### Tech Stack Overview
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components + CSS variables for theming
- **Editor**: BlockNote (Notion-like rich text editor) with Japanese localization
- **Routing**: React Router v7 with nested routes
- **Icons**: Lucide React
- **State**: Local component state (no global state management)

### Key Architectural Patterns

#### Component Structure
- **UI Components**: Located in `src/components/ui/` following shadcn/ui patterns
- **Feature Components**: Organized by domain (SideBar, NoteList, Editor, etc.)
- **Pages**: Route-level components in `src/pages/`
- **Layout System**: Nested routing with shared Layout component containing sidebar

#### Path Aliases
All imports use `@/` prefix for src directory:
- `@/components` → `src/components`
- `@/lib/utils` → `src/lib/utils`
- `@/pages` → `src/pages`

#### Styling Approach
- **CSS Variables**: Extensive use of HSL-based CSS custom properties for theming
- **Component Variants**: Uses `class-variance-authority` and `clsx` for conditional styling
- **Utility Classes**: Tailwind-first approach with custom utility layer
- **Theme Support**: Dark mode ready via CSS variables

#### Editor Integration
- **BlockNote Editor**: JSON-based document structure
- **Localization**: Japanese interface (`locales.ja`)
- **Data Flow**: Editor content serialized as JSON strings
- **Styling**: Mantine-based components for editor UI

#### State Management Patterns
- **Props Drilling**: Currently uses prop passing for state
- **Placeholder Handlers**: Many event handlers are empty functions (development in progress)
- **Mock Data**: User data and note lists use static test data

### Component Communication
- **Parent-Child**: Props and callback functions
- **Search Modal**: Managed via props (isOpen, onClose, etc.)
- **Navigation**: React Router with programmatic navigation

### File Organization
```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── SideBar/      # Navigation and user interface
│   ├── NoteList/     # Note listing and management
│   ├── Editor.tsx    # BlockNote rich text editor
│   ├── Toolbar.tsx   # Editor toolbar
│   └── SearchModal.tsx
├── pages/
│   ├── Home.tsx      # Landing page with note creation
│   ├── NoteDetail.tsx # Individual note view
│   ├── Signin.tsx    # Authentication
│   └── Signup.tsx
├── lib/
│   └── utils.ts      # Tailwind utility functions
└── Layout.tsx        # Main application layout
```

### Development State
This is a learning project in early development. Many features have placeholder implementations:
- Authentication flows exist but use mock data
- Note creation/editing UI exists but lacks persistence
- Search functionality has UI but no implementation
- User management uses test data

### Component Dependencies
- **Editor Component**: Requires `@blocknote/core`, `@blocknote/react`, `@blocknote/mantine`
- **UI Components**: Built on Radix UI primitives with Tailwind styling
- **Icons**: Lucide React for consistent iconography
- **Routing**: React Router v7 with outlet-based nested routing

When working with this codebase:
1. Follow the existing shadcn/ui component patterns
2. Use the established path aliases (`@/`)
3. Maintain the CSS variable theming system
4. Respect the Japanese UI text patterns
5. Use TypeScript interfaces for prop typing
6. Follow the existing component folder structure
