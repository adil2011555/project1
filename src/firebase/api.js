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
import { db } from "./config"; 

const jobsCollection = collection(db, "jobs");

// --- 1. ВАКАНСИЯ КОШУУ (2-студент үчүн) ---
export const addJob = async (jobData) => {
  try {
    await addDoc(jobsCollection, {
      ...jobData,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Кошууда ката кетти:", error);
    throw error;
  }
};

// --- 2. ВАКАНСИЯЛАРДЫ АЛУУ (3 жана 4-студент үчүн) ---
export const getJobs = async () => {
  try {
    const q = query(jobsCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
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