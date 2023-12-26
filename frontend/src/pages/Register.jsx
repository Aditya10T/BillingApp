import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [company,setCompany] = useState("");
  const [phone,setPhone] = useState();
  const [gstin,setGstin] = useState("");
  const [address,setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL+"/api/v1/register", {
        name,company,phone,gstin,address,
        email,
        password,
      });
      if (res.data.error) {
        setError(res.data.error);
      } else {
        setError("");
        setEmail(res.data.email);
        setName(res.data.name);
        setPassword(res.data.password);
        navigate("/login");
      }
    } catch (err) {
      setError("Something went Wrong");
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col min-w-screen h-screen">
        <div className="flex items-center bg-black text-white justify-between px-6 h-[60px] w-full py-4">
          <h1 className="text-lg md:text-xl font-extrabold">
            <Link to="/">Billing</Link>
          </h1>
          <h3 className="font-bold border-solid border-2 border-indigo-600 py-1 px-2 rounded-lg bg-indigo-600 hover:bg-indigo-500">
            <Link to="/login">Login</Link>
          </h3>
        </div>
        <div className="flex grow justify-center items-center bg-indigo-100">
          <div className="lg:w-2/5 md:w-2/3 w-[74%]">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full">
              <h1 className="text-center text-2xl mb-2 text-gray-600 font-bold font-sans">
                Register
              </h1>
              <div>
                <label
                  className="text-gray-800 font-semibold block my-2 text-md"
                  htmlFor="confirm"
                >
                  Name
                </label>
                <input
                  className="w-full bg-gray-100 px-4 py-1 rounded-lg focus:outline-none  focus:outline-indigo-500"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="">
                <label
                  className="text-gray-800 font-semibold block my-2 text-md"
                  htmlFor="company"
                >
                  Company
                </label>
                <input
                  className="w-full bg-gray-100 px-4 py-1 rounded-lg focus:outline-indigo-500"
                  type="text"
                  name="company"
                  id="company"
                  placeholder="company"
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              
              </div>
              <div>
              <label
                  className="text-gray-800 font-semibold block my-2 text-md"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="w-full bg-gray-100 px-4 py-1 rounded-lg  focus:outline-indigo-500"
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Phone no."
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
              <label
                  className="text-gray-800 font-semibold block my-2 text-md"
                  htmlFor="gstin"
                >
                  GSTIN
                </label>
                <input
                  className="w-full bg-gray-100 px-4 py-1 rounded-lg  focus:outline-indigo-500"
                  type="text"
                  name="gstin"
                  id="gstin"
                  placeholder="GSTIN"
                  onChange={(e) => setGstin(e.target.value)}
                  required
                />
              </div>
              <div>
              <label
                  className="text-gray-800 font-semibold block my-2 text-md"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="w-full bg-gray-100 px-4 py-2 rounded-lg  focus:outline-indigo-500"
                  type="text"
                  name="address"
                  id="address"
                  placeholder="address"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  className="text-gray-800 font-semibold block my-2 text-md"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full bg-gray-100 px-4 py-2 rounded-lg  focus:outline-indigo-500"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="@email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  className="text-gray-800 font-semibold block my-2 text-md"
                  htmlFfor="password"
                >
                  Password
                </label>
                <input
                  className="w-full bg-gray-100 px-4 py-2 rounded-lg  focus:outline-indigo-500"
                  type="Password"
                  name="password"
                  id="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <button
                  className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
                  onClick={handleRegister}
                >
                  Register
                </button>
                {error && <h3 className="text-red-500 text-sm ">{error}</h3>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
