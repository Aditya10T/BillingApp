import React, { useEffect, useState } from "react";
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
        itemSgstp: 0,
      },
    ]);
  };

  const  deleteItem = (index, evnt) => {
    console.log("index", index);
    // console.log(itemNamep)
    const newItems = [...items];
    newItems.splice(index, 1);
    // newItems = newItems.filter((item)=>{item.itemNamep!=itemNamep && item.itemHsnp!=itemHsnp});
    setItems(newItems);
  };

  return (
    <div>
      <div>
        <div className="mt-4 flex flex-col w-full  rounded overflow-hidden">
          
          <div className="container mx-auto my-8">
            <button
              type="button"
              className="font-semibold border-solid border-2 border-orange-600 py-2 px-5 rounded-lg  hover:bg-orange-600"
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
  );
};

export default AddDeleteTableRows;