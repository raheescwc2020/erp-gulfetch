const NAV_ITEMS = [
  { id: "overview",   label: "Overview",    icon: "⬡" },
  { id: "sales",      label: "Sales",       icon: "◈" },
  { id: "inventory",  label: "Inventory",   icon: "▦" },
  { id: "purchases",  label: "Purchases",   icon: "◎" },
  { id: "manpower",   label: "Manpower",    icon: "◉" },
  { id: "suppliers",  label: "Suppliers",   icon: "◐" },
  { id: "profit",     label: "Profit & Loss", icon: "◆" },
  { id: "godown",     label: "Godown Flow", icon: "◫" },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside style={{
      width: 220, flexShrink: 0, background: "#0b0e14",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      display: "flex", flexDirection: "column", padding: "24px 0",
    }}>
      <div style={{ padding: "0 20px 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#e8eaf0", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          ERP Portal
        </div>
        <div style={{ fontSize: 11, color: "#555b6e", marginTop: 2 }}>
          Centralized Godown · 32 Shops
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        {NAV_ITEMS.map(item => {
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "9px 20px", background: active ? "rgba(79,142,247,0.1)" : "transparent",
                border: "none", borderLeft: active ? "2px solid #4f8ef7" : "2px solid transparent",
                color: active ? "#4f8ef7" : "#8b90a0", cursor: "pointer",
                fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                transition: "all .15s", textAlign: "left",
              }}
            >
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 11, color: "#555b6e" }}>Live · April 2026</div>
        <div style={{ fontSize: 11, color: "#34d399", marginTop: 2 }}>● System Online</div>
      </div>
    </aside>
  );
}
