import { CodeBlock } from "@/components/CodeBlock.tsx";
import {
  FUNCTION_CODE_FOR,
  SHELL_CONFIG,
  useShell,
} from "@/components/core.ts";

export function ShellCodeBlock() {
  const { shell } = useShell();
  const cfg = SHELL_CONFIG[shell];
  const code = FUNCTION_CODE_FOR[shell];

  return (
    <div className="space-y-3">
      {cfg.note && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-600 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400">
          {cfg.note}
        </p>
      )}
      <CodeBlock code={code} />
      {shell === "fish" ? (
        <p className="text-sm font-bold text-muted-foreground">
          <strong className="text-foreground">
            What does <code className="rounded bg-muted px-1">$argv</code> mean?
          </strong>{" "}
          Fish uses <code className="rounded bg-muted px-1">$argv</code> instead
          of <code className="rounded bg-muted px-1">&quot;$@&quot;</code>. Same
          idea, different dialect.
        </p>
      ) : (
        <p className="text-sm font-bold text-muted-foreground">
          <strong className="text-foreground">
            What does{" "}
            <code className="rounded bg-muted px-1">&quot;$@&quot;</code> mean?
          </strong>{" "}
          It passes every argument you typed along to{" "}
          <code className="rounded bg-muted px-1">pnpm dlx</code>. You&apos;re
          welcome.
        </p>
      )}
    </div>
  );
}
