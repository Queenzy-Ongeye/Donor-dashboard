import React, { createContext, useContext, useState } from "react";

interface Filters {
  startDate: Date;
  endDate: Date;
  county: string;
  subCounty: string;
  wardId: string;
  schoolId: string;
}

interface FilterContextType {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  apiData: any;
  setApiData: React.Dispatch<React.SetStateAction<any>>;
}

const FilterContext = createContext<FilterContextType>({
  filters: {
    startDate: new Date(Date.parse("2023-08-28")),
    endDate: new Date(),
    county: "",
    subCounty: "",
    wardId: "",
    schoolId: "",
  },
  setFilters: () => "",
  apiData: [],
  setApiData: (): any => "",
});

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filters>({
    startDate: new Date(Date.parse("2023-08-28")),
    endDate: new Date(),
    county: "",
    subCounty: "",
    wardId: "",
    schoolId: "",
  });

  const [apiData, setApiData] = useState<any | []>([]);

  return (
    <FilterContext.Provider
      value={{ filters, setFilters, apiData, setApiData }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilterContext = () => useContext(FilterContext);
