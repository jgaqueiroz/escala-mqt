import { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import { Menu } from "./components/Menu";
import { Calendar } from "./components/Calendar";
import { buildYear } from "./lib/calendar";
import type { Scale } from "./lib/scales";

function getQueryParams(): { ano?: number; escala?: Scale } {
  const u = new URL(window.location.href);
  const ano = u.searchParams.get("ano");
  const escala = u.searchParams.get("escala") as Scale | null;
  return {
    ano: ano ? Math.max(1000, Math.min(9999, parseInt(ano, 10))) : undefined,
    escala: (escala && ["A","B","C","D","E","F","R"].includes(escala)) ? escala as Scale : undefined
  };
}

export default function App() {
  // ano inicial: querystring ?ano=YYYY ou o ano atual
  const now = new Date();
  const qp = getQueryParams();
  const [year, setYear] = useState<number>(qp.ano ?? now.getFullYear());
  const [selected, setSelected] = useState<Scale | null>(qp.escala ?? null);

  // recalcula meses quando o ano muda
  const months = useMemo(() => buildYear(year), [year]);

  // sincroniza querystring a cada mudança (preserva deep-link)
  useEffect(() => {
    const u = new URL(window.location.href);
    u.searchParams.set("ano", String(year));
    if (selected) u.searchParams.set("escala", selected);
    else u.searchParams.delete("escala");
    window.history.replaceState(null, "", u.toString());
  }, [year, selected]);

  // rola até o mês atual quando o ano mostrado for o atual
  useEffect(() => {
    if (year !== now.getFullYear()) return;
    const id = `mes-${now.getMonth()+1}`;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollBy({ top: -120, behavior: "smooth" }); // ajuste se tiver header fixo
    }
  }, [year]);

  return (
    <div className="app">
      <Menu selected={selected} setSelected={setSelected} year={year} setYear={setYear} />
      <Calendar months={months} selected={selected} />
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div>desenvolvido por <strong>José Gomes</strong></div>
    </div>
  );
}
