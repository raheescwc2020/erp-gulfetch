import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Purchases from "./pages/Purchases";
import Manpower from "./pages/Manpower";
import Suppliers from "./pages/Suppliers";
import ProfitLoss from "./pages/ProfitLoss";
import GodownFlow from "./pages/GodownFlow";
import "./styles/global.css";

const PAGES = {
  overview: Overview,
  sales: Sales,
  inventory: Inventory,
  purchases: Purchases,
  manpower: Manpower,
  suppliers: Suppliers,
  profit: ProfitLoss,
  godown: GodownFlow,
};

export default function App() {
  const [activePage, setActivePage] = useState("overview");
  const PageComponent = PAGES[activePage];

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="main-content">
        <PageComponent />
      </main>
    </div>
  );
}
