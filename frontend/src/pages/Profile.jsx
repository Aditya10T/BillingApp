import Sidebar from "../components/Sidebar";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [vis, setVis] = useState(false);
  const navigate = useNavigate();
  console.log("context = ");
  console.log(user);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = axios.put(
       "/api/v1/me/update",
        { name, email },
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
      const res = await axios.get(URL + "/api/v1/me", {
        withCredentials: true,
      });
      //address, contact, pincode, gstin
      console.log(res?.data);
      setName(res.data.user.name);
      setEmail(res.data.user.email);
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
      const res = await axios.put(URL+'/api/v1/password/update',myForm,{headers:{"Content-Type":"application/json"},withCredentials:true})
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
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-row w-screen">
          <Sidebar />
          <a className="ml-14 mt-2.5 font-bold text-2xl" href="/home">
            Billing
          </a>
        </div>
        <div className="flex-grow mt-10 flex flex-col justify-center items-center">
          <div className="flex flex-col w-[500px] h-max p-6 border-solid  rounded-lg shadow-lg shadow-black border-indigo-300">
            <h1 className="self-center font-bold text-2xl text-black">
              Profile
            </h1>
            <div className="flex flex-col mt-8 p-2">
              <label htmlFor="name" className="font-bold">
                Name:
              </label>
              <input
                value={name}
                className="border-solid border-2 p-2 rounded-md bg-gray-200"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
              <label htmlFor="email" className="mt-2 font-bold">
                Email:
              </label>
              <input
                value={email}
                className="border-solid border-2 p-2 rounded-md bg-gray-200"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            <button
              onClick={handleUpdate}
              className="mt-4 border-solid border-2 py-2 bg-orange-500 hover:bg-indigo-800 rounded-md text-black font-semibold"
            >
              Update
            </button>
            <button
              onClick={() => {
                setVis(true);
              }}
              hidden={vis ? "hidden" : ""}
              className="mt-4 border-solid border-2 py-2 bg-green-500 hover:bg-indigo-800 text-white"
            >
              Change Password
            </button>
            {vis && (
              <div className="flex flex-col mt-4 p-4">
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
                        className="border-solid border-2 p-2 rounded-md bg-gray-200"
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
                        className="border-solid border-2 p-2 rounded-md bg-gray-200"
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
                        className="border-solid border-2 p-2 rounded-md bg-gray-200"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    <div className="flex mt-2">
                    <input
                      type="submit"
                      value="Change"
                      className="bg-indigo-500 hover:bg-indigo-800 text-white p-2 px-4 border-solid border-2 rounded-md"
                    />
                    <button
                      onClick={() => {
                        setVis(false);
                      }}
                      className="bg-indigo-500 hover:bg-indigo-800 ml-4 text-white p-2 px-4 border-solid border-2 rounded-md"
                    >
                      Go Back
                    </button>
                    </div>
                  </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
