import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen  dark:bg-gray-900 dark:text-white">
      <div className="grid grid-cols-2  justify-between  h-fit">
        <Sidebar />
        <a className="ml-14 mt-2.5 font-bold text-2xl" href="/home">
          Invoicify
        </a>
        <div className="place-self-end px-6 py-2">
            <button className="font-semibold border-solid border-2 border-orange-600 py-2 px-5 rounded-lg  hover:bg-orange-600">
            <Link to="/">Logout</Link>
            </button>
          </div>
      </div>
      <div className="grid place-items-center  ">
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
