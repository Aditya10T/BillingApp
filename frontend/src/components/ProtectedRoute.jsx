import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = (props) => {
    const { user,setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const{Component} = props;
    useEffect(()=>{
      const logged = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;
      if(!logged){
        navigate("/login")
      }
      else{
         setUser(logged);
      }
    },[]);
  
    return (
      <div>
        <Component />
      </div>
    );
}

export default ProtectedRoute