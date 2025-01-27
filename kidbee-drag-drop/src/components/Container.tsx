import React, { useCallback } from "react";
import { useDrop } from "react-dnd";
import { Item } from "../types/drag-drop";

const rainbowColors = ["#FF0000", "#FFFF00", "#00FF00", "#0000FF", "#FFA500", "#00FFFF", "#800080"];

interface ContainerProps {
  id: number;
  condition: string;
  items: Item[];
  moveItemToContainer: (itemId: number, containerId: number) => void;
  image: string;
  name: string;
  index: number;
}

const Container: React.FC<ContainerProps> = ({ id, condition, items, moveItemToContainer, image, name, index }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "Item",
    drop: (item: { id: number }) => {
        moveItemToContainer(item.id, id);
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
      }),
    });
  
    const dropRef = useCallback(
      (node: HTMLDivElement | null) => {
        drop(node);
      },
      [drop]
    );

  const backgroundColor = rainbowColors[index % rainbowColors.length];

  return (
    <div
      ref={dropRef}
      className={`relative flex flex-col items-center p-4 rounded-lg shadow-md transition-all duration-300 ${
        isOver ? "bg-opacity-80" : ""
      }`}
      style={{ backgroundColor }}
    >
      <h2
        className="text-xl md:text-lg sm:text-base font-bold text-white mb-4 p-2 rounded-lg bg-opacity-90 text-center"
        style={{ backgroundColor: "#00000090" }}
      >
        {name}
      </h2>
      <img
        src={image}
        alt={`Дом ${condition}`}
        className="w-full h-40 sm:h-32 object-cover rounded-md border-2 border-white"
      />
      <div className="absolute bottom-4 left-4 flex gap-2 sm:gap-1">
        {items.map(item => (
          <img
            key={item.id}
            src={item.image}
            alt={item.name}
            width="30"
            height="30"
            className="w-8 h-8 sm:w-6 sm:h-6 rounded-full border-2 border-white"
          />
        ))}
      </div>
    </div>
  );
  
};

export default Container;
