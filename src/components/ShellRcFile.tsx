import { SHELL_CONFIG, useShell } from "@/components/core.ts";

export function ShellRcFile() {
  const { shell } = useShell();
  return (
    <code className="rounded bg-muted px-1 font-mono">
      {SHELL_CONFIG[shell].rcFile}
    </code>
  );
}
