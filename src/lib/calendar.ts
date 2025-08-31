import type { Duty, Scale } from "./scales";
import { dutyForReforco, dutyForScale } from "./scales";

export type DayCell = {
  date: Date;           // a data real
  inMonth: boolean;     // pertence ao mês visível?
  dow: number;          // 0..6 (Dom..Sáb)
  dayIndex: number;     // índice do dia dentro do ano (0..364/365) - só para inMonth
  duties: Record<Scale, Duty>; // T/N/F por escala
};

export type MonthData = {
  month: number;        // 0..11
  label: string;        // "AGOSTO/2025"
  weeks: DayCell[][];   // [ [7 dias], [7 dias], ... ]
};

const PT_MONTHS = [
  "JANEIRO","FEVEREIRO","MARÇO","ABRIL","MAIO","JUNHO",
  "JULHO","AGOSTO","SETEMBRO","OUTUBRO","NOVEMBRO","DEZEMBRO"
];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function startOfYear(year: number) {
  return new Date(year, 0, 1);
}

export function buildYear(year: number): MonthData[] {
  // vamos caminhar dia a dia e manter um contador dayIndex (dentro do ano)
  let dayIndex = 0;
  const months: MonthData[] = [];

  for (let m = 0; m < 12; m++) {
    const label = `${PT_MONTHS[m]}/${year}`;
    const days = daysInMonth(year, m);

    // primeiro dia do mês
    const first = new Date(year, m, 1);
    const firstDow = first.getDay(); // 0=Dom

    const monthCells: DayCell[] = [];

    // preencher dias do mês anterior (off) até chegar ao domingo
    for (let k = 0; k < firstDow; k++) {
      const d = new Date(year, m, 1 - (firstDow - k));
      monthCells.push({
        date: d,
        inMonth: false,
        dow: d.getDay(),
        dayIndex: -1,
        duties: {
          A: "F", B: "F", C: "F", D: "F", E: "F", F: "F", R: dutyForReforco(d.getDay()),
        }
      });
    }

    // dias do mês (inMonth = true)
    for (let dnum = 1; dnum <= days; dnum++) {
      const d = new Date(year, m, dnum);
      const dow = d.getDay();

      // calcula duties para cada escala
      const duties = {
        A: dutyForScale("A", dayIndex, year),
        B: dutyForScale("B", dayIndex, year),
        C: dutyForScale("C", dayIndex, year),
        D: dutyForScale("D", dayIndex, year),
        E: dutyForScale("E", dayIndex, year),
        F: dutyForScale("F", dayIndex, year),
        R: dutyForReforco(dow),
      } as Record<Scale, Duty>;

      monthCells.push({
        date: d,
        inMonth: true,
        dow,
        dayIndex,
        duties,
      });

      dayIndex++;
    }

    // completar até sábado (6)
    const lastDow = new Date(year, m, days).getDay();
    for (let k = lastDow + 1; k <= 6; k++) {
      const d = new Date(year, m, days + (k - lastDow));
      monthCells.push({
        date: d,
        inMonth: false,
        dow: d.getDay(),
        dayIndex: -1,
        duties: {
          A: "F", B: "F", C: "F", D: "F", E: "F", F: "F", R: dutyForReforco(d.getDay()),
        }
      });
    }

    // quebre em semanas de 7
    const weeks: DayCell[][] = [];
    for (let i = 0; i < monthCells.length; i += 7) {
      weeks.push(monthCells.slice(i, i + 7));
    }

    months.push({ month: m, label, weeks });
  }

  return months;
}
