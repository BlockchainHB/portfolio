import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  // hover: styles only apply on devices that can hover, so taps never leave a stuck hover state
  future: { hoverOnlyWhenSupported: true },
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"SF Pro Display"',
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        page: "var(--page)",
        tile: "var(--tile)",
        fill: "var(--fill)",
        selected: "var(--selected)",
        ink: "var(--ink)",
        body: "var(--body)",
        subtle: "var(--subtle)",
        pill: "var(--pill)",
        "mark-tile": "var(--mark-tile)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: { DEFAULT: "var(--primary)", foreground: "var(--primary-foreground)" },
        secondary: { DEFAULT: "var(--secondary)", foreground: "var(--secondary-foreground)" },
        destructive: { DEFAULT: "var(--destructive)", foreground: "var(--destructive-foreground)" },
        muted: { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" },
        accent: { DEFAULT: "var(--accent)", foreground: "var(--accent-foreground)" },
        popover: { DEFAULT: "var(--popover)", foreground: "var(--popover-foreground)" },
        card: { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },
      },
      // Type scale from the design system: size / line height / tracking.
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["13px", { lineHeight: "18px" }],
        md: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "26px", letterSpacing: "-0.005em" }],
        xl: ["24px", { lineHeight: "30px", letterSpacing: "-0.015em" }],
        "2xl": ["32px", { lineHeight: "38px", letterSpacing: "-0.02em" }],
        hero: ["40px", { lineHeight: "44px", letterSpacing: "-0.03em" }],
        "3xl": ["56px", { lineHeight: "62px", letterSpacing: "-0.03em" }],
      },
      borderRadius: {
        tile: "28px",
        media: "20px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      maxWidth: {
        content: "1168px",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
