import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

const Home = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="h-screen  dark:bg-gray-900 dark:text-white">
      <div className="grid grid-cols-2  justify-between dark:shadow-md dark:shadow-orange-600">
        <Sidebar />
        <a className="ml-14 mt-2.5 font-bold text-2xl" href="/home">
          Invoicify
        </a>
        <div className="place-self-end px-6  ">
          <button
            className="text-4xl mx-4 "
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              localStorage.setItem(
                "theme",
                theme === "dark" ? "light" : "dark"
              );
            }}
          >
            <span className="text-xs ">Theme</span>
            {theme === "dark" && <FaToggleOn className="text-orange-600" />}
            {theme === "light" && <FaToggleOff className="text-orange-600" />}
          </button>
          <button className="font-semibold border-solid border-2 border-orange-600 py-2 px-5 rounded-lg  hover:bg-orange-600">
            <Link to="/">Logout</Link>
          </button>
        </div>
      </div>
      <div className="grid place-items-center my-20 ">
        <p className=" w-8/12 font-serif font-semibold text-3xl my-4 text-center">
          Welcome to the billing app which provides you with all the required
          features to generate invoices with a click.
        </p>
        <a
          className="my-2 border-2 border-orange-600 rounded-md px-5 py-2 hover:bg-orange-600 font-semibold "
          href="/pdfgenerate"
        >
          Generate Invoice
        </a>
        <a
          className="my-2 border-2 border-green-600  rounded-md px-5 py-2 hover:bg-green-600 font-semibold "
          href="/allinvoice"
        >
          View previous Invoice
        </a>
      </div>
    </div>
  );
};

export default Home;
