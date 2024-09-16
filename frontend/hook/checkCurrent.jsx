import {useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../backend/db/firebase/connectFirebase";

const checkCurrent=()=>{


        
    
console.log(data)
    return {data,currentUserLoading}
}

export default checkCurrent