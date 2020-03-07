import React, { FC } from 'react'

import Log from './Log'
import Pointer from './Pointer'

const App: FC = () => {
  return (
    <>
      <h1>Web Monetization Events</h1>
      <Pointer />
      <Log />
    </>
  )
}

export default App;
