import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import KpiCard from "../components/KpiCard";
import ChartCard from "../components/ChartCard";
import Badge from "../components/Badge";
import { MONTHS, COLORS, chartDefaults } from "../data/chartData";

function PurchaseTrend() {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "line",
      data: {
        labels: MONTHS,
        datasets: [{
          label: "Purchases ₹L",
          data: [18.2,16.8,20.4,22.1,17.6,15.8,24.4,18.9,16.4,15.1,17.6,16.2],
          borderColor: COLORS.purple,
          fill: true,
          backgroundColor: "rgba(124,92,252,0.08)",
          tension: 0.4,
        }],
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

function PurchaseCat() {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: ["Sanitary","Electrical","Electronics","Other"],
        datasets: [{ data: [40,30,20,10], backgroundColor: [COLORS.purple,COLORS.blue,COLORS.green,COLORS.amber], borderWidth: 0 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: "58%" },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

const pos = [
  { no:"PO-2604", supplier:"Hindware Ltd",   cat:"Sanitary",   value:"₹1.8L", date:"03 Apr 26", status:"green", label:"Received" },
  { no:"PO-2603", supplier:"Finolex Cables",  cat:"Electrical", value:"₹2.4L", date:"02 Apr 26", status:"amber", label:"In Transit" },
  { no:"PO-2602", supplier:"Samsung India",   cat:"Electronics",value:"₹4.2L", date:"01 Apr 26", status:"amber", label:"Pending" },
  { no:"PO-2601", supplier:"Parryware",       cat:"Sanitary",   value:"₹1.2L", date:"31 Mar 26", status:"green", label:"Received" },
  { no:"PO-2600", supplier:"Havells India",   cat:"Electrical", value:"₹3.1L", date:"30 Mar 26", status:"red",   label:"Overdue" },
];

export default function Purchases() {
  return (
    <div>
      <div className="page-header">
        <h1>Purchase Management</h1>
        <p>Purchase orders, trends, and category-wise procurement analysis</p>
      </div>

      <div className="kpi-grid">
        <KpiCard label="Purchase (Apr)"  value="₹22.4L" delta="▲ +8% vs Mar"   deltaType="down" />
        <KpiCard label="YTD Purchases"   value="₹2.1Cr" delta="4 months"       deltaType="muted" />
        <KpiCard label="Open POs"        value="38"     delta="▼ 6 overdue"    deltaType="down" />
        <KpiCard label="Avg PO Value"    value="₹58K"   delta="▲ +4%"          deltaType="up" />
      </div>

      <div className="grid-2">
        <ChartCard title="Monthly Purchase Trend (₹L)" height={240}
          legend={[{label:"Purchases",color:COLORS.purple}]}>
          <PurchaseTrend />
        </ChartCard>
        <ChartCard title="Purchase by Category" height={240}
          legend={[{label:"Sanitary 40%",color:COLORS.purple},{label:"Electrical 30%",color:COLORS.blue},{label:"Electronics 20%",color:COLORS.green},{label:"Other 10%",color:COLORS.amber}]}>
          <PurchaseCat />
        </ChartCard>
      </div>

      <div className="card">
        <div className="card-title">Recent Purchase Orders</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>PO No.</th><th>Supplier</th><th>Category</th><th>Value</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {pos.map(p => (
                <tr key={p.no}>
                  <td style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}>{p.no}</td>
                  <td style={{ fontWeight: 500 }}>{p.supplier}</td>
                  <td style={{ color: "var(--text2)" }}>{p.cat}</td>
                  <td style={{ fontFamily: "var(--mono)" }}>{p.value}</td>
                  <td style={{ color: "var(--text2)" }}>{p.date}</td>
                  <td><Badge type={p.status}>{p.label}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
