import React from 'react'
import Flow from './components/Flow'
import Filter from './components/Filter'
import "./index.css"

const App = () => {
  return (
    <div>
      <div>
        <Flow />
      </div>
      <div>
        <Filter />
      </div>
    </div>
  )
}

export default App