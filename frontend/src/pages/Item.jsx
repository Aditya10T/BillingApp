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

    function func(index, event) {
      console.log(index);
      onDelete(index, event);
      console.log("ok");
    }

    return (
      <div
        className="rounded  bg-gray-200 dark:bg-gray-900 dark:border-2 dark:border-orange-600 p-4 my-5"
        key={index}
      >
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          <div>
            <label className="text-gray-500 flex dark:text-white">
              Item Name
            </label>
            <input
              name="itemNamep"
              type="text"
              value={itemNamep}
              placeholder="Item Name"
              className="border-2 border-gray-500 rounded dark:bg-gray-700 dark:focus:border-green-600 outline-0 w-11/12 px-2"
              onChange={(event) => handleChange(index, event)}
            ></input>
          </div>
          <div>
            <label className="text-gray-500 flex dark:text-white ">
              HSN/SAC
            </label>
            <input
              name="itemHsnp"
              type="text"
              value={itemHsnp >= 0 ? itemHsnp : ""}
              placeholder="HSN/SAC"
              className="border-2 border-gray-500 rounded dark:bg-gray-700 dark:focus:border-green-600 outline-0 w-11/12 px-2"
              onChange={(event) => handleChange(index, event)}
            ></input>
          </div>
          <div>
            <label className="text-gray-500 dark:text-white flex">
              Quantity
            </label>
            <input
              name="itemQuantityp"
              type="text"
              value={itemQuantityp >= 0 ? itemQuantityp : ""}
              placeholder="Quantity"
              className="border-2 border-gray-500 rounded dark:bg-gray-700 dark:focus:border-green-600 outline-0 w-11/12 px-2"
              onChange={(event) => handleChange(index, event)}
            ></input>
          </div>
          <div>
            <label className="text-gray-500 flex dark:text-white">Price</label>
            <input
              name="itemPricep"
              placeholder="Price"
              type="text"
              value={itemPricep >= 0 ? itemPricep : ""}
              className="border-2 border-gray-500 rounded dark:bg-gray-700 dark:focus:border-green-600 outline-0 w-11/12 px-2"
              onChange={(event) => handleChange(index, event)}
            ></input>
          </div>
          <div>
            <label className="text-gray-500 flex dark:text-white">CGST</label>
            <input
              name="itemCgstp"
              placeholder="CGST"
              type="text"
              value={itemCgstp >= 0 ? itemCgstp : ""}
              className="border-2 border-gray-500 rounded dark:bg-gray-700 dark:focus:border-green-600 outline-0 w-11/12 px-2"
              onChange={(event) => handleChange(index, event)}
            ></input>
          </div>
          <div>
            <label className="text-gray-500 flex dark:text-white">SGST</label>
            <input
              name="itemSgstp"
              placeholder="SGST"
              type="text"
              value={itemSgstp >= 0 ? itemSgstp : ""}
              className="border-2 border-gray-500 rounded dark:bg-gray-700 dark:focus:border-green-600 outline-0 w-11/12 px-2"
              onChange={(event) => handleChange(index, event)}
            ></input>
          </div>
        </div>
        <div className="grid place-content-center">
          <button
            type="button"
            className="mt-4 border-2  dark:text-white border-orange-600 bg-orange-600 font-bold rounded px-2"
            onClick={(event) => func(index, event)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
};

export default Item;
