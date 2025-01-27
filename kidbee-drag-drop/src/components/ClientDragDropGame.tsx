"use client";

import { Provider } from "react-redux";
import store from "../store/store";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import DragDrop from "./DragDrop";
import { TaskData } from "../types/drag-drop";

interface ClientDragDropGameProps {
  taskData: TaskData;
}

const ClientDragDropGame: React.FC<ClientDragDropGameProps> = ({ taskData }) => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default ClientDragDropGame;



// "use client";

// import { Provider } from "react-redux";
// import store from "../store/store";

// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// // import taskData from "@/data/Fruits.json";
// import taskData from "@/data/AnimalsFige.json";
// import DragDrop from "./DragDrop";

// const ClientDragDropGame = () => {
//   return (
//     <Provider store={store}>
//       <DndProvider backend={HTML5Backend}>
//       <div>
//           <DragDrop 
//             taskData={{
//               ...taskData,
//               containers: taskData.containers.map(container => ({
//                 ...container,
//                 items: [],
//               })),
//             }}
//           />
//         </div>
//       </DndProvider>
//     </Provider>
//   );
// };

// export default ClientDragDropGame;