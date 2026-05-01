import {CopyButton} from '@/components/CopyButton.tsx';

export function CodeBlock({code, className = ''}: {code: string; className?: string}) {
  return (
    <div className={`relative ${className}`}>
      <pre className="bg-muted overflow-x-auto rounded-lg p-5 pr-12">
        <code className="font-mono text-sm leading-relaxed font-bold whitespace-pre">{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  );
}
