export default function ChartCard({ title, legend = [], height = 220, children }) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      {legend.length > 0 && (
        <div className="legend">
          {legend.map(l => (
            <div key={l.label} className="legend-item">
              <span className="legend-dot" style={{ background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      )}
      <div className="chart-box" style={{ height }}>
        {children}
      </div>
    </div>
  );
}
