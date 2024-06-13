import React from 'react'
import Flow from './components/Flow'
import Filter from './components/Filter'
import "./index.css"
import FilterBar from './components/Search/FilterBar'

const App = () => {
  return (
    <div>
      <div>
        <Flow />
      </div>
      <div>
        <Filter />
        {/* <FilterBar/> */}
      </div>
    </div>
  )
}

export default App