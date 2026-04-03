import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import KpiCard from "../components/KpiCard";
import ChartCard from "../components/ChartCard";
import Badge from "../components/Badge";
import { COLORS, chartDefaults } from "../data/chartData";

function StockLevels() {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["Sanitary","Electrical","Electronics","Plumbing","Hardware"],
        datasets: [
          { label: "In Godown", data: [2400,1800,980,640,380], backgroundColor: COLORS.purple, borderRadius: 3 },
          { label: "In Shops",  data: [1200,900,540,320,260],  backgroundColor: COLORS.blue,   borderRadius: 3 },
        ],
      },
      options: { ...chartDefaults },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

function GdFlow() {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "line",
      data: {
        labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
        datasets: [
          { label: "Gate-In",    data: [340,280,420,360,300,240,180], borderColor: COLORS.green, fill: false, tension: 0.3 },
          { label: "Dispatched", data: [520,480,560,510,440,380,220], borderColor: COLORS.red,   fill: false, tension: 0.3 },
        ],
      },
      options: { ...chartDefaults },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

const alerts = [
  { product:"EWH Geyser 15L",    cat:"Electrical", qty:12, reorder:50, lead:"7 days",  status:"red",   label:"Urgent" },
  { product:"Wash Basin Premium", cat:"Sanitary",  qty:28, reorder:40, lead:"5 days",  status:"amber", label:"Reorder" },
  { product:"BLDC Fan 52\"",     cat:"Electrical", qty:34, reorder:60, lead:"10 days", status:"amber", label:"Reorder" },
  { product:"Smart TV 55\" 4K",  cat:"Electronics",qty:8,  reorder:20, lead:"14 days", status:"red",   label:"Urgent" },
  { product:"PVC Pipe 1\" 3m",   cat:"Sanitary",   qty:45, reorder:80, lead:"3 days",  status:"amber", label:"Reorder" },
];

export default function Inventory() {
  return (
    <div>
      <div className="page-header">
        <h1>Inventory Management</h1>
        <p>Godown stock levels, dispatch flow, and reorder alerts across all SKUs</p>
      </div>

      <div className="kpi-grid">
        <KpiCard label="Total SKUs"        value="8,420" delta="Godown + Shops"    deltaType="muted" />
        <KpiCard label="Godown Stock Value" value="₹1.2Cr" delta="▲ Healthy level" deltaType="up" />
        <KpiCard label="Low Stock Alerts"  value="48"    delta="▼ Needs reorder"   deltaType="down" />
        <KpiCard label="Gate-In Today"     value="340"   delta="Units received"    deltaType="muted" />
        <KpiCard label="Dispatched Today"  value="520"   delta="To 18 shops"      deltaType="muted" />
      </div>

      <div className="grid-2">
        <ChartCard title="Category Stock Levels (Units)" height={240}
          legend={[{label:"In Godown",color:COLORS.purple},{label:"In Shops",color:COLORS.blue}]}>
          <StockLevels />
        </ChartCard>
        <ChartCard title="Godown Gate-In vs Dispatch (Weekly)" height={240}
          legend={[{label:"Gate-In",color:COLORS.green},{label:"Dispatched",color:COLORS.red}]}>
          <GdFlow />
        </ChartCard>
      </div>

      <div className="card">
        <div className="card-title">Low Stock & Reorder Alerts</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Product</th><th>Category</th><th>Current Qty</th><th>Reorder Level</th><th>Lead Time</th><th>Action</th></tr>
            </thead>
            <tbody>
              {alerts.map(a => (
                <tr key={a.product}>
                  <td style={{ fontWeight: 500 }}>{a.product}</td>
                  <td style={{ color: "var(--text2)" }}>{a.cat}</td>
                  <td style={{ fontFamily: "var(--mono)", color: a.qty < 20 ? "var(--red)" : "var(--amber)" }}>{a.qty}</td>
                  <td style={{ fontFamily: "var(--mono)", color: "var(--text2)" }}>{a.reorder}</td>
                  <td>{a.lead}</td>
                  <td><Badge type={a.status}>{a.label}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
