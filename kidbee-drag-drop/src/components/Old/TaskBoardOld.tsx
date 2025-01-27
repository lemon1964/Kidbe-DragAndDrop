// src/components/DragDropAnimalsWithGraphics.tsx
import React, { useCallback, useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TaskData, Item, Container } from "../../types/drag-drop";

interface TaskBoardProps {
  taskData: TaskData;
}

const rainbowColors = ["#FF0000", "#FFFF00", "#00FF00", "#0000FF", "#FFA500", "#00FFFF", "#800080"]; // Красный, Желтый, Зеленый, Синий, Оранжевый, Голубой, Фиолетовый

const TaskBoard: React.FC<TaskBoardProps> = ({ taskData }) => {
  const [containers, setContainers] = useState<Container[]>(
    taskData.containers.map(container => ({
      ...container,
      items: [],
    }))
  );

  const [unassignedItems, setUnassignedItems] = useState<Item[]>(taskData.items);

  const moveItemToContainer = (itemId: number, containerId: number) => {
    const draggedItem = unassignedItems.find(item => item.id === itemId);
    const targetContainer = containers.find(container => container.id === containerId);

    if (draggedItem && targetContainer) {
      // Проверка на соответствие цвета животного и цвета дома
      if (draggedItem.condition !== targetContainer.condition) {
        return;
      }

      setUnassignedItems(prevItems => prevItems.filter(item => item.id !== itemId));
      setContainers(prevContainers =>
        prevContainers.map(container =>
          container.id === containerId
            ? { ...container, items: [...container.items, draggedItem] }
            : container
        )
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: `url(${taskData.backgroundImage})` }}
    >
      <div className="bg-opacity-50 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-[0_0_8px_rgba(0,0,255,0.8)]">
          {taskData.task}
        </h1>
        <div className="flex gap-8 justify-center mb-12">
          {containers.map((container, index) => (
            <Container
              key={container.id}
              id={container.id}
              condition={container.condition}
              items={container.items}
              moveItemToContainer={moveItemToContainer}
              image={container.image}
              name={container.name}
              index={index}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          <ItemList items={unassignedItems} />
        </div>
      </div>
    </div>
  );
};

const Container: React.FC<{
  id: number;
  condition: string;
  items: Item[];
  moveItemToContainer: (itemId: number, containerId: number) => void;
  image: string;
  name: string;
  index: number;
}> = ({ id, condition, items, moveItemToContainer, image, name, index }) => {
  const [{ isOver }, drop] = useDrop<{ id: number }, void, { isOver: boolean }>({
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

    // Назначение цвета радуги по индексу
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
        className={`text-xl font-bold text-white mb-4 p-2 rounded-lg bg-opacity-90`}
        style={{ backgroundColor: "#00000090" }}
      >
        {name}
      </h2>
      <img
        src={image}
        alt={`Дом ${condition}`}
        className="w-full h-40 object-cover rounded-md border-2 border-white"
      />
      <div className="absolute bottom-4 left-4 flex gap-2">
        {items.map(item => (
          <img
            key={item.id}
            src={item.image}
            alt={item.name}
            width="30"
            height="30"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
        ))}
      </div>
    </div>
  );
};

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
      className="transition-all duration-300 ease-in-out p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-full mx-auto"
      />
      <p className="text-center text-lg font-bold mt-2">{item.name}</p>
    </div>
  );
};

const ItemList: React.FC<{ items: Item[] }> = ({ items }) => {
  return (
    <div className="flex flex-wrap justify-start gap-6 p-6">
      {items.map(item => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
};

export default TaskBoard;