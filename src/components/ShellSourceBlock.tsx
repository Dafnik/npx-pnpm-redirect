import {CodeBlock} from '@/components/CodeBlock.tsx';
import {SHELL_CONFIG, useShell} from '@/components/core.ts';

export function ShellSourceBlock() {
  const {shell} = useShell();
  return <CodeBlock code={SHELL_CONFIG[shell].sourceCmd} />;
}
