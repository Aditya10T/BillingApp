import React, { useEffect, useState } from "react";
import TableRows from "./TableRows.jsx";
import Item from "./Item.jsx";

const AddDeleteTableRows = ({ updateData }) => {

  const [items, setItems] = useState([]);

  useEffect(()=>{
    console.log(items);
  }, [items]);

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

  const addItem = () => {
    setItems([
      ...items,
      {
        itemNamep: "",
        itemHsnp: 0,
        itemQuantityp: 0,
        itemPricep: 0,
        itemCgstp: 0,
        itemSgst: 0,
      },
    ]);
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