import React from 'react'
import JobList from './components/JobList'
import JobCard from './components/JobCard'

const App = () => {
  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <JobList />
      <JobCard />
    </div>
  )
}

export default App
