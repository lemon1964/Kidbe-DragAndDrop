"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "@/components/Game/DragDrop";
import { TaskData } from "@/types/drag-drop";

interface ClientDragDropGameProps {
  taskData: TaskData;
}

const ClientDragDropGame: React.FC<ClientDragDropGameProps> = ({ taskData }) => {
  return (
      <DndProvider backend={HTML5Backend}>
        <div>
          <DragDrop
            taskData={{
              ...taskData,
              containers: taskData.containers.map(container => ({
                ...container,
                items: [],
              })),
            }}
          />
        </div>
      </DndProvider>
  );
};

export default ClientDragDropGame;

