import { useState } from "react";
import { filterValues, type Filters } from "../types";


export function useFilters() {
  const [activeFilter, setActiveFilter] = useState<Filters>(filterValues.all);

  function handleFilterChange(filter: Filters) {
    setActiveFilter(filter);
  }

  return {
    activeFilter,
    handleFilterChange,
  };
}