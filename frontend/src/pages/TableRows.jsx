// import React from "react";

// const TableRows = ({ rowsData, deleteTableRows, handleChange }) => {
//   return rowsData.map((data, index) => {
//     const { itemNamep, itemHsnp, itemQuantityp, itemPricep, itemCgstp, itemSgstp } = data;
//     return (
//       <tr className="align-middle" key={index}>
//         <td >
//           <input
//             className="border border-black rounded bg-green-200 my-2 px-2 text-center"
//             placeholder="Item Name"
//             type="text"
//             value={itemNamep}
//             onChange={(evnt) => handleChange(index, evnt)}
//             name="itemNamep"
//           />
//         </td>
//         <td>
//           <input
//             className="border border-black rounded bg-green-200 my-2 px-2 text-center"
//             placeholder="HSN/SAC(default 0)"
//             type="text"
//             value={(itemHsnp>0)?itemHsnp:''}
//             onChange={(evnt) => handleChange(index, evnt)}
//             name="itemHsnp"
//           />
//         </td>
//         <td>
//           <input
//             className="border border-black rounded bg-green-200 my-2 px-2 text-center"
//             placeholder="Quantity(default 0)"
//             type="text"
//             value={(itemQuantityp>0)?itemQuantityp:''}
//             onChange={(evnt) => handleChange(index, evnt)}
//             name="itemQuantityp"
//           />{" "}
//         </td>
//         <td>
//             <input
//             className="border border-black rounded bg-green-200 my-2 px-2 text-center"
//             placeholder="Price(default 0)"
//             type="text"
//             value={(itemPricep>0)?itemPricep:''}
//             onChange={(evnt) => handleChange(index, evnt)}
//             name="itemPricep"
//           />
//         </td>
//         <td>
//             <input
//             className="border border-black rounded bg-green-200 my-2 px-2 text-center"
//             placeholder="CGST(default 0)"
//             type="text"
//             value={(itemCgstp>0)?itemCgstp:''}
//             onChange={(evnt) => handleChange(index, evnt)}
//             name="itemCgstp"
//           />
//         </td>
//         <td>
//             <input
//             className="border border-black rounded bg-green-200 my-2 px-2 text-center"
//             placeholder="SGST(default 0)"
//             type="text"
//             value={(itemSgstp>0)?itemSgstp:''}
//             onChange={(evnt) => handleChange(index, evnt)}
//             name="itemSgstp"
//           />
//         </td>
//         <td>
//           <button
//             className="bg-red-400 w-20 rounded border border-red-900 align-top justify-center "
//             onClick={() => deleteTableRows(index)}
//           >
//             Delete
//           </button>
//         </td>
//       </tr>
//     );
//   });
// };

// export default TableRows;











import React from "react";

const TableRows = ({ rowsData, deleteTableRows, handleChange }) => {
  return rowsData.map((data, index) => {
    const { itemNamep, itemHsnp, itemQuantityp, itemPricep, itemCgstp, itemSgstp } = data;

    return (
      <tr className="border-b border-gray-300 rounded hover:bg-gray-200 text-black " key={index}>
        <td className="text-left px-2 py-1">
          <input
            className="border border-gray-300 rounded bg-gray-100 px-2 py-1"
            placeholder="Item Name"
            type="text"
            value={itemNamep}
            onChange={(event) => handleChange(index, event)}
            name="itemNamep"
          />
        </td>
        <td className="text-left px-2 py-1">
          <input
            className="border border-gray-300 rounded bg-gray-100 px-2 py-1"
            placeholder="HSN/SAC"
            type="text"
            value={itemHsnp}
            onChange={(event) => handleChange(index, event)}
            name="itemHsnp"
          />
        </td>
        <td className="text-right px-2 py-1">
          <input
            className="border border-gray-300 rounded bg-gray-100 px-2 py-1 text-right"
            type="number"
            placeholder="Quantity"
            value={itemQuantityp}
            onChange={(event) => handleChange(index, event)}
            name="itemQuantityp"
          />
        </td>
        <td className="text-right px-2 py-1">
          <input
            className="border border-gray-300 rounded bg-gray-100 px-2 py-1 text-right"
            type="number"
            placeholder="Price"
            value={itemPricep}
            onChange={(event) => handleChange(index, event)}
            name="itemPricep"
          />
        </td>
        <td className="text-right px-2 py-1">
          <input
            className="border border-gray-300 rounded bg-gray-100 px-2 py-1 text-right"
            type="number"
            placeholder="CGST"
            value={itemCgstp}
            onChange={(event) => handleChange(index, event)}
            name="itemCgstp"
          />
        </td>
        <td className="text-right px-2 py-1">
          <input
            className="border border-gray-300 rounded bg-gray-100 px-2 py-1 text-right"
            type="number"
            placeholder="SGST"
            value={itemSgstp}
            onChange={(event) => handleChange(index, event)}
            name="itemSgstp"
          />
        </td>
        <td className="text-center px-2 py-1">
          <button
            className="text-black bg-red-200 hover:bg-red-300 rounded border border-red-300 px-2 py-1"
            onClick={() => deleteTableRows(index)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
};

export default TableRows;

