import { useState } from "preact/hooks";
import { ChevronDown } from "lucide-preact";
import {
  type Shell,
  SHELL_CONFIG,
  type ShellConfig,
  useShell,
} from "@/components/core.ts";

export function ShellSelector() {
  const { shell, setShell } = useShell();
  const [open, setOpen] = useState(false);
  const shells = Object.entries(SHELL_CONFIG) as [Shell, ShellConfig][];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-sm font-black transition-colors hover:bg-muted"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{SHELL_CONFIG[shell].label}</span>
        <ChevronDown
          size={13}
          strokeWidth={2.5}
          className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-10 mt-1 min-w-full overflow-hidden rounded-lg border border-border bg-background shadow-md"
        >
          {shells.map(([key, cfg]) => (
            <li key={key}>
              <button
                role="option"
                aria-selected={shell === key}
                onClick={() => {
                  setShell(key);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm font-black transition-colors hover:bg-muted ${
                  shell === key ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {cfg.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
