import React, { useState } from "react";
import axios from "axios";
import { URL } from "../url";

const ForgotPassword = () => {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmail = async () => {
    try {
      const res = await axios.post("/api/v1/password/forgot", { email });
      setDone(true);
    } catch (error) {
      if(error.response.status===404){
        setError("User not Found");
      }
      else{
        setError("Internal Server Error");
      }
    }
  };

  return (
    <>
      {done?(
      <div>an email with password change link has been sent to your mail-id</div>
      ):(
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="px-8 mb-4 text-center">
                <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                <p className="mb-4 text-sm text-gray-700">
                  We get it, stuff happens. Just enter your email address below
                  and we'll send you a link to reset your password!
                </p>
              </div>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    for="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter Email Address..."
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded-full hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleEmail}
                  >
                    Send Email
                  </button>
                  <p>{error && (
                    <h1 className="text-red-500 text-sm">{error}</h1>
                  )}</p>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="/register"
                  >
                    Create an Account!
                  </a>
                </div>
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="/login"
                  >
                    Already have an account? Login!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default ForgotPassword;
