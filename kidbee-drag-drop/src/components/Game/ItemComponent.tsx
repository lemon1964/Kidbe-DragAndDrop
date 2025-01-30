import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { Item } from "../../types/drag-drop";

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
      className="p-2 rounded-lg shadow-lg hover:scale-105 transition-all transform"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        width: "clamp(72px, 9.6vw, 144px)", // Увеличено на 20%
        height: "clamp(72px, 9.6vw, 144px)", // Увеличено на 20%
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-contain rounded-full border-4 border-white shadow-xl transition-all hover:shadow-2xl"
      />
      <p
        className="text-center mt-1 font-bold"
        style={{
          fontSize: "clamp(12px, 1.8vw, 19.2px)", // Увеличено на 20%
          background: "linear-gradient(to top, rgba(0, 0, 255, 0.5), rgba(0, 0, 255, 0.2))", // Синий фон
          color: "white",
          padding: "2px 6px",
          borderRadius: "10px",
        }}
      >
        {item.name}
      </p>
    </div>
  );
  
    // без мобильной адаптации
  //  return (
  //   <div
  // ref={(node: HTMLDivElement | null) => {
  //   if (node) {
  //     drag(node);
  //   }
  // }}
  //     style={{
  //       opacity: isDragging ? 0.5 : 1,
  //       cursor: "move",
  //       margin: "10px",
  //       transform: `translateY(${randomOffset}px)`,
  //     }}
  //     className="transition-all duration-300 ease-in-out p-3 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 sm:p-2 sm:hover:scale-100"
  //   >
  //     <img
  //       src={item.image}
  //       alt={item.name}
  //       className="w-20 h-20 object-cover rounded-full mx-auto sm:w-16 sm:h-16"
  //     />
  //     <p className="text-center text-lg font-bold mt-2 sm:text-base sm:mt-1">
  //       {item.name}
  //     </p>
  //   </div>
  // );
};

export default ItemComponent;
