import React, { useEffect, useState } from "react";
import AddDeleteTableRows from "./AddDeleteTableRows";
import { saveAs } from "file-saver";
import axios from "axios";
import { myURL } from "../url";
import '../App.css'

const Pdf = () => {
  const today = new Date();
  // disable buttons while invoice is loading 
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [data, setData] = useState([]);
  const [docMade, setDocMade] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const [newPdfUrl, setNewPdfUrl] = useState("");
  // console.log(user.user);


  const [info, setInfo] = useState({
    //name->firm name
    id: user.user._id,
    firmName: user.user.company,
    firmAddress: user.user.address,
    firmPincode: "221002",
    firmContact: user.user.phone,
    firmGstIn: user.user.gstin,
    invoiceNumber: invoiceNumber,
    date: today,
    buyerName: "",
    buyerAddress: "",
    buyerPincode: 0,
    buyerGstIn: "",
    buyerContact: 9283749832,
    itemDetails: [],
  });

  // console.log("got value? : ", user);


  useEffect(()=>{
    async function func(){
    try {
      const response = await axios.post(`${myURL}/api/invoice/getinvoicenumber`, {id:user.user._id}, 
      {
        headers:{
          "Content-Type": "application/json",
        }
      })
      console.log("running", response.data.invCount);
      setInvoiceNumber(response.data.invCount+1);
      setIsLoading(false);
      console.log(isLoading, invoiceNumber);
    } catch (error) {
      console.log(error);
    }
  }
  func();
  }, []);


  useEffect(()=>{
    console.log(invoiceNumber)
    setInfo({...info, invoiceNumber})
  }, [invoiceNumber])

  useEffect(() => {
    console.log(info);
  }, [info]);

  useEffect(() => {
    console.log("updated new pdf url : " + newPdfUrl);
  }, [newPdfUrl]);

  useEffect(() => {
    console.log("got?", user);
    console.log("data ", data);
    console.log("item Details", info);
  }, [data]);

  useEffect(()=>{
    console.log(buttonsDisabled);
  }, [buttonsDisabled]);

  const updateData = (newData) => {
    console.log("ok");
    setData([...newData]);
    setInfo({ ...info, itemDetails: [...data] });
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

  const successCallback = (response) => {
    console.log(response.data.pdfData.data);
    const blob = new Blob([new Uint8Array(response.data.pdfData.data).buffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setNewPdfUrl(url);
    setButtonsDisabled(false);
    console.log(url);
  };

  const formSubmission = async (e) => {
    e.preventDefault();
    setButtonsDisabled(true);
    console.log(data);
    setInfo({ ...info, itemDetails: [...data] });
    console.log(info);
    console.log(JSON.stringify(info));

    try {
      if (docMade) {
        const response = await axios.post(
          `${myURL}/api/invoice/updatepdf`,
          info,
          {
            header: {
              "Content-Type": "application/json",
            },
          }
        );
        successCallback(response);
      } else {
        const response = await axios.post(
          `${myURL}/api/invoice/makepdf`,
          JSON.stringify(info),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setInfo({ ...info, id: response.data.invId });
        successCallback(response);
        console.log("res ", response);
      }
      setDocMade(true);

    } catch (error) {
      console.log(error);
    }
    e.preventDefault();
  };

  const downloadPDF = (e)=>{
    e.preventDefault();
    saveAs(newPdfUrl, `${info.firmGstIn}_Invoice${info.invoiceNumber}.pdf`);
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
    {!isLoading && <div className="bg-gray-100 py-8 px-4">
      <form className="space-y-8">
        <h1 className="text-3xl font-semibold text-gray-700 text-center underline ">
          Invoice Details
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Firm:</span>
          {/* name ->firm name */}
          <span className="font-bold text-gray-700">{info.firmName}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Invoice No.:</span>
          <span className="font-bold text-gray-700">{info.invoiceNumber}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Date:</span>
          <span className="font-bold text-gray-700">
            {info.date.getDate().toString() +
              "/" +
              (info.date.getMonth()+1) +
              "/" +
              (1900 + info.date.getYear()).toString()}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Contact:</span>
          <span className="font-bold text-gray-700">{info.firmContact}</span>
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
          className="rounded-md bg-yellow-400 my-2 px-4 py-2 font-semibold text-black shadow-md hover:bg-yellow-500"
          type="submit"
          disabled={buttonsDisabled}
          onClick={formSubmission}
        >
          Generate PDF
        </button>
        {newPdfUrl && <button
        className="rounded-md bg-green-500  mx-4 my-2 px-4 py-2 font-semibold text-white shadow-md hover:bg-green-600"
        onClick={downloadPDF}
        disabled={buttonsDisabled}>
          Download PDF
        </button>}
      </form>
      <div className="bg-gray-100-300 text-center my-2 ">
        {newPdfUrl && <iframe src={newPdfUrl} className="pdf-container mx-auto"   />}
        </div>
    </div>
}
    </div>
  );
};

export default Pdf;
