import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <div className="flex flex-row w-screen">
        <Sidebar />
        <div className="absolute flex flex-col justify-center items-center flex-wrap w-full h-screen overflow-auto">
          <p className="">
            Welcome to the billing app which provides you with all the required
            features to generate invoices with a click.
          </p>
          <a
          className="tracking-wide w-[100px] mt-6 rounded-lg px-4 py-2 text-lg bg-blue-400"
          href="/pdfgenerate"
        >
          Generate Invoice
        </a>
        </div>
      </div>
    </>
  );
};

export default Home;
