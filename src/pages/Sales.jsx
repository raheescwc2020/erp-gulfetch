import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import KpiCard from "../components/KpiCard";
import ChartCard from "../components/ChartCard";
import Badge from "../components/Badge";
import { COLORS, chartDefaults } from "../data/chartData";

function ShopBarChart() {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["Sh07","Sh14","Sh03","Sh21","Sh29","Sh11","Sh18","Sh26","Sh02","Sh09"],
        datasets: [{ label: "Sales ₹L", data: [3.8,3.2,2.9,2.4,2.1,1.9,1.7,1.6,1.5,1.4], backgroundColor: COLORS.purple, borderRadius: 4 }],
      },
      options: {
        indexAxis: "y",
        ...chartDefaults,
        scales: {
          x: { ...chartDefaults.scales.x, ticks: { ...chartDefaults.scales.x.ticks, callback: v => v + "L" } },
          y: { ...chartDefaults.scales.y },
        },
      },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

function WeeklyTrend() {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "line",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          { label: "Sanitary",    data: [4.8,5.2,4.9,5.6], borderColor: COLORS.purple, fill: false, tension: 0.4, pointBackgroundColor: COLORS.purple },
          { label: "Electrical",  data: [3.4,3.8,3.2,4.0], borderColor: COLORS.blue,   fill: false, tension: 0.4, pointBackgroundColor: COLORS.blue },
          { label: "Electronics", data: [2.8,3.0,3.4,3.1], borderColor: COLORS.green,  fill: false, tension: 0.4, pointBackgroundColor: COLORS.green },
        ],
      },
      options: {
        ...chartDefaults,
        scales: {
          ...chartDefaults.scales,
          y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, callback: v => v + "L" } },
        },
      },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

const allShops = [
  { shop:"Shop 07", loc:"Ernakulam",  cat:"Mixed",      rev:"₹3.8L", target:"₹3.5L", ach:"109%", status:"green", label:"Achieved" },
  { shop:"Shop 14", loc:"Thrissur",   cat:"Sanitary",   rev:"₹3.2L", target:"₹3.0L", ach:"107%", status:"green", label:"Achieved" },
  { shop:"Shop 03", loc:"Kochi",      cat:"Electrical", rev:"₹2.9L", target:"₹3.2L", ach:"91%",  status:"amber", label:"Near" },
  { shop:"Shop 21", loc:"Palakkad",   cat:"Mixed",      rev:"₹2.4L", target:"₹2.8L", ach:"86%",  status:"amber", label:"Near" },
  { shop:"Shop 29", loc:"Calicut",    cat:"Electronics",rev:"₹2.1L", target:"₹2.5L", ach:"84%",  status:"red",   label:"Below" },
  { shop:"Shop 11", loc:"Alappuzha",  cat:"Sanitary",   rev:"₹1.9L", target:"₹2.0L", ach:"95%",  status:"amber", label:"Near" },
  { shop:"Shop 18", loc:"Kollam",     cat:"Electrical", rev:"₹1.7L", target:"₹1.8L", ach:"94%",  status:"amber", label:"Near" },
  { shop:"Shop 26", loc:"Trivandrum", cat:"Mixed",      rev:"₹1.6L", target:"₹2.0L", ach:"80%",  status:"red",   label:"Below" },
];

export default function Sales() {
  return (
    <div>
      <div className="page-header">
        <h1>Sales Performance</h1>
        <p>Shop-wise revenue, weekly trends, and target achievement across all outlets</p>
      </div>

      <div className="kpi-grid">
        <KpiCard label="Today's Sales"   value="₹1.84L"  delta="▲ +9% vs yesterday" deltaType="up" />
        <KpiCard label="This Month"      value="₹48.6L"  delta="▲ +12% vs Mar"      deltaType="up" />
        <KpiCard label="This Year (YTD)" value="₹4.8Cr"  delta="▲ +19% vs FY24-25"  deltaType="up" />
        <KpiCard label="Avg Ticket Size" value="₹3,420"  delta="▲ +6%"              deltaType="up" />
        <KpiCard label="Orders Today"    value="538"      delta="Across 32 shops"    deltaType="muted" />
      </div>

      <div className="grid-2">
        <ChartCard title="Sales by Shop — Top 10 (₹L)" height={340}
          legend={[{label:"Monthly Sales",color:COLORS.purple}]}>
          <ShopBarChart />
        </ChartCard>
        <ChartCard title="Weekly Sales Trend by Category (₹L)" height={340}
          legend={[{label:"Sanitary",color:COLORS.purple},{label:"Electrical",color:COLORS.blue},{label:"Electronics",color:COLORS.green}]}>
          <WeeklyTrend />
        </ChartCard>
      </div>

      <div className="card">
        <div className="card-title">All Shops — Sales Summary</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Shop</th><th>Location</th><th>Category</th><th>Monthly Sales</th><th>Target</th><th>Achievement</th><th>Status</th></tr>
            </thead>
            <tbody>
              {allShops.map(s => (
                <tr key={s.shop}>
                  <td style={{ fontWeight: 500 }}>{s.shop}</td>
                  <td style={{ color: "var(--text2)" }}>{s.loc}</td>
                  <td>{s.cat}</td>
                  <td style={{ fontFamily: "var(--mono)" }}>{s.rev}</td>
                  <td style={{ fontFamily: "var(--mono)", color: "var(--text2)" }}>{s.target}</td>
                  <td style={{ fontFamily: "var(--mono)", color: parseFloat(s.ach) >= 100 ? "var(--green)" : parseFloat(s.ach) >= 90 ? "var(--amber)" : "var(--red)" }}>{s.ach}</td>
                  <td><Badge type={s.status}>{s.label}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
