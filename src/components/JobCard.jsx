import React from 'react'
import style from "../styles/JobCard.module.css"

const JobCard = ({job, onDelete}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ky-KG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  return (
    <div className={style.card}>
    <div className={style.info}>
    <h3>{job.title}</h3>
    <p>{job.company}</p>
    <span className={style.date}>{formatDate(job.created_at)}</span>
    </div>
    <button className={style.deleteButton} onClick={() => onDelete(job.id)}>Delete</button>
    </div>
  );
};

export default JobCard
