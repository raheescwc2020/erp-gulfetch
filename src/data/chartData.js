export const MONTHS = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];

export const REVENUE  = [48.6,44.2,46.8,50.1,42.3,38.9,52.1,44.2,40.8,38.4,43.4,41.0];
export const EXPENSE  = [39.4,36.8,38.2,40.5,35.1,32.4,41.7,35.4,33.0,31.2,34.9,33.6];
export const PROFIT   = REVENUE.map((r, i) => Math.round((r - EXPENSE[i]) * 10) / 10);

export const COLORS = {
  blue:   "#4f8ef7",
  purple: "#7c5cfc",
  green:  "#34d399",
  amber:  "#fbbf24",
  red:    "#f87171",
  teal:   "#22d3ee",
  pink:   "#f472b6",
  orange: "#fb923c",
};

export const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: {
      ticks: { color: "#555b6e", font: { size: 10, family: "'DM Mono'" } },
      grid:  { color: "rgba(255,255,255,0.04)" },
      border:{ color: "rgba(255,255,255,0.06)" },
    },
    y: {
      ticks: { color: "#555b6e", font: { size: 10, family: "'DM Mono'" } },
      grid:  { color: "rgba(255,255,255,0.04)" },
      border:{ color: "rgba(255,255,255,0.06)" },
    },
  },
};
