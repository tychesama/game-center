type FeedbackPanelProps = {
  message: string | null;
  emptyLabel?: string;
};

export function FeedbackPanel({ message, emptyLabel = "Clean board. No warnings." }: FeedbackPanelProps) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--gc-muted)]">
        Prompts
      </p>
      <div
        className={[
          "mt-3 rounded-2xl border-2 px-4 py-4 text-sm font-black uppercase tracking-[0.12em] shadow-[var(--gc-card-shadow)] transition",
          message
            ? "border-[var(--gc-ink)] bg-[color:color-mix(in_srgb,var(--gc-accent)_18%,white)] text-[var(--gc-ink)]"
            : "border-[color:color-mix(in_srgb,var(--gc-ink)_18%,transparent)] bg-[color:color-mix(in_srgb,var(--gc-surface-strong)_65%,white)] text-[var(--gc-muted)]",
        ].join(" ")}
        aria-live="assertive"
        role={message ? "alert" : "status"}
      >
        {message ?? emptyLabel}
      </div>
    </div>
  );
}
