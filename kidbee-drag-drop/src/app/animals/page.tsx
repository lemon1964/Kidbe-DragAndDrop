import ClientDragDropGame from "@/components/ClientDragDropGame";
import taskData from "@/data/AnimalsFige.json";
import { TaskData } from "../../types/drag-drop";


export default function AnimalsPage() {
  return (
    <ClientDragDropGame taskData ={taskData as TaskData} />
  );
}
