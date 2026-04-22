import React, { useState }from 'react'
import style from "../styles/JobList.module.css"
import JobCard from './JobCard'

const JobList = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech AI",
      createdAt: "2026-04-20T10:00:00Z"},
      {
        id: 2,
        title: "UI/UX Designer",
        company: "Creative Studio",
        createdAt: "2026-04-22T15:00:00Z"},
        {
          id: 3,
          title: "Backend Node.js",
          company: "Global Soft",
          createdAt: "2026-04-21T09:00:00Z"},
      ]);

      const sortedJobs = [...jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const handleDelete = (id) => {
        if (window.confirm("Бул вакансияны өчүргүңүз келеби?")) {
          setJobs(jobs.filter(job => job.id !== id));
        }
      }
      const [loading, setLoading] = useState(true);
      if (loading) {
        return (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <p style={{ fontSize: "18px", color: "#555" }}>Жүктөлүүдө...</p>
          </div>
        )}
};

  return (
    <div style={{ 
     maxWidth: "600px",
     margin: "0 auto",
     padding: "20px"}}>
     <h2 style={{ marginBottom: "20px" }}>вакансиялар тизмеси</h2>
     {sortedJobs.length > 0 ? (
      sortedJobs.map(job => (
        <JobCard key={job.id}
         job={job} 
         onDelete={handleDelete} />
      ))
     ) : (
      <p style={{ textAlign: "center", color: "#777" }}>Вакансиялар табылган жок</p>
     )};
    
    </div>
  )
      
export default JobList
