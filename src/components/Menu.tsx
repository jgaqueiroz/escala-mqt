import type { Scale } from "../lib/scales";

type Props = {
  selected: Scale | null;
  setSelected: (s: Scale | null) => void;
  year: number;
  setYear: (y: number) => void;
};

const LETTERS: Scale[] = ["A","B","C","D","E","F","R"];

export function Menu({ selected, setSelected, year, setYear }: Props) {
  return (
    <footer className="footer">
      {/* seletor de ano - linha superior do rodapé */}
      <div className="year-row">
        <button onClick={() => setYear(Math.max(1000, year - 1))}>◀ {year - 1}</button>
        <div className="year-label">{year}</div>
        <button onClick={() => setYear(Math.min(9999, year + 1))}>{year + 1} ▶</button>
      </div>

      {/* letras das escalas - linha inferior do rodapé */}
      <div className="scales-row">
        {LETTERS.map((l, idx) => (
          <button
            key={l}
            className={`scale-btn ${selected === l ? "active" : ""}`}
            onClick={() => setSelected(selected === l ? null : l)}
            aria-pressed={selected === l}
          >
            {l}
          </button>
        ))}
      </div>
    </footer>
  );
}
