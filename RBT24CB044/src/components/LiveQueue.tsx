// Reusable LiveQueue component
// Props:
// - queueRows: array of items to render (key, t, time, isAnomaly)
// - sortBy, setSortBy: controls for sorting the list
export default function LiveQueue({
  queueRows,
  sortBy,
  setSortBy,
}: {
  queueRows: Array<{ key: string; t: string; time: string; isAnomaly?: boolean }>
  sortBy: 'time' | 'severity' | 'dataLoss'
  setSortBy: (s: 'time' | 'severity' | 'dataLoss') => void
}) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:shadow-none sm:p-6 card">
      <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Live queue</h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        {sortBy === 'time'
          ? 'Latest matching events (newest first)'
          : sortBy === 'severity'
          ? 'Sorted by severity (high → low)'
          : 'Sorted by estimated data loss (high → low)'}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Sort:</span>
        <div className="inline-flex overflow-hidden rounded-lg border bg-zinc-100 p-0.5 dark:bg-zinc-800/40">
          <button
            type="button"
            onClick={() => setSortBy('time')}
            aria-pressed={sortBy === 'time'}
            className={`px-3 py-1 text-xs rounded-sm btn-ghost ${
              sortBy === 'time' ? 'bg-white shadow-sm dark:bg-zinc-900' : 'text-zinc-600 dark:text-zinc-300'
            }`}
          >
            Latest
          </button>
          <button
            type="button"
            onClick={() => setSortBy('severity')}
            aria-pressed={sortBy === 'severity'}
            className={`px-3 py-1 text-xs rounded-sm btn-ghost ${
              sortBy === 'severity' ? 'bg-white shadow-sm dark:bg-zinc-900' : 'text-zinc-600 dark:text-zinc-300'
            }`}
          >
            Severity
          </button>
          <button
            type="button"
            onClick={() => setSortBy('dataLoss')}
            aria-pressed={sortBy === 'dataLoss'}
            className={`px-3 py-1 text-xs rounded-sm btn-ghost ${
              sortBy === 'dataLoss' ? 'bg-white shadow-sm dark:bg-zinc-900' : 'text-zinc-600 dark:text-zinc-300'
            }`}
          >
            Data loss
          </button>
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {queueRows.length === 0 ? (
          <li className="rounded-lg border border-dashed border-zinc-200 px-3 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            No events match the current filters.
          </li>
        ) : (
          queueRows.map((row) => (
            <li
              key={row.key}
              className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 dark:border-zinc-800 ${
                row.isAnomaly ? 'border-rose-200 bg-rose-50/60 dark:bg-rose-900/30' : 'border-zinc-100 bg-zinc-50/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">{row.t}</span>
                {row.isAnomaly ? (
                  <span className="inline-flex items-center rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-800/30 dark:text-rose-300">
                    Anomaly
                  </span>
                ) : null}
              </div>
              <span className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">{row.time}</span>
            </li>
          ))
        )}
      </ul>

      <button
        type="button"
        className="mt-5 w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-cyan-600 dark:hover:bg-cyan-500"
      >
        Open triage
      </button>
    </section>
  )
}
