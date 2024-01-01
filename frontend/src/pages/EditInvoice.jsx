import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { myURL } from "../url";
import axios from "axios";
import Item from "./Item";
import { saveAs } from "file-saver";

const EditInvoice = () => {
  //to load invoice id from URL
  const id = useParams();

  //initialised variables
  //loading false after data is fetched
  const [isLoading, setIsLoading] = useState(true);
  // disable buttons while invoice is loading 
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  //variable to store pdf url
  const [newPdfUrl, setNewPdfUrl] = useState("");
  //variable to fetch invoice data
  const [invoice, setInvoice] = useState(null);
  //variable to store itemDetails
  const [items, setItems] = useState([]);
  //variable to store complete info of the invoice
  const [info, setInfo] = useState(null);
  //loading user form local storage.
  const user = JSON.parse(localStorage.getItem("user")).user;
  console.log("User : \n", user);

  //     1. This runs and fetches invoice data from backend
  //        by calling another fucntion fetchInvoiceById.
  useEffect(() => {
    async function func(id) {
      const response = await fetchInvoiceById(id);
      setInvoice(response.data[0]); //set invoice data in invoice.
      setIsLoading(false); //set Loading to false.
    }
    func(id);
  }, [id]);

  //      1.1 ) This function is called to fetch the invoice
  async function fetchInvoiceById(id) {
    // Simulating an API call
    const response = await axios.post(
      myURL + "/api/invoice/invoicedetails",
      JSON.stringify(id),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }

  //      2. This runs next
  useEffect(() => {
    //    2.1 When data is loaded only then we can set values in info

    //    First we set value in items
    if (!isLoading && invoice != null) {
      console.log("State of Loading : \n", isLoading);
      console.log("Loaded Invoice : \n", invoice);
      var newItems = [];
      for (let i = 0; i < invoice.itemName.length; i++) {
        console.log("ItemName : ", invoice.itemName[i]);
        newItems.push({
          itemNamep: invoice.itemName[i],
          itemHsnp: invoice.itemHsn[i],
          itemQuantityp: invoice.itemQuantity[i],
          itemPricep: invoice.itemPrice[i],
          itemCgstp: invoice.itemCgst[i],
          itemSgstp: invoice.itemSgst[i],         
        });
        setItems(newItems);
      }
    }

    // when items is set then using it to fill info
    if (!isLoading && items) {
      setInfo({
        id: id.id,
        firmName: user.company,
        firmAddress: user.address,
        firmPincode: "221002",
        firmContact: user.phone,
        firmGstIn: user.gstin,
        invoiceNumber: invoice.invoiceNumber,
        date: invoice.date,
        buyerName: invoice.buyerName,
        buyerAddress: invoice.buyerAddress,
        buyerPincode: 0,
        buyerGstIn: invoice.buyerGstIn,
        buyerContact: 9283749832,
        itemDetails: items,
      });
    }
  }, [isLoading, invoice]);

  // if any change in info, update it in the current batch
  useEffect(() => {
    console.log("Updated info:\n", info);
  }, [info]);

  // if any chanfge in items, update it in the current batch
  useEffect(() => {
    console.log("Update items : \n ", items);
    setInfo({ ...info, itemDetails: items });
  }, [items]);

  // Any change in the upper fields (non table),
  // are handled by this function.
  const inputChange = (e) => {
    console.log("Changing ", e.target.name, " = ", e.target.value);
    setInfo({
      ...info,
      [e.target.name]:
        e.target.name == "buyerPincode"
          ? parseFloat(e.target.value)
          : e.target.value,
    });
  };

  //  When new item is to be added user clicks on the button and this funciton triggers.
  //  Creates a new element in the items array
  const addItem = () => {
    setItems([
      ...items,
      {
        itemNamep: "",
        itemHsnp: 0,
        itemQuantityp: 0,
        itemPricep: 0,
        itemCgstp: 0,
        itemSgstp: 0,
      },
    ]);
  };

  //  To delete an item from the invoice, this function is triggered.
  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  //
  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const itemInput = [...items];
    itemInput[index][name] =
      name == "itemNamep" ? value : value >= 0 ? parseFloat(value) : 0;
    setItems(itemInput);
    evnt.preventDefault();
  };

  //   when final pdf generate button is clicked then this function is called.
  const formSubmission = async (e) => {
    e.preventDefault();
    setButtonsDisabled(true);
    console.log("final items", items);
    console.log("final info", info);
    console.log(JSON.stringify(info));

    try {
      const response = await axios
        .post(`${myURL}/api/invoice/updatepdf`, JSON.stringify(info), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          successCallback(response);
        });
    } catch (error) {
      console.log(error);
    }
    e.preventDefault();
  };

  // function to just check and set the recieved URLs.
  const successCallback = (response) => {
    const blob = new Blob([new Uint8Array(response.data.pdfData.data).buffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setNewPdfUrl(url);
    setButtonsDisabled(false);
  };

  const downloadPDF = (e)=>{
    e.preventDefault();
    saveAs(newPdfUrl, `${info.firmGstIn}_Invoice${info.invoiceNumber}.pdf`);
  }

  //update the URL in the current batch iteslf.
  useEffect(()=>{
    console.log("Updated new pdf url :", newPdfUrl);
  }, [newPdfUrl])

  useEffect(()=>{
    console.log(buttonsDisabled);
  }, [buttonsDisabled])

  //  UI
  return (
    <div className="bg-gray-100 py-8 px-4">
      {isLoading && <p>Loading...</p>}
      {!isLoading && info != null && (
        <div>
          <form className="space-y-8">
            <h1 className="text-3xl font-semibold text-gray-700 text-center underline ">
              Invoice Details
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">Firm:</span>
              {/* name ->firm name */}
              <span className="font-bold text-gray-700">{user.company}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">Invoice No.:</span>
              <span className="font-bold text-gray-700">
                {invoice.invoiceNumber}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">Date:</span>
              <span className="font-bold text-gray-700">
                {invoice.date.substr(0, 10)}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">Contact:</span>
              <span className="font-bold text-gray-700">{user.phone}</span>
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
                value={info.buyerName}
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
                value={info.buyerAddress}
                required
                className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700"
              />
              <div className="grid sm:grid-cols-1">
                <div className="">
                  <label className="text-gray-500 mr-2 flex">
                    Buyer Pincode:
                  </label>
                  <input
                    type="number"
                    name="buyerPincode"
                    placeholder="Enter Pincode"
                    onChange={inputChange}
                    value={info.buyerPincode}
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
                    value={info.buyerGstIn}
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
                value={info.buyerContact}
                required
                className="rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700"
              />
            </div>

            <div>
              <div>
                <div className="mt-4 flex flex-col w-full  rounded overflow-hidden">
                  <div className="container mx-auto my-8">
                    <button
                      type="button"
                      className="rounded-lg bg-green-500 text-white font-bold py-2 px-4 hover:bg-green-700"
                      onClick={addItem}
                    >
                      Add Item
                    </button>
                    <div className="card-list grid gap-4 mt-8">
                      <Item
                        items={items}
                        onDelete={deleteItem}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="rounded-md bg-yellow-400 px-4 py-2 font-semibold text-black shadow-md hover:bg-yellow-500"
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
      )}
    </div>
  );
};

export default EditInvoice;
