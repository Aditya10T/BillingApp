import React, { useState } from "react";
import TableRows from "./TableRows.jsx";
import Item from "./Item.jsx";

const AddDeleteTableRows = ({ updateData }) => {
  // const [rowsData, setRowsData] = useState([]);

  // const addTableRows = (e) => {
    // const rowsInput = {
    //   itemNamep: "",
    //   itemHsnp: 0,
    //   itemQuantityp: 0,
    //   itemPricep: 0,
    //   itemCgstp: 0,
    //   itemSgstp: 0,
    // };
    // setRowsData([...rowsData, rowsInput]);
    // e.preventDefault();

    // console.log(rowsData)
  // };
  // const deleteTableRows = (index) => {
  //   const rows = [...rowsData];
  //   rows.splice(index, 1);
  //   setRowsData(rows);
  // };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    console.log("skdj");
    const itemInput = [...items];
    itemInput[index][name] =
      name == "itemNamep" ? value : value >= 0 ? parseFloat(value) : 0;
    setItems(itemInput);
    updateData(items);

    evnt.preventDefault();
  };

  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, { itemNamep: "", itemHsnp: 0, itemQuantityp: 0, itemPricep:0, itemCgstp:0, itemSgst:0 }]);
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div>
      <div>
        <div className="mt-4 flex flex-col w-full  rounded overflow-hidden">
          {/* <table className="w-full  text-sm text-left text-gray-600 dark:text-gray-400">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-800 justify-center">
                <th className="text-center px-4 py-2 mx-1">Item Name</th>
                <th className="text-center px-4 py-2 mx-1">HSN/SAC</th>
                <th className="text-center px-4 py-2 mx-1">Quantity</th>
                <th className="text-center px-4 py-2 mx-1">Price</th>
                <th className="text-center px-4 py-2 mx-1">CGST</th>
                <th className="text-center px-4 py-2 mx-1">SGST</th>
                <th className="text-center px-4 py-2 mx-1">
                  <button
                    className="bg-white w-20 rounded border border-green-900 align-top justify-center text-black "
                    onClick={addTableRows}
                  >
                    Add row
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <TableRows
                rowsData={rowsData}
                deleteTableRows={deleteTableRows}
                handleChange={handleChange}
              />
            </tbody>
          </table> */}

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
                  onDelete={() => deleteItem}
                  handleChange={handleChange}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDeleteTableRows;

// import React, { useState } from "react";

// const AddDeleteTableRows = ({ rowsData, updateData, deleteTableRows, handleChange }) => {
//   const [formData, setFormData] = useState({
//     itemName: "",
//     hsnSac: 0,
//     quantity: 0,
//     price: 0,
//     cgst: 0,
//     sgst: 0,
//   });

//   const handleAddItem = () => {
//     // Update local state and parent with new item
//     setFormData({ ...formData, itemName: "" });
//     updateData([...rowsData, formData]);
//   };

//   const handleDeleteItem = (index) => {
//     const updatedRows = [...rowsData];
//     updatedRows.splice(index, 1);
//     updateData(updatedRows);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <div className="mt-4 flex flex-col w-full border border-gray-300 rounded overflow-hidden">
//       <table className="w-full table-fixed text-sm text-left text-gray-600 dark:text-gray-400">
//         <thead>
//           <tr className="bg-gray-200 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-800">
//             <th className="px-4 py-2">Item Name</th>
//             <th className="px-4 py-2">HSN/SAC</th>
//             <th className="px-4 py-2">Quantity</th>
//             <th className="px-4 py-2">Price</th>
//             <th className="px-4 py-2">CGST%</th>
//             <th className="px-4 py-2">SGST%</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {/* {rowsData.map((item, index) => (
//             <tr key={index} className="border-b border-gray-300 dark:border-gray-800">
//               <td className="px-4 py-2">{item.itemName}</td>
//               <td className="px-4 py-2">{item.hsnSac}</td>
//               <td className="px-4 py-2">{item.quantity}</td>
//               <td className="px-4 py-2 text-right pr-4">{item.price}</td>
//               <td className="px-4 py-2 text-right pr-4">{item.cgst}</td>
//               <td className="px-4 py-2 text-right pr-4">{item.sgst}</td>
//               <td className="px-4 py-2 flex items-center">
//                 <button
//                   onClick={() => handleChange(index, event)}
//                   type="button"
//                   className="mr-2 text-blue-500 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteTableRows(index)}
//                   type="button"
//                   className="text-red-500 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))} */}
//            <TableRows
//                 rowsData={rowsData}
//                 deleteTableRows={deleteTableRows}
//                 handleChange={handleChange}
//               />
//         </tbody>
//       </table>
//       <div className="flex items-center mt-4 px-4">
//         <label
//           className="font-bold text-gray-700 mr-2"
//           htmlFor="itemName"
//         >
//           New Item:
//         </label>
//         <input
//           type="text"
//           id="itemName"
//           className="border border-gray-300 rounded px-2 py-1 w-full"
//           placeholder="Enter item name"
//           onChange={handleInputChange}
//           name="itemName"
//           value={formData.itemName}
//         />
//         <button
//           type="button"
//           onClick={handleAddItem}
//           className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
//         >
//           Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddDeleteTableRows;
