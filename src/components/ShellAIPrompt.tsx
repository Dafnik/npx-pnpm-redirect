import {CopyButton} from '@/components/CopyButton.tsx';
import {FUNCTION_CODE_FOR, SHELL_CONFIG, useShell} from '@/components/core.ts';

export function ShellAIPrompt() {
  const {shell} = useShell();
  const cfg = SHELL_CONFIG[shell];
  const functionCode = FUNCTION_CODE_FOR[shell];

  const prompt = `I want to set up a shell function that redirects npx to pnpm dlx.

I'm using ${cfg.label}, so my shell config file is ${cfg.path}.

Here's what to do:
1. Open ${cfg.path}.
2. Add the following function at the bottom of that file:

${functionCode}

3. Save the file.
4. Reload the config by running: ${cfg.sourceCmd}
5. Confirm the override is active by running: which npx - it should be a shell function, not a binary.

Don't overthink it.`;

  return (
    <div className="relative">
      <div className="bg-muted space-y-2 rounded-lg p-5 pr-12">
        <p className="text-muted-foreground mb-3 text-xs font-black uppercase">Prompt</p>
        <p className="font-mono text-sm leading-relaxed font-bold whitespace-pre-wrap">{prompt}</p>
      </div>
      <CopyButton text={prompt} />
    </div>
  );
}
