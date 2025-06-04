# Rich Editor

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) package manager

### Installation

1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Start the development server:
   ```sh
   pnpm run dev
   ```
3. Open your browser and navigate to the local server URL (usually http://localhost:5173/).

## Features Completed
- Rich text editor using Tiptap with support for:
  - Bold, italic, underline, strikethrough
  - Headings, lists, blockquotes, code blocks
  - Images and links
  - Dropcursor and basic formatting toolbar
- Theme switching (light/dark mode)
- Output preview component

## Assumptions & Libraries Used
- Project bootstrapped with [Vite](https://vitejs.dev/) and [React](https://react.dev/)
- TypeScript for type safety
- Path aliasing with `@/` for imports from `src`
- [Tiptap](https://tiptap.dev/) for the editor core and extensions:
  - `@tiptap/react`, `@tiptap/pm`, `@tiptap/starter-kit`, `@tiptap/extension-underline`, `@tiptap/extension-image`, `@tiptap/extension-link`, `@tiptap/extension-dropcursor`
- [lucide-react](https://lucide.dev/) for icons
- [tailwindcss](https://tailwindcss.com/) for styling
- [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths) for path alias support

## Notes
- The editor is functional and supports all listed features.
- Make sure to use `pnpm` for dependency management as the lockfile is optimized for it.