import { useState } from "preact/hooks";
import { Check, Copy } from "lucide-preact";

export function InlinePath({ path }: { path: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(path).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      title="Copy path"
      className="group inline-flex cursor-pointer items-center gap-1.5 rounded bg-muted px-2 py-0.5 font-mono text-sm font-bold transition-colors hover:bg-muted/70"
    >
      {path}
      <span className="text-muted-foreground transition-colors group-hover:text-foreground">
        {copied ? (
          <Check size={12} strokeWidth={2.5} />
        ) : (
          <Copy size={12} strokeWidth={2.5} />
        )}
      </span>
    </button>
  );
}
