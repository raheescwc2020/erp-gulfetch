import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import KpiCard from "../components/KpiCard";
import ChartCard from "../components/ChartCard";
import Badge from "../components/Badge";
import { COLORS, chartDefaults } from "../data/chartData";

const suppliers = [
  { name:"Hindware Ltd",   cat:"Sanitary",    ytd:"₹18.4L", ontime:"91%", credit:"45 days", rating:"green",  label:"A+" },
  { name:"Finolex Cables", cat:"Electrical",  ytd:"₹14.2L", ontime:"88%", credit:"30 days", rating:"green",  label:"A" },
  { name:"Havells India",  cat:"Electrical",  ytd:"₹12.8L", ontime:"79%", credit:"30 days", rating:"amber",  label:"B+" },
  { name:"Samsung India",  cat:"Electronics", ytd:"₹11.6L", ontime:"83%", credit:"60 days", rating:"green",  label:"A" },
  { name:"Parryware",      cat:"Sanitary",    ytd:"₹9.4L",  ontime:"86%", credit:"45 days", rating:"green",  label:"A" },
  { name:"LG Electronics", cat:"Electronics", ytd:"₹8.2L",  ontime:"72%", credit:"60 days", rating:"amber",  label:"B" },
  { name:"Polycab Wires",  cat:"Electrical",  ytd:"₹7.6L",  ontime:"94%", credit:"30 days", rating:"green",  label:"A+" },
  { name:"Cera Sanitaryware",cat:"Sanitary",  ytd:"₹6.8L",  ontime:"65%", credit:"30 days", rating:"red",    label:"C" },
];

function SupplierSpend() {
  const ref = useRef();
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: suppliers.map(s => s.name.split(" ")[0]),
        datasets: [{ label: "₹L", data: [18.4,14.2,12.8,11.6,9.4,8.2,7.6,6.8], backgroundColor: COLORS.purple, borderRadius: 4 }],
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

function SupplierOTD() {
  const ref = useRef();
  useEffect(() => {
    const otd = [94,91,88,86,83,79,72,65];
    const chart = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["Polycab","Hindware","Finolex","Parryware","Samsung","Havells","LG","Cera"],
        datasets: [{
          label: "On-Time %",
          data: otd,
          backgroundColor: otd.map(v => v >= 85 ? COLORS.green : v >= 75 ? COLORS.amber : COLORS.red),
          borderRadius: 4,
        }],
      },
      options: {
        indexAxis: "y",
        ...chartDefaults,
        scales: {
          x: { ...chartDefaults.scales.x, min: 50, max: 100, ticks: { ...chartDefaults.scales.x.ticks, callback: v => v + "%" } },
          y: { ...chartDefaults.scales.y },
        },
      },
    });
    return () => chart.destroy();
  }, []);
  return <canvas ref={ref} />;
}

export default function Suppliers() {
  return (
    <div>
      <div className="page-header">
        <h1>Supplier Management</h1>
        <p>Procurement spend, on-time delivery performance, and supplier ratings</p>
      </div>

      <div className="kpi-grid">
        <KpiCard label="Active Suppliers"   value="67"      delta="▲ 12 new"       deltaType="up" />
        <KpiCard label="Top Supplier Spend" value="₹4.8L"   delta="Hindware"       deltaType="muted" />
        <KpiCard label="On-Time Delivery"   value="84%"     delta="▼ Target: 92%"  deltaType="down" />
        <KpiCard label="Avg Lead Time"      value="8.4 days" delta="All suppliers"  deltaType="muted" />
      </div>

      <div className="grid-2">
        <ChartCard title="Top Suppliers by Purchase Value (₹L)" height={300}
          legend={[{label:"YTD Purchase",color:COLORS.purple}]}>
          <SupplierSpend />
        </ChartCard>
        <ChartCard title="On-Time Delivery Rate (%)" height={300}
          legend={[{label:"≥85% Good",color:COLORS.green},{label:"75–84% Watch",color:COLORS.amber},{label:"<75% Poor",color:COLORS.red}]}>
          <SupplierOTD />
        </ChartCard>
      </div>

      <div className="card">
        <div className="card-title">Supplier Performance Matrix</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Supplier</th><th>Category</th><th>YTD Purchases</th><th>On-Time %</th><th>Credit Days</th><th>Rating</th></tr></thead>
            <tbody>
              {suppliers.map(s => (
                <tr key={s.name}>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td style={{ color: "var(--text2)" }}>{s.cat}</td>
                  <td style={{ fontFamily: "var(--mono)" }}>{s.ytd}</td>
                  <td style={{ fontFamily: "var(--mono)", color: parseFloat(s.ontime) >= 85 ? "var(--green)" : parseFloat(s.ontime) >= 75 ? "var(--amber)" : "var(--red)" }}>{s.ontime}</td>
                  <td style={{ color: "var(--text2)" }}>{s.credit}</td>
                  <td><Badge type={s.rating}>{s.label}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
