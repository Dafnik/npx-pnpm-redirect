import { useEffect, useState } from "preact/hooks";

export type Shell = "bash" | "zsh" | "fish" | "ksh" | "dash";

export type ShellConfig = {
  label: string;
  path: string;
  rcFile: string;
  sourceCmd: string;
  note?: string;
};

export const SHELL_CONFIG: Record<Shell, ShellConfig> = {
  bash: {
    label: "Bash",
    path: "~/.bashrc",
    rcFile: ".bashrc",
    sourceCmd: "source ~/.bashrc",
  },
  zsh: {
    label: "Zsh",
    path: "~/.zshrc",
    rcFile: ".zshrc",
    sourceCmd: "source ~/.zshrc",
  },
  fish: {
    label: "Fish",
    path: "~/.config/fish/config.fish",
    rcFile: "config.fish",
    sourceCmd: "source ~/.config/fish/config.fish",
    note: "Fish uses a different function syntax. Replace the function below with the Fish-flavored version shown.",
  },
  ksh: {
    label: "Ksh",
    path: "~/.kshrc",
    rcFile: ".kshrc",
    sourceCmd: "source ~/.kshrc",
  },
  dash: {
    label: "Dash",
    path: "~/.profile",
    rcFile: ".profile",
    sourceCmd: ". ~/.profile",
    note: "Dash is POSIX-only and doesn't support the `function` keyword. The snippet below uses the POSIX-compatible syntax.",
  },
};

export const FUNCTION_CODE_FOR: Record<Shell, string> = {
  bash: `function npx() {\n  pnpm dlx "$@"\n}`,
  zsh: `function npx() {\n  pnpm dlx "$@"\n}`,
  fish: `function npx\n  pnpm dlx $argv\nend`,
  ksh: `function npx() {\n  pnpm dlx "$@"\n}`,
  dash: `npx() {\n  pnpm dlx "$@"\n}`,
};

let selectedShell: Shell = "zsh";
const shellListeners = new Set<(shell: Shell) => void>();

function setShell(shell: Shell) {
  selectedShell = shell;
  for (const listener of shellListeners) {
    listener(shell);
  }
}

export function useShell() {
  const [shell, setLocalShell] = useState<Shell>(selectedShell);

  useEffect(() => {
    shellListeners.add(setLocalShell);

    return () => {
      shellListeners.delete(setLocalShell);
    };
  }, []);

  return {
    shell,
    setShell,
  };
}
