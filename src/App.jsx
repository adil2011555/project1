import { useState, useEffect } from "react";
import { getJobs } from "./firebase/api";
import { FourSquare } from "react-loading-indicators";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import JobFilter from "./components/JobFilter";
import styles from "./styles/App.module.css";

function App() {
  const [jobs, setJobs] = useState([]); // Базадан келген вакансиялар топтому
  const [loading, setLoading] = useState(true); // Жүктөлүү абалы
  const [error, setError] = useState(null); // Каталарды сактоочу абал

  // Firestore'дон маалыматтарды алып келүүчү функция
  const fetchJobs = async () => {
    try {
      setLoading(true); // Жүктөөнү баштайбыз
      setError(null); // Мурунку каталарды тазалайбыз
      const data = await getJobs(); // Биздин api.js ичиндеги функцияны чакырабыз
      setJobs(data); // Базадан келген маалыматты абалга (state) сактайбыз
    } catch (err) {
      console.error("Ката кетти:", err);
      setError("Вакансияларды жүктөөдө ката кетти. Байланышты текшериңиз.");
    } finally {
      setLoading(false); // Жүктөө бүттү (ийгиликтүү же ката менен)
    }
  };

  // Проект биринчи жолу ачылганда маалыматтарды бир жолу жүктөп алабыз
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Job Board (Вакансия тактасы)</h1>
      </header>

      <main>
        {/* 2-СТУДЕНТТИН КОМПОНЕНТИ: Вакансия кошуу формасы */}
        <JobForm onJobAdded={fetchJobs} />

        <hr className={styles.separator} />

        {/* 4-СТУДЕНТТИН КОМПОНЕНТИ: Издөө жана фильтрлөө */}
        <JobFilter jobs={jobs} setFilteredJobs={setJobs} />

        {/* АБАЛДАРДЫ БАШКАРУУ (Loading / Error / List) */}
        {loading ? (
          // Жүктөлүү учурунда көрсөтүлүүчү анимация
          <div className={styles.loading}>
            <FourSquare
              color="#32cd32"
              size="large"
              text="loading..."
              textColor="#32cd32"
            />
          </div>
        ) : error ? (
          // Ката кеткенде көрсөтүлүүчү билдирүү
          <div className={styles.errorContainer}>
            <DotLottieReact
              src="https://lottie.host/4b1b8832-f930-4e0e-86f8-168d6e6de893/aJn8kzwhOM.lottie"
              loop
              autoplay
              className={styles.errorAnimation} 
            />
          </div>
        ) : (
          <div className="content">
            {/* 3-СТУДЕНТТИН КОМПОНЕНТИ: Вакансиялардын тизмеси */}
            <JobList jobs={jobs} onJobDeleted={fetchJobs} />

            {/* Тизме компоненти даяр боло электеги убактылуу билдирүү */}
            <div className={styles.temp}>
              <p className={styles.tempText}>
                Учурда базада <strong>{jobs.length}</strong> вакансия табылды.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        &copy; 2026 Job Board Долбоору - 1-студенттин иши
      </footer>
    </div>
  );
}

export default App;
