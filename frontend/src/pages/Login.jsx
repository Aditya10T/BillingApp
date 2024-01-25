import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { myURL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        myURL + "/api/v1/login",
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
    <div className="grid grid-cols-1 h-screen  dark:bg-gray-900 dark:text-white">
      <div className="grid grid-cols-2 px-6 justify-between py-4 h-fit dark:shadow-md dark:shadow-orange-600">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Invoicify</Link>
        </h1>
        <div className="place-self-end">
          <button className="font-semibold border-solid border-2 border-orange-600 py-2 px-5 rounded-lg  hover:bg-orange-600">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </div>
      <div className="">
        <div className=" text-center shadow-2xl dark:shadow-2xl shadow-black  dark:shadow-orange-400 mx-auto border border-green-600  dark:border-white rounded-md w-[70%] md:w-[40%] p-10 ">
          <h1 className=" mx-auto text-xl font-bold text-center mb-5 ">
            LOGIN
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="my-2 w-full rounded-md px-4 py-2 border-2 focus:border-green-600 dark:bg-gray-800 dark:placeholder:text-gray-500 dark:focus:border-white  outline-0"
            type="text"
            placeholder="Enter your email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="my-2 w-full rounded-md px-4  py-2 border-2 focus:border-green-600 dark:focus:border-white dark:bg-gray-800 dark:placeholder:text-gray-500 outline-0"
            type="password"
            placeholder="Enter your password"
            required
          />
          <button
            onClick={handleLogin}
            className="my-2 border-2 border-green-600 dark:hover:bg-orange-600 dark:border-orange-600 rounded-md px-5 py-2 hover:bg-green-500 font-semibold "
          >
            Log in
          </button>
          {error && <h3 className="text-red-500 text-sm ">{error}</h3>}
          <div>
            <Link
              to="/forgot-password"
              className="text-blue-600 dark:text-red-800"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
