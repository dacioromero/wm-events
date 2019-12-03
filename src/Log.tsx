import React, { FC, useState, useCallback, ChangeEvent } from "react";
import { useListener } from 'react-hook-wm'

const initialFilter = {
  monetizationpending: true,
  monetizationstart: true ,
  monetizationprogress: false,
  monetizationstop: true
}

const Log: FC = () => {
  const [log, setLog] = useState<[string, string][]>([])
  const [filter, setFilter] = useState(initialFilter)

  const handleFilterChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target

    setFilter(filter => ({
      ...filter,
      [name]: checked
    }))
  }, [])


  function handleMonetization (event: any) {
    setLog(log => [
      [event.type, JSON.stringify(event.detail, null, 2)],
      ...log
    ])
  }

  useListener({
    onPending: handleMonetization,
    onStart: handleMonetization,
    onProgress: handleMonetization,
    onStop: handleMonetization
  })

  const filterSet = new Set(Object.entries(filter).filter(([, value]) => value).map(([name]) => name))

  return (
    <>
      {Object.entries(filter).map(([name, value]) => (
        <label>
          <input onChange={handleFilterChange} type='checkbox' checked={value} name={name} />
          {name}
        </label>
      ))}
      {log.filter(([name]) => filterSet.has(name)).map(([name, detail]) => (
        <>
          <h3>{name}</h3>
          <pre>{detail}</pre>
        </>
      ))}
    </>
  )
}

export default Log
