import React, { FC, useState, useCallback, ChangeEvent } from "react";

import { Filters } from "./shared";
import Entries from "./Entries";

const initialFilters: Filters = {
  monetizationpending: true,
  monetizationstart: true ,
  monetizationprogress: false,
  monetizationstop: true
}

const Log: FC = () => {
  const [filters, setFilters] = useState(initialFilters)

  const handleFilterChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target

    setFilters(filter => ({
      ...filter,
      [name]: checked
    }))
  }, [])

  return (
    <>
      {Object.entries(filters).map(([type, checked]) => (
        <label key={type}>
          <input
            onChange={handleFilterChange}
            checked={checked}
            name={type}
            type='checkbox'
          />
          {type}
        </label>
      ))}
      <Entries filters={filters} />
    </>
  )
}

export default Log
