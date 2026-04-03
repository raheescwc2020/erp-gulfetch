import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import KpiCard from "../components/KpiCard";
import ChartCard from "../components/ChartCard";
import Badge from "../components/Badge";
import { MONTHS, REVENUE, EXPENSE, PROFIT, COLORS, chartDefaults } from "../data/chartData";

function PnLChart() {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: MONTHS,
        datasets: [
          { type: "bar",  label: "Revenue",    data: REVENUE, backgroundColor: COLORS.blue,   borderRadius: 2 },
          { type: "bar",  label: "Cost",       data: EXPENSE, backgroundColor: COLORS.red,    borderRadius: 2 },
          { type: "line", label: "Net Profit", data: PROFIT,  borderColor: COLORS.green, backgroundColor: "transparent", tension: 0.4, yAxisID: "y1", pointBackgroundColor: COLORS.green },
        ],
      },
      options: {
        ...chartDefaults,
        scales: {
          ...chartDefaults.scales,
          y:  { ...chartDefaults.scales.y,  ticks: { ...chartDefaults.scales.y.ticks,  callback: v => v + "L" } },
          y1: { position: "right", grid: { drawOnChartArea: false }, ticks: { color: "#555b6e", font: { size: 10 }, callback: v => v + "L" }, border: { color: "rgba(255,255,255,0.06)" } },
        },
      },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

function MarginChart() {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["Sanitary","Electrical","Electronics","Plumbing","Hardware"],
        datasets: [{ label: "Gross Margin %", data: [32,28,24,22,18], backgroundColor: COLORS.teal, borderRadius: 4 }],
      },
      options: {
        ...chartDefaults,
        scales: {
          ...chartDefaults.scales,
          y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: v => v + "%" } },
        },
      },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

const yearComp = [
  { month:"April",    rev2526:48.6, rev2425:41.0, np2526:9.2, np2425:7.6, growth:"+18.5%", status:"green" },
  { month:"March",    rev2526:43.4, rev2425:38.2, np2526:8.5, np2425:7.0, growth:"+13.6%", status:"green" },
  { month:"February", rev2526:40.8, rev2425:36.4, np2526:7.8, np2425:6.5, growth:"+12.1%", status:"green" },
  { month:"January",  rev2526:38.4, rev2425:35.0, np2526:7.2, np2425:6.2, growth:"+9.7%",  status:"green" },
  { month:"December", rev2526:52.1, rev2425:44.8, np2526:10.4,np2425:8.8, growth:"+16.3%", status:"green" },
  { month:"November", rev2526:44.2, rev2425:39.6, np2526:8.8, np2425:7.4, growth:"+11.6%", status:"green" },
];

export default function ProfitLoss() {
  return (
    <div>
      <div className="page-header">
        <h1>Profit & Loss</h1>
        <p>Gross and net margins, category profitability, and year-on-year comparison</p>
      </div>

      <div className="kpi-grid">
        <KpiCard label="Gross Profit (Apr)" value="₹14.6L" delta="▲ +10%"           deltaType="up" />
        <KpiCard label="Net Profit (Apr)"   value="₹9.2L"  delta="▲ +8%"            deltaType="up" />
        <KpiCard label="Gross Margin"       value="30.1%"  delta="▲ +0.8pp"          deltaType="up" />
        <KpiCard label="Net Margin"         value="18.9%"  delta="▲ +0.5pp"          deltaType="up" />
        <KpiCard label="YTD Net Profit"     value="₹38.4L" delta="▲ +15% vs FY24-25" deltaType="up" />
      </div>

      <div className="grid-2">
        <ChartCard title="Monthly P&L — FY 2025-26 (₹L)" height={240}
          legend={[{label:"Revenue",color:COLORS.blue},{label:"Cost",color:COLORS.red},{label:"Net Profit",color:COLORS.green}]}>
          <PnLChart />
        </ChartCard>
        <ChartCard title="Gross Margin by Category (%)" height={240}>
          <MarginChart />
        </ChartCard>
      </div>

      <div className="card">
        <div className="card-title">Year-on-Year Comparison (₹L)</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Month</th><th>Revenue 25-26</th><th>Revenue 24-25</th><th>Net Profit 25-26</th><th>Net Profit 24-25</th><th>YoY Growth</th></tr>
            </thead>
            <tbody>
              {yearComp.map(r => (
                <tr key={r.month}>
                  <td style={{ fontWeight: 500 }}>{r.month}</td>
                  <td style={{ fontFamily: "var(--mono)", color: "var(--green)" }}>{r.rev2526}</td>
                  <td style={{ fontFamily: "var(--mono)", color: "var(--text2)" }}>{r.rev2425}</td>
                  <td style={{ fontFamily: "var(--mono)", color: "var(--teal)" }}>{r.np2526}</td>
                  <td style={{ fontFamily: "var(--mono)", color: "var(--text2)" }}>{r.np2425}</td>
                  <td><Badge type={r.status}>{r.growth}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
