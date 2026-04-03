import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import KpiCard from "../components/KpiCard";
import ChartCard from "../components/ChartCard";
import Badge from "../components/Badge";
import { COLORS, chartDefaults } from "../data/chartData";

function FlowChart() {
  const ref = useRef();
  useEffect(() => {
    const days = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(2026, 3, 3 - (13 - i));
      return `${d.getDate()}/${d.getMonth() + 1}`;
    });
    const chart = new Chart(ref.current, {
      type: "line",
      data: {
        labels: days,
        datasets: [
          { label: "Gate-In",    data: [280,340,310,420,380,290,220,300,360,410,340,270,310,340], borderColor: COLORS.green,  fill: false, tension: 0.3, pointBackgroundColor: COLORS.green },
          { label: "Dispatched", data: [360,520,480,560,500,410,280,440,510,560,480,380,490,520], borderColor: COLORS.purple, fill: false, tension: 0.3, pointBackgroundColor: COLORS.purple },
        ],
      },
      options: { ...chartDefaults },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

function DistDonut() {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: ["Kochi Cluster","Thrissur Cluster","North Kerala","South Kerala","Central"],
        datasets: [{ data: [28,22,18,20,12], backgroundColor: [COLORS.purple,COLORS.blue,COLORS.green,COLORS.amber,COLORS.red], borderWidth: 0 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: "52%" },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

const dispatches = [
  { no:"DSP-1840", shop:"Shop 07 Ernakulam", product:"Geyser 25L",        qty:24, vehicle:"KL-07-TX-4421", eta:"11:30 AM", status:"green", label:"Delivered" },
  { no:"DSP-1841", shop:"Shop 14 Thrissur",  product:"Concealed Cistern", qty:18, vehicle:"KL-09-BX-2210", eta:"1:00 PM",  status:"amber", label:"In Transit" },
  { no:"DSP-1842", shop:"Shop 03 Kochi",     product:"MCB Switchgear",    qty:60, vehicle:"KL-07-MK-8830", eta:"2:30 PM",  status:"amber", label:"In Transit" },
  { no:"DSP-1843", shop:"Shop 21 Palakkad",  product:"LED Fan 48\"",      qty:32, vehicle:"KL-10-NZ-1102", eta:"4:00 PM",  status:"amber", label:"Loading" },
  { no:"DSP-1844", shop:"Shop 29 Calicut",   product:"Smart TV 43\"",     qty:10, vehicle:"KL-07-TX-9945", eta:"Tomorrow", status:"blue",  label:"Planned" },
];

export default function GodownFlow() {
  return (
    <div>
      <div className="page-header">
        <h1>Godown Flow</h1>
        <p>Gate-in receipts, dispatch logs, vehicle tracking, and shop distribution</p>
      </div>

      <div className="kpi-grid">
        <KpiCard label="Gate-In Today"    value="340"   delta="From 6 suppliers" deltaType="muted" />
        <KpiCard label="Dispatched Today" value="520"   delta="To 18 shops"      deltaType="muted" />
        <KpiCard label="Current Stock"    value="8,420" delta="Total units"       deltaType="muted" />
        <KpiCard label="Utilization"      value="74%"   delta="Of total capacity" deltaType="muted" />
        <KpiCard label="Vehicles Active"  value="9/14"  delta="5 available"      deltaType="muted" />
      </div>

      <div className="grid-2">
        <ChartCard title="Gate-In vs Dispatch Flow — Last 14 Days" height={240}
          legend={[{label:"Gate-In",color:COLORS.green},{label:"Dispatched",color:COLORS.purple}]}>
          <FlowChart />
        </ChartCard>
        <ChartCard title="Stock Distribution to Shop Clusters (%)" height={240}
          legend={[{label:"Kochi 28%",color:COLORS.purple},{label:"Thrissur 22%",color:COLORS.blue},{label:"North 18%",color:COLORS.green},{label:"South 20%",color:COLORS.amber},{label:"Central 12%",color:COLORS.red}]}>
          <DistDonut />
        </ChartCard>
      </div>

      <div className="card">
        <div className="card-title">Recent Dispatch Log</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Dispatch No.</th><th>To Shop</th><th>Product</th><th>Qty</th><th>Vehicle</th><th>ETA</th><th>Status</th></tr></thead>
            <tbody>
              {dispatches.map(d => (
                <tr key={d.no}>
                  <td style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}>{d.no}</td>
                  <td style={{ fontWeight: 500 }}>{d.shop}</td>
                  <td style={{ color: "var(--text2)" }}>{d.product}</td>
                  <td style={{ fontFamily: "var(--mono)" }}>{d.qty}</td>
                  <td style={{ fontFamily: "var(--mono)", color: "var(--text2)" }}>{d.vehicle}</td>
                  <td>{d.eta}</td>
                  <td><Badge type={d.status}>{d.label}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
