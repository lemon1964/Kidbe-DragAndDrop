import React, { useState } from "react";
import Link from "next/link";
import Container from "./Container";
import ItemList from "./ItemList";
import { TaskData, Container as ContainerType, Item } from "@/types/drag-drop";
import { useDispatch } from "react-redux";
import { showNotification } from "@/reducers/notificationReducer";
import { AppDispatch } from "@/store/store";
import Notification from "@/components/Notification";

interface TaskBoardProps {
  taskData: TaskData;
}

const DragDrop: React.FC<TaskBoardProps> = ({ taskData }) => {
  const dispatch = useDispatch<AppDispatch>();

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
      if (draggedItem.condition !== targetContainer.condition) {
        dispatch(showNotification("Упс, попробуй еще раз...", "error", 1));
        return;
      }

      dispatch(showNotification("Абсолютно точно!", "success", 1));

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
      className="min-h-screen w-full flex flex-col items-center px-2 sm:px-4"
      style={{
        backgroundImage: `url(${taskData.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Notification />
      {/* Кнопка "На главную" */}
      <div className="w-full flex justify-start p-2 sm:p-4">
        <Link
          href="/"
          className="text-base sm:text-lg text-white bg-green-600 px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-500 transition"
        >
          На главную
        </Link>
      </div>

      {/* Заголовок */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-white drop-shadow-md">
        {taskData.task}
      </h1>

      {/* Контейнеры-домики */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap- lg:gap-36 w-full max-w-5xl">
        {containers.map((container, index) => (
          <Container
            key={container.id}
            {...container}
            index={index}
            moveItemToContainer={moveItemToContainer}
          />
        ))}
      </div>

      {/* Животные */}
      <ItemList items={unassignedItems} />
    </div>
  );
};

export default DragDrop;
