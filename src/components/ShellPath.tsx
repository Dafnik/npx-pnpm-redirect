import {InlinePath} from '@/components/InlinePath.tsx';
import {SHELL_CONFIG, useShell} from '@/components/core.ts';

export function ShellPath() {
  const {shell} = useShell();
  return <InlinePath path={SHELL_CONFIG[shell].path} />;
}
