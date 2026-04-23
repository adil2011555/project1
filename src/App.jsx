import React from 'react'
import JobList from './components/JobList'
import JobCard from './components/JobCard'

const App = () => {
  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <JobList />
      <JobCard />
    </div>
  )
}

export default App
