import { CopyButton } from "@/components/CopyButton.tsx";

export function CodeBlock({
  code,
  className = "",
}: {
  code: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <pre className="overflow-x-auto rounded-lg bg-muted p-5 pr-12">
        <code className="whitespace-pre font-mono text-sm font-bold leading-relaxed">
          {code}
        </code>
      </pre>
      <CopyButton text={code} />
    </div>
  );
}
