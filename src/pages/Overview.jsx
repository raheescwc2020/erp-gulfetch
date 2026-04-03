import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import KpiCard from "../components/KpiCard";
import ChartCard from "../components/ChartCard";
import Badge from "../components/Badge";
import { MONTHS, REVENUE, EXPENSE, PROFIT, COLORS, chartDefaults } from "../data/chartData";

function RevExpChart() {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: MONTHS,
        datasets: [
          { label: "Revenue",     data: REVENUE, backgroundColor: COLORS.blue,   borderRadius: 3 },
          { label: "Expenditure", data: EXPENSE, backgroundColor: COLORS.red,    borderRadius: 3 },
          { label: "Profit",      data: PROFIT,  backgroundColor: COLORS.green,  borderRadius: 3 },
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

function CategoryDonut() {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: ["Sanitary", "Electrical", "Electronics", "Other"],
        datasets: [{ data: [38, 27, 22, 13], backgroundColor: [COLORS.purple, COLORS.blue, COLORS.green, COLORS.amber], borderWidth: 0 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: "62%" },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

function ExpBreakdown() {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: ["Procurement", "Salaries", "Logistics", "Operations", "Other"],
        datasets: [{ data: [52, 18, 14, 10, 6], backgroundColor: [COLORS.purple, COLORS.amber, COLORS.blue, COLORS.red, COLORS.green], borderWidth: 0 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: "58%" },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

const topShops = [
  { name: "Shop 07 – Ernakulam", rev: "₹3.8L", growth: "+18%", status: "green", label: "Top" },
  { name: "Shop 14 – Thrissur",  rev: "₹3.2L", growth: "+11%", status: "green", label: "High" },
  { name: "Shop 03 – Kochi",     rev: "₹2.9L", growth: "+7%",  status: "green", label: "High" },
  { name: "Shop 21 – Palakkad",  rev: "₹2.4L", growth: "+3%",  status: "amber", label: "Mid" },
  { name: "Shop 29 – Calicut",   rev: "₹2.1L", growth: "-2%",  status: "amber", label: "Watch" },
];

const topProducts = [
  { name: "EWH Geyser 25L",    units: "1,240", pct: 92, color: COLORS.purple },
  { name: "Concealed Cistern", units: "980",   pct: 76, color: COLORS.purple },
  { name: "LED Ceiling Fan 48\"", units: "870", pct: 68, color: COLORS.blue },
  { name: "Smart TV 43\"",     units: "740",   pct: 58, color: COLORS.green },
  { name: "MCB Switchgear 10A", units: "680",  pct: 53, color: COLORS.blue },
];

export default function Overview() {
  return (
    <div>
      <div className="page-header">
        <h1>Business Overview</h1>
        <p>Centralized snapshot across all 32 shops and the godown — April 2026</p>
      </div>

      <div className="kpi-grid">
        <KpiCard label="Total Revenue (Apr)" value="₹48.6L" delta="▲ +12% vs Mar" deltaType="up" />
        <KpiCard label="Net Profit (Apr)"    value="₹9.2L"  delta="▲ +8% vs Mar"  deltaType="up" />
        <KpiCard label="Total Expenditure"   value="₹39.4L" delta="▲ +5% vs Mar"  deltaType="down" />
        <KpiCard label="Active Shops"        value="32"     delta="2 new this month" deltaType="up" />
        <KpiCard label="Godown Stock Value"  value="₹1.2Cr" delta="8,420 SKUs"     deltaType="muted" />
        <KpiCard label="Total Manpower"      value="214"    delta="▲ +4 this month" deltaType="up" />
        <KpiCard label="Active Suppliers"    value="67"     delta="12 new"          deltaType="up" />
        <KpiCard label="Pending Orders"      value="134"    delta="▼ 24 overdue"    deltaType="down" />
      </div>

      <div className="grid-2">
        <ChartCard title="Monthly Revenue vs Expenditure (₹L)" height={200}
          legend={[{label:"Revenue",color:COLORS.blue},{label:"Expenditure",color:COLORS.red},{label:"Profit",color:COLORS.green}]}>
          <RevExpChart />
        </ChartCard>
        <ChartCard title="Category-wise Sales Share" height={200}
          legend={[{label:"Sanitary 38%",color:COLORS.purple},{label:"Electrical 27%",color:COLORS.blue},{label:"Electronics 22%",color:COLORS.green},{label:"Other 13%",color:COLORS.amber}]}>
          <CategoryDonut />
        </ChartCard>
      </div>

      <div className="grid-3">
        <div className="card">
          <div className="card-title">Top 5 Performing Shops</div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Shop</th><th>Revenue</th><th>Growth</th><th>Status</th></tr></thead>
              <tbody>
                {topShops.map(s => (
                  <tr key={s.name}>
                    <td>{s.name}</td>
                    <td style={{ fontFamily: "var(--mono)" }}>{s.rev}</td>
                    <td style={{ color: s.growth.startsWith("+") ? "var(--green)" : "var(--red)" }}>{s.growth}</td>
                    <td><Badge type={s.status}>{s.label}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Top Demanded Products</div>
          {topProducts.map(p => (
            <div key={p.name} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "var(--text)" }}>{p.name}</span>
                <span style={{ color: "var(--text2)", fontFamily: "var(--mono)" }}>{p.units}</span>
              </div>
              <div className="prog-wrap">
                <div className="prog-fill" style={{ width: `${p.pct}%`, background: p.color }} />
              </div>
            </div>
          ))}
        </div>

        <ChartCard title="Expenditure Breakdown" height={190}
          legend={[{label:"Procurement 52%",color:COLORS.purple},{label:"Salaries 18%",color:COLORS.amber},{label:"Logistics 14%",color:COLORS.blue},{label:"Ops 10%",color:COLORS.red}]}>
          <ExpBreakdown />
        </ChartCard>
      </div>
    </div>
  );
}
