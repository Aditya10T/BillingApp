import React from "react";

const Item = ({ items, handleChange, onDelete }) => {
  return items.map((data, index) => {
    const {
      itemNamep,
      itemHsnp,
      itemQuantityp,
      itemPricep,
      itemCgstp,
      itemSgstp,
    } = data;

    function func(index, event){
      console.log(index);
      onDelete(index, event);
      console.log("ok")
    }

    return (
      <div className="card flex flex-col rounded shadow-md bg-gray-100 p-4" key={index}>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          <div>
            <label className="text-gray-500 flex ">Item Name</label>
            <input
              name="itemNamep"
              type="text"
              value={itemNamep}
              placeholder="Item Name"
              className="border border-gray-500 rounded w-11/12 px-2"
              onChange={(event) => handleChange(index, event)}
            ></input>
          </div>
          <div>
            <label className="text-gray-500 flex ">HSN/SAC</label>
            <input
              name="itemHsnp"
              type="text"
              value={itemHsnp >= 0 ? itemHsnp : ""}
              placeholder="HSN/SAC"
              className="border border-gray-500 rounded w-11/12 px-2"
              onChange={(event) => handleChange(index, event)}
            ></input>
          </div>
          <div>
            <label className="text-gray-500 flex">Price</label>
            <input
              name="itemQuantityp"
              type="text"
            value={(itemQuantityp>=0)?itemQuantityp:''}
              placeholder="Quantity"
              className="border border-gray-500 rounded w-11/12 px-2"
              onChange={(event) => handleChange(index, event)}
            ></input>
          </div>
          <div>
            <label className="text-gray-500 flex">Quantity</label>
            <input
              name="itemPricep"
              placeholder="Price"
              type="text"
            value={(itemPricep>=0)?itemPricep:''}
              className="border border-gray-500 rounded w-11/12 px-2"
              onChange={(event) => handleChange(index, event)}
            ></input>
          </div>
          <div>
            <label className="text-gray-500 flex">CGST</label>
            <input
              name="itemCgstp"
              placeholder="CGST"
              type="text"
            value={(itemCgstp>=0)?itemCgstp:''}
              className="border border-gray-500 rounded w-11/12 px-2"
              onChange={(event) => handleChange(index, event)}
            ></input>
          </div>
          <div>
            <label className="text-gray-500 flex">SGST</label>
            <input
              name="itemSgstp"
              placeholder="SGST"
              type="text"
            value={(itemSgstp>=0)?itemSgstp:''}
              className="border border-gray-500 rounded w-11/12 px-2"
              onChange={(event) => handleChange(index, event)}
            ></input>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 bg-red-500 text-white font-bold rounded py-1 px-2 hover:bg-red-700"
          onClick={(event)=>func(index, event)}
        >
          Delete
        </button>
      </div>
    );
  });
};

export default Item;
