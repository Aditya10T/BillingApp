import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <div className="flex flex-row w-screen">
        <Sidebar />
        <div className="absolute flex flex-col justify-center items-center flex-wrap w-full h-screen overflow-auto">
          <p className=" w-8/12 font-serif font-semibold text-3xl my-4">
            Welcome to the billing app which provides you with all the required
            features to generate invoices with a click.
          </p>
          <a
          className="rounded-md shadow font-semibold bg-orange-500 text-white hover:bg-orange-700 mx-auto px-4 py-2 my-4"
          href="/pdfgenerate"
        >
          Generate Invoice
        </a>
        <a
          className="rounded-md shadow font-semibold bg-green-500 text-white hover:bg-green-700 mx-auto px-4 py-2 my-4"
          href="/pdfgenerate"
        >
          View previous Invoice
        </a>
        </div>
      </div>
    </>
  );
};

export default Home;
