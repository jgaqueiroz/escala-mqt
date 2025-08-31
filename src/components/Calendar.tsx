import type { Scale } from "../lib/scales";
import type { MonthData, DayCell } from "../lib/calendar";

type Props = {
  months: MonthData[];
  selected: Scale | null;
};

const DIA_LETTERS = ["D","S","T","Q","Q","S","S"]; // Dom..Sáb

export function Calendar({ months, selected }: Props) {
  return (
    <div className="content">
      {/* TOPO FIXO: barra com iniciais dos dias da semana */}
      <div className="week-header">
        {DIA_LETTERS.map((d) => (
          <div key={d} style={{textAlign:"center"}}>{d}</div>
        ))}
      </div>

      {/* Meses: cada título é sticky logo abaixo da barra dos dias */}
      {months.map((m) => (
        <section key={m.month} id={`mes-${m.month+1}`} className={`month mes${m.month+1}`}>
          <div className="month-title">{m.label}</div>

          <div className="weeks">
            {m.weeks.map((w, wi) => (
              <div key={wi} className="week">
                {w.map((cell, di) => (
                  <Day key={di} cell={cell} selected={selected} />
                ))}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Day({ cell, selected }: { cell: DayCell; selected: Scale | null }) {
  const n = cell.date.getDate();
  const isSunday = cell.dow === 0;

  const duty = selected ? cell.duties[selected] : null; // "T" | "N" | "F" | null
  const cls = [
    "day",
    cell.inMonth ? "in" : "off",
    isSunday ? "domingo" : "",
    duty === "T" ? "highlightT" : "",
    duty === "N" ? "highlightN" : "",
    duty === "F" ? "highlightF" : "",
    selected && !cell.inMonth ? "diaoffSome" : "",
  ].filter(Boolean).join(" ");

  return <div className={cls}>{String(n).padStart(2, "0")}</div>;
}
