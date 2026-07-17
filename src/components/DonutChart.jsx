// Dependency-free SVG donut chart.
// Props: data = [{ label, value }]. Renders proportional arcs with a legend.
const COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function DonutChart({ data = [], title }) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  const segments = data.map((d, i) => {
    const fraction = d.value / total;
    const seg = {
      color: COLORS[i % COLORS.length],
      dash: fraction * circumference,
      gap: circumference - fraction * circumference,
      offset: -offset * circumference,
      label: d.label,
      value: d.value,
    };
    offset += fraction;
    return seg;
  });

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {title && <h2 className="mb-4 text-lg font-semibold text-slate-800">{title}</h2>}
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <svg viewBox="0 0 160 160" className="h-40 w-40 -rotate-90">
          {segments.map((s, i) => (
            <circle
              key={i}
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke={s.color}
              strokeWidth="18"
              strokeDasharray={`${s.dash} ${s.gap}`}
              strokeDashoffset={s.offset}
            />
          ))}
          <text x="80" y="80" className="rotate-90" textAnchor="middle" dominantBaseline="central"
            style={{ transform: 'rotate(90deg)', transformOrigin: '80px 80px' }}
            fontSize="22" fontWeight="700" fill="#1e293b">
            {total}
          </text>
        </svg>

        <ul className="space-y-2">
          {segments.map((s, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span className="inline-block h-3 w-3 rounded-sm" style={{ background: s.color }} />
              <span className="text-slate-600">{s.label}</span>
              <span className="font-semibold text-slate-800">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
