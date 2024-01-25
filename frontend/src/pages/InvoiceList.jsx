import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myURL } from "../url";
import EditInvoice from "./EditInvoice";
import Sidebar from "../components/Sidebar";

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
    <div className="dark:bg-gray-900 dark:text-white">
      <div className="grid grid-cols-2  justify-between  h-fit dark:shadow-md dark:shadow-orange-600">
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
      {isLoading && <p>Loading invoices...</p>}
      {error && <p>Error fetching invoices: {error.message}</p>}
      {!isLoading && invoices.length > 0 && (
        <div className="grid  place-items-center">
          <ul className="md:w-10/12 ">
            {invoices.map((invoice) => (
              <li key={invoice._id}>
                <div className="card grid grid-col-1 sm:grid-cols-5 col-span-2 rounded-3xl shadow shadow-orange-600 dark:shadow-orange-600 border-2 border-orange-600 p-10 mx-20 my-5">
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
                    <button
                      className=" my-2 border-2 border-green-600  rounded-md px-5 py-2 hover:bg-green-600 font-semibold "
                      onClick={() => {
                        navigate(`/editinvoice/${invoice._id}`);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!isLoading && invoices.length === 0 && <p>No invoices found.</p>}
    </div>
  );
};

export default InvoiceList;
