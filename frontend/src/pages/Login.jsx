import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {user,setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
       URL+"/api/v1/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(res);
      // console.log(res.data)
      if (res.data.error) {
        setError(res.data.error);
      } else {
        setUser(res.data);
        window.localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/home");
      }
    } catch (err) {
      setError("Something went wrong");
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex items-center bg-black text-white justify-between px-6 md:px-[200px] py-4">
          <h1 className="text-lg md:text-xl font-extrabold">
            <Link to="/">Billing</Link>
          </h1>
          <h3 className="font-bold border-solid border-2 border-indigo-600 py-1 px-2 rounded-lg bg-indigo-600 hover:bg-indigo-500">
            <Link to="/register">Register</Link>
          </h3>
        </div>
        <div className="w-full grow flex justify-center items-center bg-indigo-100">
          <div className="flex flex-col bg-white rounded-lg border-solid border-2 shadow-md shadow-black px-4 py-4 justify-center items-center space-y-4 h-[55%] w-[60%] md:w-[55%] lg:w-[45%]">
            <h1 className="text-xl font-bold text-left mb-2">LOGIN</h1>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md px-4 py-2 border-2 lg:w-[60%] bg-gray-100 border-gray-300 focus:border-blue-600 outline-0"
              type="text"
              placeholder="Enter your email"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md px-4 lg:w-[60%] py-2 border-2 bg-gray-100 border-gray-300 focus:border-blue-600 outline-0"
              type="password"
              placeholder="Enter your password"
              required
            />
            <button
              onClick={handleLogin}
              className="w-[200px] px-2 py-2 text-lg font-bold text-white bg-indigo-600 rounded-lg hover:bg-gray-500 hover:text-black "
            >
              Log in
            </button>
            {error && <h3 className="text-red-500 text-sm ">{error}</h3>}
            <div>
            <Link to="/forgot-password" className="text-blue-600">Forgot Password?</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
