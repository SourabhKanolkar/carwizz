import { db } from "../firebase-config";

import { collection,getDocs,getDoc,addDoc,deleteDoc,doc } from "firebase/firestore";


const BookedCollectionRef=collection(db,"bookings");
const CabsAdedByAdmin=collection(db,"CARS");
class CabDataService{
   
    addBookCab=(newBook)=>{
        return addDoc(BookedCollectionRef,newBook);
    }

    getAllCabs=()=>{
        return getDocs(CabsAdedByAdmin);
    }



}

export default new CabDataService();