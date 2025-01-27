import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { Item } from "../types/drag-drop";

const ItemComponent: React.FC<{ item: Item }> = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "Item",
    item: { id: item.id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [randomOffset, setRandomOffset] = useState<number>(0);

  useEffect(() => {
    setRandomOffset(Math.random() * 50);
  }, []);

 return (
  <div
    ref={(node: HTMLDivElement | null) => {
      if (node) {
        drag(node);
      }
    }}
    style={{
      opacity: isDragging ? 0.5 : 1,
      cursor: "move",
      margin: "10px",
      transform: `translateY(${randomOffset}px)`,
    }}
    className="transition-all duration-300 ease-in-out p-3 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 sm:p-2 sm:hover:scale-100"
  >
    <img
      src={item.image}
      alt={item.name}
      className="w-20 h-20 object-cover rounded-full mx-auto sm:w-16 sm:h-16"
    />
    <p className="text-center text-lg font-bold mt-2 sm:text-base sm:mt-1">
      {item.name}
    </p>
  </div>
);

};

export default ItemComponent;
