import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import { Check, ChevronDown, Copy } from "lucide-preact";

type Shell = "bash" | "zsh" | "fish" | "ksh" | "dash";

type ShellConfig = {
  label: string;
  path: string;
  rcFile: string;
  sourceCmd: string;
  note?: string;
};

const SHELL_CONFIG: Record<Shell, ShellConfig> = {
  bash: {
    label: "Bash",
    path: "~/.bashrc",
    rcFile: ".bashrc",
    sourceCmd: "source ~/.bashrc",
  },
  zsh: {
    label: "Zsh",
    path: "~/.zshrc",
    rcFile: ".zshrc",
    sourceCmd: "source ~/.zshrc",
  },
  fish: {
    label: "Fish",
    path: "~/.config/fish/config.fish",
    rcFile: "config.fish",
    sourceCmd: "source ~/.config/fish/config.fish",
    note: "Fish uses a different function syntax. Replace the function below with the Fish-flavored version shown.",
  },
  ksh: {
    label: "Ksh",
    path: "~/.kshrc",
    rcFile: ".kshrc",
    sourceCmd: "source ~/.kshrc",
  },
  dash: {
    label: "Dash",
    path: "~/.profile",
    rcFile: ".profile",
    sourceCmd: ". ~/.profile",
    note: "Dash is POSIX-only and doesn't support the `function` keyword. The snippet below uses the POSIX-compatible syntax.",
  },
};

const FUNCTION_CODE_FOR: Record<Shell, string> = {
  bash: `function npx() {\n  pnpm dlx "$@"\n}`,
  zsh: `function npx() {\n  pnpm dlx "$@"\n}`,
  fish: `function npx\n  pnpm dlx $argv\nend`,
  ksh: `function npx() {\n  pnpm dlx "$@"\n}`,
  dash: `npx() {\n  pnpm dlx "$@"\n}`,
};

const VERIFY_CMD = `npx cowsay "I use pnpm now"`;

const ShellContext = createContext<{
  shell: Shell;
  setShell: (shell: Shell) => void;
}>({
  shell: "zsh",
  setShell: () => {},
});

function useShell() {
  return useContext(ShellContext);
}

function CopyButton({ text }: { text: string }) {
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
      className="absolute right-3 top-3 rounded-md border border-border bg-background/60 p-1.5 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
    >
      {copied ? (
        <Check size={14} strokeWidth={2.5} />
      ) : (
        <Copy size={14} strokeWidth={2.5} />
      )}
    </button>
  );
}

function CodeBlock({
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

function InlinePath({ path }: { path: string }) {
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

function ShellSelector() {
  const { shell, setShell } = useShell();
  const [open, setOpen] = useState(false);
  const shells = Object.entries(SHELL_CONFIG) as [Shell, ShellConfig][];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-sm font-black transition-colors hover:bg-muted"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{SHELL_CONFIG[shell].label}</span>
        <ChevronDown
          size={13}
          strokeWidth={2.5}
          className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-10 mt-1 min-w-full overflow-hidden rounded-lg border border-border bg-background shadow-md"
        >
          {shells.map(([key, cfg]) => (
            <li key={key}>
              <button
                role="option"
                aria-selected={shell === key}
                onClick={() => {
                  setShell(key);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm font-black transition-colors hover:bg-muted ${
                  shell === key ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {cfg.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ShellPath() {
  const { shell } = useShell();
  return <InlinePath path={SHELL_CONFIG[shell].path} />;
}

function ShellCodeBlock() {
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

function ShellSourceBlock() {
  const { shell } = useShell();
  return <CodeBlock code={SHELL_CONFIG[shell].sourceCmd} />;
}

function ShellAIPrompt() {
  const { shell } = useShell();
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
      <div className="space-y-2 rounded-lg bg-muted p-5 pr-12">
        <p className="mb-3 text-xs font-black uppercase text-muted-foreground">
          Prompt
        </p>
        <p className="whitespace-pre-wrap font-mono text-sm font-bold leading-relaxed">
          {prompt}
        </p>
      </div>
      <CopyButton text={prompt} />
    </div>
  );
}

function ShellLabel() {
  const { shell } = useShell();
  return (
    <strong className="text-foreground">{SHELL_CONFIG[shell].label}</strong>
  );
}

function ShellRcFile() {
  const { shell } = useShell();
  return (
    <code className="rounded bg-muted px-1 font-mono">
      {SHELL_CONFIG[shell].rcFile}
    </code>
  );
}

export default function NpxRedirectApp() {
  const [shell, setShell] = useState<Shell>("zsh");

  return (
    <ShellContext.Provider value={{ shell, setShell }}>
      <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-foreground">
        <article className="w-full max-w-xl space-y-10">
          <div className="space-y-3">
            <h1 className="text-balance text-4xl font-black">
              Yes, you can stop typing{" "}
              <code className="rounded bg-muted px-2 py-1 text-3xl">npx</code>.
            </h1>
            <p className="text-lg font-semibold text-muted-foreground">
              Congratulations on discovering <strong>pnpm</strong>. Here&apos;s
              how to make your shell forget{" "}
              <code className="rounded bg-muted px-1">npx</code> ever existed.
            </p>
          </div>

          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="flex-1 text-xl font-black uppercase">
                Step 1 - Open your shell config
              </h2>
              <ShellSelector />
            </div>
            <p className="font-bold text-muted-foreground">
              Since you&apos;re using <ShellLabel />, the file you&apos;re
              looking for is:
            </p>
            <ShellPath />
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="flex-1 text-xl font-black uppercase">
                Step 2 - Paste this function
              </h2>
              <ShellSelector />
            </div>
            <p className="font-bold text-muted-foreground">
              Add the following to the bottom of <ShellRcFile />. Yes, the whole
              thing.
            </p>
            <ShellCodeBlock />
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="flex-1 text-xl font-black uppercase">
                Step 3 - Reload your shell
              </h2>
              <ShellSelector />
            </div>
            <p className="font-bold text-muted-foreground">
              The file doesn&apos;t reload itself. Run this:
            </p>
            <ShellSourceBlock />
            <p className="text-sm font-bold text-muted-foreground">
              Or just open a new terminal tab like a normal person.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-black uppercase">
              Step 4 - Verify it works
            </h2>
            <CodeBlock code={VERIFY_CMD} />
            <p className="font-bold text-muted-foreground">
              If a cow says it, it&apos;s true.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="flex-1 text-xl font-black uppercase">
                Too lazy? Give this to your AI
              </h2>
              <ShellSelector />
            </div>
            <p className="font-bold text-muted-foreground">
              Can&apos;t be bothered to do four whole steps? Fine. This prompt
              is already tailored to <ShellLabel /> - just copy and paste it.
            </p>
            <ShellAIPrompt />
          </section>

          <p className="border-t pt-6 text-xs font-bold text-muted-foreground">
            That&apos;s it. Four steps. You&apos;ve earned a coffee.
          </p>
        </article>
      </main>
    </ShellContext.Provider>
  );
}
