import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import KpiCard from "../components/KpiCard";
import ChartCard from "../components/ChartCard";
import Badge from "../components/Badge";
import { COLORS, chartDefaults } from "../data/chartData";

function DeptDonut() {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: ["Sales (128)","Logistics (36)","Godown (28)","Admin (22)"],
        datasets: [{ data: [128,36,28,22], backgroundColor: [COLORS.purple,COLORS.blue,COLORS.green,COLORS.amber], borderWidth: 0 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: "52%" },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

function AttendanceChart() {
  const ref = useRef();
  useEffect(() => {
    const data = [97,94,92,91,89,86];
    const chart = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["Admin","Godown","Sales-A","Logistics","Sales-B","Sales-C"],
        datasets: [{
          label: "Attendance %",
          data,
          backgroundColor: data.map(v => v >= 92 ? COLORS.green : v >= 88 ? COLORS.amber : COLORS.red),
          borderRadius: 4,
        }],
      },
      options: {
        ...chartDefaults,
        scales: {
          ...chartDefaults.scales,
          y: { ...chartDefaults.scales.y, min: 80, max: 100, ticks: { ...chartDefaults.scales.y.ticks, callback: v => v + "%" } },
        },
      },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

const staff = [
  { loc:"Head Office",          role:"Admin / Management", count:22, salary:"₹42K", attend:"97%", status:"green", label:"Excellent" },
  { loc:"Central Godown",       role:"Warehouse",          count:28, salary:"₹28K", attend:"94%", status:"green", label:"Good" },
  { loc:"Shop Cluster A (Kochi)",role:"Sales",             count:42, salary:"₹22K", attend:"92%", status:"green", label:"Good" },
  { loc:"Shop Cluster B (Thrissur)",role:"Sales",          count:38, salary:"₹21K", attend:"89%", status:"amber", label:"Average" },
  { loc:"Logistics Fleet",      role:"Drivers / Helpers",  count:36, salary:"₹24K", attend:"91%", status:"green", label:"Good" },
  { loc:"Shop Cluster C (North)",role:"Sales",             count:48, salary:"₹20K", attend:"86%", status:"amber", label:"Average" },
];

export default function Manpower() {
  return (
    <div>
      <div className="page-header">
        <h1>Manpower Overview</h1>
        <p>Headcount, attendance, salary expenses, and department performance</p>
      </div>

      <div className="kpi-grid">
        <KpiCard label="Total Staff"     value="214"    delta="▲ +4 this month" deltaType="up" />
        <KpiCard label="Godown Staff"    value="28"     delta="3 shifts"        deltaType="muted" />
        <KpiCard label="Sales Staff"     value="128"    delta="32 shops"        deltaType="muted" />
        <KpiCard label="Admin / HO"      value="22"     delta="Head office"     deltaType="muted" />
        <KpiCard label="Logistics"       value="36"     delta="14 vehicles"     deltaType="muted" />
        <KpiCard label="Salary Expense"  value="₹7.1L"  delta="Monthly total"  deltaType="muted" />
      </div>

      <div className="grid-2">
        <ChartCard title="Department-wise Headcount" height={240}
          legend={[{label:"Sales",color:COLORS.purple},{label:"Logistics",color:COLORS.blue},{label:"Godown",color:COLORS.green},{label:"Admin",color:COLORS.amber}]}>
          <DeptDonut />
        </ChartCard>
        <ChartCard title="Attendance Rate by Department (%)" height={240}>
          <AttendanceChart />
        </ChartCard>
      </div>

      <div className="card">
        <div className="card-title">Staff Details by Location</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Location</th><th>Role</th><th>Staff Count</th><th>Avg Salary</th><th>Attendance</th><th>Performance</th></tr></thead>
            <tbody>
              {staff.map(s => (
                <tr key={s.loc}>
                  <td style={{ fontWeight: 500 }}>{s.loc}</td>
                  <td style={{ color: "var(--text2)" }}>{s.role}</td>
                  <td style={{ fontFamily: "var(--mono)" }}>{s.count}</td>
                  <td style={{ fontFamily: "var(--mono)" }}>{s.salary}</td>
                  <td style={{ fontFamily: "var(--mono)", color: parseFloat(s.attend) >= 92 ? "var(--green)" : "var(--amber)" }}>{s.attend}</td>
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
