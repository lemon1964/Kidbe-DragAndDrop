import React, { useState } from "react";
import Link from "next/link";
import Container from "./Container";
import ItemList from "./ItemList";
import { TaskData, Container as ContainerType, Item } from "../types/drag-drop";

interface TaskBoardProps {
  taskData: TaskData;
}

const DragDrop: React.FC<TaskBoardProps> = ({ taskData }) => {
  const [containers, setContainers] = useState<ContainerType[]>(
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
      if (draggedItem.condition !== targetContainer.condition) return;

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
      {/* Кнопка "На главную" */}
      <div className="w-full flex justify-start p-4">
        <Link
          href="/"
          className="text-lg text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition"
        >
          На главную
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-[0_0_8px_rgba(0,0,255,0.8)]">
        {taskData.task}
      </h1>
      <div className="flex gap-8 justify-center mb-12">
        {containers.map((container, index) => (
          <Container
            key={container.id}
            {...container}
            index={index}
            moveItemToContainer={moveItemToContainer}
          />
        ))}
      </div>
      <ItemList items={unassignedItems} />
    </div>
  );
};

export default DragDrop;
