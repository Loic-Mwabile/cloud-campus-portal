// Dependency-free horizontal bar chart built with divs.
// Props: data = [{ label, value }].
export default function BarChart({ data = [], title, unit = '' }) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {title && <h2 className="mb-4 text-lg font-semibold text-slate-800">{title}</h2>}
      <div className="space-y-4">
        {data.map((d) => (
          <div key={d.label}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium text-slate-700">{d.label}</span>
              <span className="text-slate-500">
                {d.value}
                {unit}
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-brand-500"
                style={{ width: `${(d.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
        {data.length === 0 && <p className="text-sm text-slate-400">No data.</p>}
      </div>
    </div>
  );
}
