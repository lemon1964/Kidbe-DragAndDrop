import ClientDragDropGame from "@/components/ClientDragDropGame";
import taskData from "@/data/Fruits.json";
import { TaskData } from "../../types/drag-drop";


export default function FruitsPage() {
  return (
    <ClientDragDropGame taskData={taskData as TaskData} />
  );
}
