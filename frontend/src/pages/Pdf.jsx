import React, { useState } from "react";
import AddDeleteTableRows from "./AddDeleteTableRows";
import { saveAs } from "file-saver";
import axios from "axios";

const Pdf = () => {
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

  const formSubmission = async (e) => {
    e.preventDefault();
    setInfo({ ...info, itemDetails: [...data] });
    console.log(info);
    console.log(JSON.stringify(info));

    try {
      const { response } = await axios.post(
        `${URL}/api/invoice/makepdf`,
        JSON.stringify(info),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    //   console.log(response);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
    

    async function getTicketsPdf() {
      return axios.get("http://localhost:8800/api/invoice/makepdf", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer",
      });
    }
    const { dataa } = await getTicketsPdf();
    const blob = new Blob([dataa], { type: "application/pdf" });
    saveAs(blob, "tickets.pdf");
  };

  return (
  <div className="bg-gray-100 py-8 px-4">
  <form className="space-y-8">
    <h1 className="text-xl font-semibold text-gray-700">Invoice Details</h1>
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
    <h2 className="text-lg font-semibold text-gray-700">Buyer Information</h2>
    <div className="flex flex-col space-y-2">
      <label className="text-gray-500">Buyer Name:</label>
      <input
        type="text"
        name="buyerName"
        placeholder="Enter Buyer Name"
        onChange={inputChange}
        className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700"
      />
      <label className="text-gray-500">Buyer Address:</label>
      <textarea
        rows="3"
        type="text"
        name="buyerAddress"
        placeholder="Enter Buyer Address"
        onChange={inputChange}
        className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700"
      />
      <div className="flex items-center space-x-4">
        <div className="flex">
          <label className="text-gray-500 mr-2">Buyer Pincode:</label>
          <input
            type="number"
            name="buyerPincode"
            placeholder="Enter Pincode"
            onChange={inputChange}
            className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700"
          />
        </div>
        <label className="text-gray-500">Buyer GSTIN:</label>
        <input
          type="text"
          name="buyerGstIn"
          placeholder="Enter GSTIN"
          onChange={inputChange}
          className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700"
        />
      </div>
      <label className="text-gray-500">Buyer Contact:</label>
      <input
        type="tel"
        name="buyerContact"
        placeholder="Enter Contact Number"
        onChange={inputChange}
        className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700"
      />
    </div>
    <AddDeleteTableRows updateData={updateData} />
    <button
      className="rounded-md bg-yellow-400 px-4 py-2 font-semibold text-black shadow-md hover:bg-yellow-500"
      onClick={formSubmission}
    >
      Generate PDF
    </button>
  </form>
</div>

  );
};

export default Pdf;
