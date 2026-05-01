import {useState} from 'preact/hooks';
import {Check, Copy} from 'lucide-preact';

export function CopyButton({text}: {text: string}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      className="border-border bg-background/60 text-muted-foreground hover:bg-background hover:text-foreground absolute top-3 right-3 rounded-md border p-1.5 transition-colors">
      {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} strokeWidth={2.5} />}
    </button>
  );
}
