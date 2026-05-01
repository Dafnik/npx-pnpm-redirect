import {SHELL_CONFIG, useShell} from '@/components/core.ts';

export function ShellLabel() {
  const {shell} = useShell();
  return <strong className="text-foreground">{SHELL_CONFIG[shell].label}</strong>;
}
