import Sidebar from "../components/Sidebar";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { myURL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company,setCompany] = useState("");
  const [phone,setPhone] = useState();
  const [gstin,setGstin] = useState("");
  const [address,setAddress] = useState("");
  const [error, setError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {user, setUser } = useContext(UserContext);
  const [vis, setVis] = useState(false);
  const navigate = useNavigate();
  console.log("context = ");
  console.log(user);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = axios.put(
      myURL+ "/api/v1/me/update",
        { name, email,company,address,gstin,phone },
        { withCredentials: true }
      );
      alert("User details updated");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(myURL+"/api/v1/me", {
        withCredentials: true,
      });
      //address, contact, pincode, gstin
      console.log(res?.data);
      setName(res?.data.user.name);
      setEmail(res?.data.user.email);
      setAddress(res?.data.user.address);
      setCompany(res?.data.user.company);
      setPhone(res?.data.user.phone);
      setGstin(res.data.user.gstin);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const updatePasswordSubmit = async (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("oldPassword", oldPassword);
    myForm.append("newPassword", newPassword);
    myForm.append("confirmPassword", confirmPassword);
    console.log(myForm)

    try {
      const res = await axios.put(myURL+'/api/v1/password/update',myForm,{headers:{"Content-Type":"application/json"},withCredentials:true})
      alert("Password changed Successfully")
      setVis(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    const logged = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (!logged) {
      navigate("/login");
    }
    if (user) fetchProfile();
  }, [navigate, user]);

  return (
      <div className="grid grid-cols-1 h-full dark:bg-gray-900 dark:text-white">
        <div className="grid grid-cols-2  justify-between h-fit ">
          <Sidebar />
          <a className="ml-14 mt-2.5 font-bold text-2xl" href="/home">
            Invoicify
          </a>
        </div>
        <div className="py-10">
          <div className="shadow-2xl shadow-black   mx-auto border border-green-600 dark:shadow-orange-600 dark:border-white rounded-md w-[70%] md:w-[40%] p-10 ">
            <h1 className="self-center font-bold text-2xl text-black dark:text-white">
              Profile
            </h1>
            <div className="flex flex-col mt-8 p-2">
              <label htmlFor="name" className="font-bold">
                Name:
              </label>
              <input
                value={name}
                className="my-2 w-full rounded-md px-4  py-2 border-2 focus:border-green-600 dark:focus:border-white dark:bg-gray-400 dark:placeholder:text-white outline-0"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
              <label htmlFor="email" className="mt-2 font-bold">
                Email:
              </label>
              <input
                value={email}
                className="my-2 w-full rounded-md px-4  py-2 border-2 focus:border-green-600 dark:focus:border-white dark:bg-gray-400 dark:placeholder:text-white outline-0"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
              <label htmlFor="phone" className="mt-2 font-bold">
                Phone:
              </label>
              <input
                value={phone}
                className="my-2 w-full rounded-md px-4  py-2 border-2 focus:border-green-600 dark:focus:border-white dark:bg-gray-400 dark:placeholder:text-white outline-0"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              ></input>
              <label htmlFor="company" className="mt-2 font-bold">
                Company:
              </label>
              <input
                value={company}
                className="my-2 w-full rounded-md px-4  py-2 border-2 focus:border-green-600 dark:focus:border-white dark:bg-gray-400 dark:placeholder:text-white outline-0"
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
              ></input>
              <label htmlFor="address" className="mt-2 font-bold">
                Address:
              </label>
              <input
                value={address}
                className="my-2 w-full rounded-md px-4  py-2 border-2 focus:border-green-600 dark:focus:border-white dark:bg-gray-400 dark:placeholder:text-white outline-0"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              ></input>
              <label htmlFor="gstin" className="mt-2 font-bold">
                GSTIN:
              </label>
              <input
                value={gstin}
                className="my-2 w-full rounded-md px-4  py-2 border-2 focus:border-green-600 dark:focus:border-white dark:bg-gray-400 dark:placeholder:text-white outline-0"
                onChange={(e) => {
                  setGstin(e.target.value);
                }}
              ></input>
            </div>
            <button
              onClick={handleUpdate}
              className="ml-2 mt-5 font-semibold border-solid border-2 border-green-600 py-2 px-5 rounded-lg  hover:bg-green-500"
            >
              Update
            </button>
            <button
              onClick={() => {
                setVis(true);
              }}
              hidden={vis ? "hidden" : ""}
              className="mx-2 my-5 font-semibold border-solid border-2 border-orange-600 py-2 px-5 rounded-lg  hover:bg-orange-600"
            >
              Change Password
            </button>
            {vis && (
              <>
              <hr className="my-10 border-2 border-orange-600"/>
              <div className="  p-4">
                  <form
                    className="flex flex-col"
                    onSubmit={updatePasswordSubmit}
                  >
                    <label htmlFor="NewPassword" className="font-bold">
                       Old Password
                      </label>
                      <input
                        type="password"
                        placeholder="Old Password"
                        required
                        value={oldPassword}
                        className="my-2 w-full rounded-md px-4  py-2 border-2 focus:border-green-600 dark:focus:border-white dark:bg-gray-400 dark:placeholder:text-white outline-0"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />

                  
                      <label htmlFor="NewPassword" className="font-bold mt-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="New Password"
                        required
                        value={newPassword}
                        className="my-2 w-full rounded-md px-4  py-2 border-2 focus:border-green-600 dark:focus:border-white dark:bg-gray-400 dark:placeholder:text-white outline-0"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                     <label htmlFor="confirmPassword" className="font-bold mt-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        className="my-2 w-full rounded-md px-4  py-2 border-2 focus:border-green-600 dark:focus:border-white dark:bg-gray-400 dark:placeholder:text-white outline-0"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      
                    <div className="mt-5">
                    <input
                      type="submit"
                      value="Change"
                      className=" my-5 font-semibold border-solid border-2 border-green-600 py-2 px-5 rounded-lg  hover:bg-green-600"
                    />
                    <button
                      onClick={() => {
                        setVis(false);
                      }}
                      className=" mx-2 my-5 font-semibold border-solid border-2 border-orange-600 py-2 px-5 rounded-lg  hover:bg-orange-600"
                    >
                      Go Back
                    </button>
                    </div>
                  </form>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
  );
};

export default Profile;
