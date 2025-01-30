// src/types/drag-drop.d.ts

export interface Item {
  id: number;
  name: string;
  condition: string;
  image: string;
}

export interface Container {
  id: number;
  name: string;
  condition: string;
  image: string;
  items: Item[];
}

export interface TaskData {
  containers: Container[];
  items: Item[];
  backgroundImage: string;
  task: string;
}

