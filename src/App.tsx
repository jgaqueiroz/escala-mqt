import { useEffect, useMemo, useState } from "react";
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
  const now = new Date();
  const qp = getQueryParams();

  const [year, setYear] = useState<number>(qp.ano ?? now.getFullYear());
  const [selected, setSelected] = useState<Scale | null>(qp.escala ?? null);

  const months = useMemo(() => buildYear(year), [year]);

  // mantém ?ano= e ?escala= na URL
  useEffect(() => {
    const u = new URL(window.location.href);
    u.searchParams.set("ano", String(year));
    if (selected) u.searchParams.set("escala", selected);
    else u.searchParams.delete("escala");
    window.history.replaceState(null, "", u.toString());
  }, [year, selected]);

  // rola para o mês atual quando o ano = ano atual
  useEffect(() => {
    if (year !== now.getFullYear()) return;
    const id = `mes-${now.getMonth() + 1}`;
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 50; // --weekbar-h
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [year]);

  return (
    <div className="app">
      <Calendar months={months} selected={selected} />
      <Menu selected={selected} setSelected={setSelected} year={year} setYear={setYear} />
    </div>
  );
}
