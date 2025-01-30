import React, { useCallback } from "react";
import { useDrop } from "react-dnd";
import { Item } from "../../types/drag-drop";

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

const Container: React.FC<ContainerProps> = ({
  id,
  condition,
  items,
  moveItemToContainer,
  image,
  name,
  index,
}) => {
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
      className="relative flex flex-col items-center p-4 rounded-lg shadow-md transition-all duration-300 bg-opacity-80"
      style={{
        backgroundColor,
        width: "clamp(150px, 20vw, 300px)", // Адаптивная ширина
        aspectRatio: "1", // Устанавливаем отношение сторон 1:1 для пропорциональности
      }}
    >
      <h2
        className="text-center font-bold mb-2 p-2 rounded-lg text-white"
        style={{
          fontSize: "clamp(14px, 2vw, 22px)", // Гибкий размер текста
          backgroundColor: "#00000090",
        }}
      >
        {name}
      </h2>
      <img
        src={image}
        alt={`Дом ${condition}`}
        className="w-full h-auto max-h-[70%] object-contain"
      />
      <div className="absolute bottom-2 left-2 flex gap-1">
        {items.map((item) => (
          <img
            key={item.id}
            src={item.image}
            alt={item.name}
            className="w-6 h-6 rounded-full border border-white"
          />
        ))}
      </div>
    </div>
  );
  

};  

export default Container;
