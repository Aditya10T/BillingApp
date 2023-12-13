import axios from "axios";
import { URL } from "../url"
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const UserContext=createContext({})


export function UserContextProvider({children}){
    const [user,setUser]=useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
      const logged = JSON.parse(localStorage.getItem('user'));
      setUser(logged);
    },[navigate])
    
    return (<UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>)
}