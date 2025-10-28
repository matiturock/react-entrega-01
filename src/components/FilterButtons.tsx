import { filterValues } from "../types";

const buttons = Object.values(filterValues);

interface FilterButtonsProps {
  onFilterChange: (filter: typeof buttons[number]) => void;
}

export default function FilterButtons(props: FilterButtonsProps) {
  const { onFilterChange } = props;

  return (
    <div className="grid">
      {buttons.map((button) => (
        <button
          key={button}
          className="outline contrast"
          onClick={() => onFilterChange(button)}>
          {button}
        </button>
      ))}
    </div>
  );
}