import { filterValues, type Filters } from "../types";

const buttons = Object.values(filterValues);

interface FilterButtonsProps {
  activeFilter: Filters;
  onFilterChange: (filter: (typeof buttons)[number]) => void;
}

export default function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="grid">
      <div></div>
      {buttons.map((button) => (
        <button
          key={button}
          className={`outline ${button == activeFilter ? "contrast" : "secondary"}`}
          onClick={() => onFilterChange(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
}
