import React, { FC, useState, useEffect, useCallback, ChangeEvent } from "react";

declare global {
  interface Document {
    monetization?: any
  }
}

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

  useEffect(() => {
    const { monetization } = document

    if (!monetization) return

    function handleMonetization (event: any) {
      setLog(log => [
        [event.type, JSON.stringify(event.detail, null, 2)],
        ...log
      ])
    }

    monetization.addEventListener('monetizationpending', handleMonetization)
    monetization.addEventListener('monetizationstart', handleMonetization)
    monetization.addEventListener('monetizationprogress', handleMonetization)
    monetization.addEventListener('monetizationstop', handleMonetization)

    return () => {
      monetization.removeEventListener('monetizationpending', handleMonetization)
      monetization.removeEventListener('monetizationstart', handleMonetization)
      monetization.removeEventListener('monetizationprogress', handleMonetization)
      monetization.removeEventListener('monetizationstop', handleMonetization)
    }
  }, [])

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
