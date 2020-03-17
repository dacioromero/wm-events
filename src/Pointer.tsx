import React, { useState, FC, ChangeEvent } from 'react'
// @ts-ignore
import { Helmet } from 'react-helmet/es/Helmet'

const tipbot = '$coil.xrptipbot.com/7UT9ayR4TgK5U4sqcd3y_g'
const stronghold = '$pay.stronghold.co/1a1263c3795a7d24987bf8ff352503fdab9'

const Pointer: FC = () => {
  const [pointer, setPointer] = useState(tipbot)

  function handleChange (event: ChangeEvent<HTMLInputElement>): void {
    setPointer(event.target.value)
  }

  return (
    <>
      <Helmet>
        <meta
          name='monetization'
          content={pointer}
        />
      </Helmet>
      <label>
        <input
          type='radio'
          name='pointer'
          value={tipbot}
          onChange={handleChange}
          checked={pointer === tipbot}
        />
        XRP TipBot
      </label>
      <label>
        <input
          type='radio'
          name='pointer'
          value={stronghold}
          onChange={handleChange}
          checked={pointer === stronghold}
        />
        Stronghold
      </label>
      <pre>{pointer}</pre>
    </>
  )
}

export default Pointer
