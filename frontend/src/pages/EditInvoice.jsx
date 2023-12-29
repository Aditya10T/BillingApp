import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../url";
import axios from "axios";
import Item from "./Item";


const EditInvoice = () => {
  const id = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const [jpgUrl, setJpgUrl] = useState("");
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")).user;
  console.log(user);

  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    async function func(id) {
      const response = await fetchInvoiceById(id);
      setInvoice(response.data[0]);
      setIsLoading(false);
    //   console.log(invoice[0]);
    }
    func(id);
  }, [id]);

  async function fetchInvoiceById(id) {
    // Simulating an API call
    const response = await axios.post(
      URL + "/api/invoice/invoicedetails",
      JSON.stringify(id),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response;
  }


  const [items, setItems] = useState([]);


  useEffect(()=>{
    console.log(isLoading);
    console.log(invoice);
    if(!isLoading && invoice!=null){
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
        itemDetails: invoice.itemName.map((itemName) => ({
          itemNamep: itemName,
          itemHsnp: 0, // Assuming default values for other fields
          itemQuantityp: 0,
          itemPricep: 0,
          itemCgstp: 0,
          itemSgstp: 0,
        }))
    });
    setItems(invoice.itemName.map((itemName) => ({
      itemNamep: itemName,
      itemHsnp: 0, // Assuming default values for other fields
      itemQuantityp: 0,
      itemPricep: 0,
      itemCgstp: 0,
      itemSgstp: 0,
    })))

    setData(invoice.itemName.map((itemName) => ({
      itemNamep: itemName,
      itemHsnp: 0, // Assuming default values for other fields
      itemQuantityp: 0,
      itemPricep: 0,
      itemCgstp: 0,
      itemSgstp: 0,
    })))


    // for(let i = 0;i<invoice.itemName.length;i++)
    // {
        // console.log(invoice.itemName[i]);
        // var newItems = items;
        // newItems.push({
        //     itemNamep: invoice.itemName[i],
        //     itemHsnp: invoice.itemHsn[i],
        //     itemQuantityp: invoice.itemQuantity[i],
        //     itemPricep: invoice.itemPrice[i],
        //     itemCgstp: invoice.itemCgst[i],
        //     itemSgstp: invoice.itemSgst[i],
        // });
        // setItems(newItems);
        // console.log("ok");
    // setData([...items]);
    // setInfo({ ...info, itemDetails: [...items] });
    // console.log("item details: ", info.itemDetails)
    // console.log("new data", items);
        // console.log("items", items)
    // }
    
    
}
  }, [isLoading, invoice])

  const [info, setInfo] = useState(null);

  

  

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


  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };



  const successCallback = (response) => {
    console.log("received pdf url : " + response.data.pdf_link);
    console.log("recieved jpg url : " + response.data.jpg_link);
    setPdfUrl(response.data.pdf_link);
    setJpgUrl(response.data.jpg_link);
  };

  useEffect(() => {
    console.log(info);
  }, [info]);


  const formSubmission = async (e) => {
    e.preventDefault();
    console.log("final data ", data);
    console.log("final items", items)
    // setInfo({ ...info, itemDetails: data });
    console.log("final info", info);
    console.log(JSON.stringify(info));

    try {
      const response = await axios
        .post(`${URL}/api/invoice/updatepdf`, JSON.stringify(info), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          successCallback(response);
        });

      // console.log(response);
    } catch (error) {
      console.log(error);
    }
    // console.log(pdfUrl);
    e.preventDefault();
  };


  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    console.log("skdj");
    const itemInput = [...items];
    itemInput[index][name] =
      name == "itemNamep" ? value : value >= 0 ? parseFloat(value) : 0;
    setItems(itemInput);
    updateData(items);
    setInfo((prevInfo) =>({
      ...prevInfo,
      itemDetails : [
        ...prevInfo.itemDetails.slice(0, index), 
        { ...prevInfo.itemDetails[index], [name]: value}, 
        ...prevInfo.itemDetails.slice(index+1),

      ]
    }));

    evnt.preventDefault();
  };

 

  useEffect(() => {
    console.log("updated pdf url : " + pdfUrl);
  }, [pdfUrl]);

  useEffect(() => {
    console.log("updated jpg url : " + jpgUrl);
  }, [jpgUrl]);

  useEffect(() => {
    console.log("got?", user);
    console.log("data ", data);
    console.log("item Details", info);
  }, [data]);

  const updateData = (newData) => {
    console.log("ok");
    setData([...newData]);
    setInfo({ ...info, itemDetails: [...data] });
    console.log("item details: ", info.itemDetails)
    console.log("new data", data);
  };



  return (
    <div className="bg-gray-100 py-8 px-4">
    {isLoading && <p>Loading...</p>}
    {!isLoading && info!=null && <div>
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
          <span className="font-bold text-gray-700">{invoice.invoiceNumber}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Date:</span>
          <span className="font-bold text-gray-700">{invoice.date.substr(0, 10)}</span>
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
              <label className="text-gray-500 mr-2 flex">Buyer Pincode:</label>
              <input
                type="number"
                name="buyerPincode"
                placeholder="Enter Pincode"
                onChange={inputChange}
                value = {info.buyerPincode}
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
                value = {info.buyerGstIn}
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
                <div className="card-list grid gap-4 mt-8" >
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
          onClick={formSubmission}
        >
          Generate PDF
        </button>
      </form>
      <div className="grid grid-cols-5 cols">
        {pdfUrl != "" && (
          <img
            src={jpgUrl}
            className="w-10/12 col-span-4 border border-black my-10 mx-auto"
          />
        )}
        {/* {pdfUrl != "" && <iframe src={pdfUrl} className="w-10/12 col-span-4 border border-black my-10 mx-auto" />} */}

        {pdfUrl != "" && (
          <a href={jpgUrl} download="invoice.jpg">
            <button className="rounded-md bg-yellow-400 px-4 py-2 mx-auto my-auto h-min font-semibold text-black shadow-md hover:bg-yellow-500">
              Download
            </button>
          </a>
        )}
      </div>
      </div>
}
    </div>
        
  );
};

export default EditInvoice;
