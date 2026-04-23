import { useState, useEffect } from "react";
import { getJobs } from "./firebase/api";
import { FourSquare } from "react-loading-indicators";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { SiPinetwork } from "react-icons/si";
import {
  FaHome,
  FaPlus,
  FaStar,
  FaInfo,
  FaEnvelope,
  FaSignInAlt,
} from "react-icons/fa";

import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import JobFilter from "./components/JobFilter";
import Footer from "./components/Footer";
import styles from "./styles/App.module.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null); 
      const data = await getJobs();
      setJobs(data); 
    } catch (err) {
      console.error("Ката кетти:", err);
      setError("Вакансияларды жүктөөдө ката кетти. Байланышты текшериңиз.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <SiPinetwork size={40} color="#d1d5db" />
          <h1 className={styles.title}>Job Board</h1>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <a href="#" className={styles.navLink}>
                <FaHome /> Home
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                <FaPlus /> Post a Job
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                <FaStar /> Features
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                <FaInfo /> About Us
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                <FaEnvelope /> Contact
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                <FaSignInAlt /> Login
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.appContainer}>
          {/* 2-СТУДЕНТТИН КОМПОНЕНТИ: Вакансия кошуу формасы */}
          <JobForm onJobAdded={fetchJobs} />

          <hr className={styles.separator} />

          {/* 4-СТУДЕНТТИН КОМПОНЕНТИ: Издөө жана фильтрлөө */}
          <JobFilter jobs={jobs} setFilteredJobs={setJobs} />

          {loading ? (
            <div className={styles.loading}>
              <FourSquare
                color="#37388e"
                size="large"
                text="loading..."
                textColor="#37388e"
              />
            </div>
          ) : error ? (
            <div className={styles.errorContainer}>
              <DotLottieReact
                src="https://lottie.host/4b1b8832-f930-4e0e-86f8-168d6e6de893/aJn8kzwhOM.lottie"
                loop
                autoplay
                className={styles.errorAnimation}
              />
              <p className={styles.errorMessage}>{error}</p>
            </div>
          ) : (
            <div className="content">
              {/* 3-СТУДЕНТТИН КОМПОНЕНТИ: Вакансиялардын тизмеси */}
              <JobList jobs={jobs} onJobDeleted={fetchJobs} />

              <div className={styles.temp}>
                <p className={styles.tempText}>
                  Учурда базада <strong>{jobs.length}</strong> вакансия табылды.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
