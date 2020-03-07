import React, { FC, Fragment } from 'react'
import { MonetizationEvent } from 'types-wm'
import { ListenerReducer, useReducedListener } from 'react-hook-wm'

import { Filters } from './shared'

interface EntriesProps {
  filters: Filters
}

const eventsReducer: ListenerReducer<MonetizationEvent[]> = (prevEvents, event) => {
  return [event, ...prevEvents]
}

const Events: FC<EntriesProps> = ({ filters }) => {
  const events = useReducedListener(eventsReducer, [])

  return (
    <>
      {events.filter((event) => filters[event.type]).map((event) => (
        <Fragment key={`${event.type}:${event.timeStamp}`}>
          <h3>{event.type}:{event.timeStamp}</h3>
          <pre>{JSON.stringify(event.detail, null, 2)}</pre>
        </Fragment>
      ))}
    </>
  )
}

export default Events
