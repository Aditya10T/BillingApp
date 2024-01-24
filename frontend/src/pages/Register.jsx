import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { myURL } from "../url";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState();
  const [gstin, setGstin] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(myURL + "/api/v1/register", {
        name,
        company,
        phone,
        gstin,
        address,
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
      <div className="grid grid-cols-1 h-screen">
      <div className="grid grid-cols-2 px-6 justify-between py-4 h-fit ">
          <h1 className="text-lg md:text-xl font-extrabold">
            <Link to="/">Invoicify</Link>
          </h1>
          <div className="place-self-end">
            <button className="font-semibold border-solid border-2 border-orange-600 py-2 px-5 rounded-lg  hover:bg-orange-500">
            <Link to="/login">Sign Up</Link>
            </button>
          </div>
        </div>


        <div className="py-10">
          <div className="">
            <div className=" shadow-2xl shadow-black   mx-auto border border-green-600 rounded-md w-[70%] md:w-[40%] p-10 ">
              <h1 className="text-center text-2xl mb-2 font-bold font-sans">
                Register
              </h1>
              <div>
                <input
                  className="my-2 w-full rounded-md px-4 py-2 border-2 focus:border-green-600 outline-0"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2">
              <div className="col-span-1 mr-2">
                <input
                  className="my-2 w-full rounded-md px-4 py-2 border-2 focus:border-green-600 outline-0"
                  type="text"
                  name="company"
                  id="company"
                  placeholder="Company"
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1 ml-2">
                <input
                  className="my-2 w-full rounded-md px-4 py-2 border-2 focus:border-green-600 outline-0"
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Phone No."
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              </div>
              <div>
                <input
                  className="my-2 w-full rounded-md px-4 py-2 border-2 focus:border-green-600 outline-0"
                  type="text"
                  name="gstin"
                  id="gstin"
                  placeholder="GSTIN"
                  onChange={(e) => setGstin(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  className="my-2 w-full rounded-md px-4 py-2 border-2 focus:border-green-600 outline-0"
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  className="my-2 w-full rounded-md px-4 py-2 border-2 focus:border-green-600 outline-0"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  className="my-2 w-full rounded-md px-4 py-2 border-2 focus:border-green-600 outline-0"
                  type="Password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <button
                  className="my-5 font-semibold border-solid border-2 border-green-600 py-2 px-5 rounded-lg  hover:bg-green-500"
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
  );
};

export default Register;
