

"use client";

import { Provider } from "react-redux";
import store from "../../store/store";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// import taskData from "@/data/Fruits.json";
import taskData from "@/data/AnimalsFige.json";
import DragDropAnimalsWithGraphics from "../Game/DragDrop";

const ClientDragDropGame = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
      <div>
          <DragDropAnimalsWithGraphics 
            taskData={{
              ...taskData,
              containers: taskData.containers.map(container => ({
                ...container,
                items: [], // Добавляем пустой массив
              })),
            }}
          />
        </div>
      </DndProvider>
    </Provider>
  );
};

export default ClientDragDropGame;