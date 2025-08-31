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
    <div className="menutop">
      <div className="menu-row">
        {LETTERS.map((l, idx) => (
          <button
            key={l}
            className={`menu ${selected === l ? "menuSelected" : ""} ${idx===0?"first":""} ${idx===LETTERS.length-1?"last":""}`}
            onClick={() => setSelected(selected === l ? null : l)}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="year-row">
        <button onClick={() => setYear(Math.max(1000, year - 1))}>◀ {year - 1}</button>
        <div className="year-label">{year}</div>
        <button onClick={() => setYear(Math.min(9999, year + 1))}>{year + 1} ▶</button>
      </div>
    </div>
  );
}
