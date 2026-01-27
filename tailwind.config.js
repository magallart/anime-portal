/** @type {import('tailwindcss').Config} */
module.exports = {
  /**
   * CONTENT
   * ------------------------------------------------------------------
   * Define where Tailwind should look for class names.
   * Keep this in sync with your framework (Angular, Astro, React, etc.).
   *
   * - Do not include unnecessary folders (node_modules, dist, etc.).
   * - When adding new source folders, update this array.
   */
  content: ['./src/**/*.{html,ts,tsx}'],

  theme: {
    /**
     * THEME STRUCTURE
     * ------------------------------------------------------------------
     * This project uses a SEMANTIC COLOR SYSTEM.
     *
     * - Do NOT use raw colors (hex, rgb) in components.
     * - Do NOT extend Tailwind's default color palette directly.
     * - All colors should be defined as semantic tokens.
     *
     * Visual decisions live in DESIGN.md
     * Technical definitions live here.
     */
    extend: {
      /**
       * COLORS (SEMANTIC TOKENS)
       * ----------------------------------------------------------------
       * These tokens are consumed by components using classes like:
       * - bg-primary
       * - text-foreground
       * - border-border
       *
       * The actual color values are defined via CSS variables
       * (see global styles, e.g. styles.css).
       *
       * When creating a new app from this template:
       * - Update the CSS variables, not the component code.
       */
      colors: {
        // Base surfaces
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Cards / panels
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // Primary brand color
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },

        // Secondary / alternative actions
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },

        // Accents (highlights, badges, subtle emphasis)
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },

        ink: 'hsl(var(--ink))',

        // Destructive actions (delete, danger)
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },

        // Muted / subtle UI
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },

        // Borders and dividers
        border: 'hsl(var(--border))',
      },

      /**
       * BORDER RADIUS
       * ----------------------------------------------------------------
       * Use semantic radius tokens instead of arbitrary values.
       * These should match the decisions in DESIGN.md.
       */
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },

      /**
       * BOX SHADOWS
       * ----------------------------------------------------------------
       * Shadows are part of the design language.
       * Avoid using Tailwind default shadows directly in components.
       */
      boxShadow: {
        subtle: 'var(--shadow-subtle)',
        medium: 'var(--shadow-medium)',
      },

      /**
       * FONT FAMILIES
       * ----------------------------------------------------------------
       * Font names are declared here but chosen in DESIGN.md.
       * Actual font loading is handled separately (CSS / framework).
       */
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },

      /**
       * FOCUS RING + SPACING TOKENS
       * ----------------------------------------------------------------
       * Mirrors the CSS variables defined in styles.css so layout
       * utilities (gap, padding, ring) can use semantic classes.
       */
      ringColor: {
        focus: 'hsl(var(--focus-ring))',
      },
      ringOffsetColor: {
        background: 'hsl(var(--focus-ring-offset))',
      },
      spacing: {
        gutter: 'var(--space-gutter)',
        section: 'var(--space-section-y)',
        layout: 'var(--space-gap)',
        card: 'var(--space-card-padding)',
      },
    },
  },

  /**
   * PLUGINS
   * ------------------------------------------------------------------
   * Keep plugins minimal.
   * Do not add plugins unless there is a clear benefit.
   */
  plugins: [],
};
