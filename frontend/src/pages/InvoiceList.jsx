import axios from "axios";
import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { myURL } from "../url";
import EditInvoice from "./EditInvoice";



const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")).user;
  const navigate = useNavigate();
  // console.log(user);

  useEffect(() => {
    // Fetch invoice data (replace with your actual fetching logic)
    async function func() {
      const response = await fetchInvoices();
      console.log(response);
      setInvoices(response.data);
      setError(response.error);
      setIsLoading(false);
      console.log("invoices..", invoices);
    }
    func();
  }, []);

  // Example function to fetch invoice data (replace with your implementation)
  async function fetchInvoices() {
    // Simulating an API call
    const response = await axios.post(
      myURL + "/api/invoice/invoiceList",
      JSON.stringify({ firm: user._id }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response;
  }

  return (
    <div>
      {isLoading && <p>Loading invoices...</p>}
      {error && <p>Error fetching invoices: {error.message}</p>}
      {!isLoading && invoices.length > 0 && (
        <ul className="bg-gray-100">
          {invoices.map((invoice) => (
            <li key={invoice._id}>
              <div className="card grid grid-col-1 sm:grid-cols-5 col-span-2 rounded-3xl shadow shadow-black bg-orange-300 p-10 mx-20 my-5">
                {/* Display invoice details based on your data structure */}
                <div className="sm:col-span-4">
                  <h3 className="font-semibold">
                    Invoice Number : {invoice.invoiceNumber}
                  </h3>
                  <p>Date: {invoice.date}</p>
                  <p>Buyer: {invoice.buyerName}</p>
                  <p>Total: {invoice.totalAmount}</p>
                </div>
                <div className="sm:col-span-1 text-center mx-auto my-auto">
                  <button className="bg-white px-10 py-2 rounded-xl shadow shadow-black" onClick={()=>{navigate(`/editinvoice/${invoice._id}`)}} >Edit</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && invoices.length === 0 && <p>No invoices found.</p>}
    </div>
  );
};

export default InvoiceList;
