import React, { FC, useState } from 'react'
import { MonetizationEventMap } from 'types-wm'
import { useListener } from 'react-hook-wm'

import { Filters } from './shared'

type MonetizationEvent = MonetizationEventMap[keyof MonetizationEventMap]

interface EntriesProps {
  filters: Filters
}

const Entries: FC<EntriesProps> = ({ filters }) => {
  const [log, setLog] = useState<MonetizationEvent[]>([])

  function handleMonetization (event: MonetizationEvent) {
    setLog(log => [event, ...log])
  }

  useListener({
    onPending: handleMonetization,
    onStart: handleMonetization,
    onProgress: handleMonetization,
    onStop: handleMonetization
  })

  return (
    <>
      {log.filter(({ type }) => filters[type]).map(({ type, detail }) => (
        <>
          <h3>{type}</h3>
          <pre>{JSON.stringify(detail, null, 2)}</pre>
        </>
      ))}
    </>
  )
}

export default Entries
