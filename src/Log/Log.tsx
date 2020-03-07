import React, { FC, useState, ChangeEvent } from 'react'

import { Filters } from './shared'
import Events from './Events'

const initialFilters: Filters = {
  monetizationpending: true,
  monetizationstart: true ,
  monetizationprogress: false,
  monetizationstop: true
}

const Log: FC = () => {
  const [filters, setFilters] = useState(initialFilters)

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target

    setFilters(filter => ({
      ...filter,
      [value]: checked
    }))
  }

  return (
    <>
      {Object.entries(filters).map(([value, checked]) => (
        <label key={value}>
          <input
            onChange={handleFilterChange}
            checked={checked}
            value={value}
            name='filters'
            type='checkbox'
          />
          {value}
        </label>
      ))}
      <Events filters={filters} />
    </>
  )
}

export default Log
