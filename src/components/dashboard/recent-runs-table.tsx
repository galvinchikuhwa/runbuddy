type RecentRunsTableProps = {
  rows: Array<{
    id: number;
    date: string;
    workout: string;
    distance: string;
    pace: string;
    fatigue: string;
  }>;
};

export function RecentRunsTable({ rows }: RecentRunsTableProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)]">
      <div className="border-b border-[var(--border)] px-6 py-5">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Latest logged sessions and readiness signals for the current training block.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-[var(--text-muted)]">
          <thead className="bg-[var(--card)]/60 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Workout</th>
              <th className="px-6 py-4 font-medium">Distance</th>
              <th className="px-6 py-4 font-medium">Pace</th>
              <th className="px-6 py-4 font-medium">Fatigue</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[var(--border)]">
                <td className="px-6 py-4 text-[var(--text)]">{row.date}</td>
                <td className="px-6 py-4 text-[var(--text)]">{row.workout}</td>
                <td className="px-6 py-4 text-emerald-400">{row.distance}</td>
                <td className="px-6 py-4 text-[var(--text-muted)]">{row.pace}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-orange-400/10 px-3 py-1 text-xs font-medium text-orange-400">
                    {row.fatigue}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
