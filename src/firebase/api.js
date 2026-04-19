import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./config"; // config.js файлынан db'ни чакырабыз

const jobsCollection = collection(db, "jobs");

// --- 1. ВАКАНСИЯ КОШУУ (2-студент үчүн) ---
export const addJob = async (jobData) => {
  try {
    // jobData бул: { title, company, description, category }
    await addDoc(jobsCollection, {
      ...jobData,
      createdAt: serverTimestamp() // Системалык убакытты кошуу
    });
  } catch (error) {
    console.error("Кошууда ката кетти:", error);
    throw error; // Катаны App.jsx'ке жөнөтөбүз
  }
};

// --- 2. ВАКАНСИЯЛАРДЫ АЛУУ (3 жана 4-студент үчүн) ---
export const getJobs = async () => {
  try {
    // Убактысы боюнча сорттоп алабыз (жаңысы жогоруда)
    const q = query(jobsCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    // Маалыматтарды таза массив кылып кайтарабыз
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Маалымат алууда ката:", error);
    throw error;
  }
};

// --- 3. ВАКАНСИЯ ӨЧҮРҮҮ (3-студент үчүн) ---
export const deleteJob = async (id) => {
  try {
    const jobRef = doc(db, "jobs", id);
    await deleteDoc(jobRef);
  } catch (error) {
    console.error("Өчүрүүдө ката кетти:", error);
    throw error;
  }
};