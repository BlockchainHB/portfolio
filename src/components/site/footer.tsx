"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { CONTACT } from "@/data/site";
import { track } from "@/lib/datafast";
import { cn } from "@/lib/utils";

const SOCIAL = [
  {
    label: "X",
    href: CONTACT.x,
    size: 13,
    viewBox: "0 0 24 24",
    path: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z",
    fill: "currentColor",
  },
  {
    label: "GitHub",
    href: CONTACT.github,
    size: 15,
    viewBox: "0 0 24 24",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    fill: "currentColor",
  },
  {
    label: "LinkedIn",
    href: CONTACT.linkedin,
    size: 14,
    viewBox: "0 0 16 16",
    path: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
    fill: "#0A66C2",
  },
];

export function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-content flex-col gap-12 pt-24 lg:gap-16 lg:pt-28">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div className="flex flex-col gap-1.5">
          <p data-scroll-goal="scroll:contact" className="text-md text-body">
            Say hello
          </p>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              data-goal="email_click"
              data-goal-location="footer"
              className="text-2xl font-light text-ink transition-[opacity,transform] duration-150 ease-out hover:opacity-70 active:scale-[0.96]"
            >
              {CONTACT.email}
            </a>
            <CopyEmail />
          </div>
        </div>
        <ul className="flex items-center gap-6 lg:pb-1">
          {SOCIAL.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener"
                data-goal="social_click"
                data-goal-network={s.label.toLowerCase()}
                data-goal-location="footer"
                className="flex items-center gap-2 text-md text-ink transition-[opacity,transform] duration-150 ease-out hover:opacity-70 active:scale-[0.96]"
              >
                <span className="shadow-tile flex size-7 items-center justify-center rounded-lg bg-tile text-ink dark:bg-selected">
                  <svg width={s.size} height={s.size} viewBox={s.viewBox} aria-hidden>
                    <path d={s.path} fill={s.fill} />
                  </svg>
                </span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col-reverse items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-body">© 2026 Hasaam Bhatti | Toronto</p>
        <ThemeToggle />
      </div>
    </footer>
  );
}

/*
 * Copies the address for people who don't use a mail app. The icon swaps
 * copy → check (the static cue) and back after two seconds.
 */
function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      track("email_copy");
    } catch {
      // Clipboard blocked: the mailto link beside it still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className="shadow-tile flex size-7 items-center justify-center rounded-lg bg-tile text-body transition-[color,transform] duration-150 ease-out hover:text-ink active:scale-[0.96] dark:bg-selected"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className="flex"
        >
          {copied ? <Check size={14} strokeWidth={1.5} className="text-ink" /> : <Copy size={14} strokeWidth={1.5} />}
        </motion.span>
      </AnimatePresence>
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </button>
  );
}

const THEMES = [
  { value: "system", label: "Auto" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = mounted ? theme ?? "system" : "system";

  return (
    <div role="radiogroup" aria-label="Theme" className="flex gap-0.5 rounded-full bg-fill p-[3px]">
      {THEMES.map((t) => {
        const active = current === t.value;
        return (
          <button
            key={t.value}
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(t.value)}
            className={cn(
              "relative rounded-full px-3 py-[7px] text-sm transition-[color,transform] duration-150 ease-out active:scale-[0.96]",
              active ? "text-ink" : "text-body hover:text-ink",
            )}
          >
            {active && (
              <motion.span
                layoutId="theme-toggle"
                initial={false}
                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                className="shadow-tile absolute inset-0 rounded-full bg-selected dark:bg-selected"
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
