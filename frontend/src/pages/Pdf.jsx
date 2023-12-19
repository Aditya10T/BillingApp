import React, { useEffect, useState } from "react";
import AddDeleteTableRows from "./AddDeleteTableRows";
import { saveAs } from "file-saver";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Pdf = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [data, setData] = useState([]);
  const [info, setInfo] = useState({
    firm: "DK Enterprises",
    invoiceNumber: 1,
    date: "27/11/2023",
    buyerName: "",
    buyerAddress: "",
    buyerPincode: 0,
    buyerGstIn: "",
    buyerContact: 9283749832,
    itemDetails: [],
  });
  
  useEffect(()=>{
    console.log(info);
    // console.log(pdfUrl);
  }, [info])

  useEffect(()=>{
    console.log("update url : "+pdfUrl);
  }, [pdfUrl])  

  

  const updateData = (newData) => {
    console.log("ok");
    setData([...newData]);
    console.log(data);
  };

  const inputChange = (e) => {
    console.log(e.target.name, e.target.value);
    setInfo({
      ...info,
      [e.target.name]:
        e.target.name == "buyerPincode"
          ? parseFloat(e.target.value)
          : e.target.value,
    });
    console.log(info);
  };

  const URL = "http://localhost:8800";

  
  const successCallback = (response) => {
    console.log("received url : "+response.data.pdf_link)
    const linkk = response.data.pdf_link;
    setPdfUrl(linkk.substring(0, linkk.length - 3) + "jpg");
    console.log(pdfUrl);
  };

  const formSubmission = async (e) => {
    e.preventDefault();
    setInfo({ ...info, itemDetails: [...data] });
    console.log(info);
    console.log(JSON.stringify(info));

    try {
      const response = await axios
        .post(`${URL}/api/invoice/makepdf`, JSON.stringify(info), {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response)=>{successCallback(response)})
        
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
    // console.log(pdfUrl);
    e.preventDefault();
  };

  return (
    <div className="bg-gray-100 py-8 px-4">
      <form className="space-y-8">
        <h1 className="text-3xl font-semibold text-gray-700 text-center underline ">
          Invoice Details
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Firm:</span>
          <span className="font-bold text-gray-700">{info.firm}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Invoice No.:</span>
          <span className="font-bold text-gray-700">{info.invoiceNumber}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Date:</span>
          <span className="font-bold text-gray-700">{info.date}</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-700">
          Buyer Information
        </h2>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-500">Buyer Name:</label>
          <input
            type="text"
            name="buyerName"
            placeholder="Enter Buyer Name"
            onChange={inputChange}
            required
            className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700"
          />
          <label className="text-gray-500">Buyer Address:</label>
          <textarea
            rows="3"
            type="text"
            name="buyerAddress"
            placeholder="Enter Buyer Address"
            onChange={inputChange}
            required
            className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700"
          />
          <div className="grid sm:grid-cols-1">
            <div className="">
              <label className="text-gray-500 mr-2 flex">Buyer Pincode:</label>
              <input
                type="number"
                name="buyerPincode"
                placeholder="Enter Pincode"
                onChange={inputChange}
                required
                className="rounded-md border border-gray-300 bg-gray-100 my-2 px-3 py-2 text-gray-700"
              />
            </div>
            <div>
              <label className="text-gray-500 flex">Buyer GSTIN:</label>
              <input
                type="text"
                name="buyerGstIn"
                placeholder="Enter GSTIN"
                onChange={inputChange}
                required
                className="rounded-md border border-gray-300 bg-gray-100 my-2 px-3 py-2 text-gray-700"
              />
            </div>
          </div>
          <label className="text-gray-500">Buyer Contact:</label>
          <input
            type="tel"
            name="buyerContact"
            placeholder="Enter Contact Number"
            onChange={inputChange}
            required
            className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700"
          />
        </div>
        <AddDeleteTableRows updateData={updateData} />
        <button
          className="rounded-md bg-yellow-400 px-4 py-2 font-semibold text-black shadow-md hover:bg-yellow-500"
          type="submit"
          onClick={formSubmission}
        >
          Generate PDF
        </button>
      </form>

      {pdfUrl != "" && <img src={pdfUrl} className="w-7/12 border border-black my-10 mx-auto" />}
    </div>
  );
};

export default Pdf;
