export default function KpiCard({ label, value, delta, deltaType = "muted" }) {
  return (
    <div className="kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {delta && <div className={`kpi-delta ${deltaType}`}>{delta}</div>}
    </div>
  );
}
