import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { myURL } from "../url";

const ResetPassword = () => {

 const [password,setPassword] = useState("");
 const [confirmPassword,setConfirmPassword] = useState("");
 const params = useParams();
 const navigate = useNavigate();
 const token = params.token;

 const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(myURL+"/api/v1/password/reset/"+token,{password,confirmPassword});
      alert("Password changed successfully");
      navigate("/login");
    } catch (error) {
      setPassword("");
      setConfirmPassword("");
      console.log(error);
      if(error.response.data.message){
        alert(error.response.data.message);
      }
      else{
        alert("Something went wrong")
      }
    }
 }

  return (
    <>
      <div className=" bg-slate-200 min-h-screen flex items-center">
        <div className="sm:w-2/3 md:w-[50%] lg:w[40%] mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300">
          <h1 className="text-4xl font-medium">Reset password</h1>
          <p className="text-slate-500">Fill up the form to reset the password</p>
          <form action="" className="my-10">
            <div className="flex flex-col space-y-5">
              <label htmlFor="newpassword">
                <p className="font-medium text-slate-700 pb-2">New Password</p>
                <input
                  id="newpassword"
                  name="newpassword"
                  type="password"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Password"
                  required
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
              </label>
              <label htmlFor="confirmPassword">
                <p className="font-medium text-slate-700 pb-2">Confirm Password</p>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Confirm your Password"
                  required
                  onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
              </label>

              <button onClick={handleClick} className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>

                <span>Reset password</span>
              </button>
              <p className="text-center">
                Not registered yet?{" "}
                <a
                  href="/register"
                  className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <span>Register now </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
