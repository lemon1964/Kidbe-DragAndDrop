import React from "react";
import ItemComponent from "./ItemComponent";
import { Item } from "../types/drag-drop";


const ItemList: React.FC<{ items: Item[] }> = ({ items }) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 p-2 sm:p-4 w-full max-w-5xl">
    {items.map(item => (
      <ItemComponent key={item.id} item={item} />
    ))}
  </div>
);

  // без мобильной адаптации
// const ItemList: React.FC<{ items: Item[] }> = ({ items }) => (
//   <div className="flex flex-wrap justify-start gap-6 p-6 sm:gap-3 sm:p-4">
//     {items.map(item => (
//       <ItemComponent key={item.id} item={item} />
//     ))}
//   </div>
// );


export default ItemList;
