export type Scale = "A" | "B" | "C" | "D" | "E" | "F" | "R";
export type Duty = "T" | "N" | "F"; // T = turno (diurno), N = noite, F = folga

// sequências de cada escala, tendo como base 2014-01-01
const escalaA: Duty[] = ['N','F','F','F','T','T','T','T','T','N','F','F','F','T','T','T','T','T'];
const escalaB: Duty[] = ['T','T','T','T','N','N','F','F','F','T','T','T','T','N','N','F','F','F'];
const escalaC: Duty[] = ['F','T','T','T','T','T','N','F','F','F','T','T','T','T','T','N','F','F'];
const escalaD: Duty[] = ['T','N','N','F','F','F','T','T','T','T','N','N','F','F','F','T','T','T'];
const escalaE: Duty[] = ['T','T','T','N','F','F','F','T','T','T','T','T','N','F','F','F','T','T'];
const escalaF: Duty[] = ['F','F','F','T','T','T','T','N','N','F','F','F','T','T','T','T','N','N'];

export const SCALES: Record<Exclude<Scale, "R">, Duty[]> = {
  A: escalaA, B: escalaB, C: escalaC, D: escalaD, E: escalaE, F: escalaF,
};

// diferença de dias entre duas datas (UTC pra não dar zica de timezone)
function diffDays(a: Date, b: Date) {
  const ms = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate())
          - Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
  return Math.floor(ms / 86400000);
}

// offset por ano (âncora: 2014-01-01), normalizado para 0..8
export function offsetForYear(year: number) {
  const anchor = new Date(Date.UTC(2014, 0, 1));
  const start  = new Date(Date.UTC(year, 0, 1));
  const d = diffDays(start, anchor);
  const mod = ((d % 9) + 9) % 9; // sempre 0..8
  return mod;
}

// devolve o duty (T/N/F) de uma escala (A..F) para um índice de dia no ano
export function dutyForScale(scale: Exclude<Scale, "R">, dayIndex: number, year: number): Duty {
  const arr = SCALES[scale];
  const off = offsetForYear(year);
  const idx9 = ((dayIndex % 9) + 9) % 9; // 0..8
  const idx = (idx9 + off) % arr.length; // arr tem 18 itens
  return arr[idx];
}

// Escala R: trabalha seg-sex (T), folga sáb/dom (F)
export function dutyForReforco(dow: number): Duty {
  // dow: 0=Dom, 1=Seg, ... 6=Sáb (padrão JS)
  return dow >= 1 && dow <= 5 ? "T" : "F";
}
