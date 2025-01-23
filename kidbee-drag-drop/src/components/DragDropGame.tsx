"use client";

import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { motion } from "framer-motion";
import { useId } from 'react';
import '../app/styles/globals.css';


type Item = {
  id: string;
  name: string;
};

type Baskets = {
  [key: string]: Item[];
};

const initialItems: Item[] = [
  { id: "item-1", name: "Яблоко" },
  { id: "item-2", name: "Морковь" },
  { id: "item-3", name: "Банан" },
  { id: "item-4", name: "Капуста" },
];

const DragDropGame = () => {
  const [items, setItems] = useState<Item[]>(initialItems); // Список "Предметы"
  const [baskets, setBaskets] = useState<Baskets>({ basket1: [], basket2: [] }); // Корзины

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (!over) return; // Если предмет не был перетащен в допустимую область

    const fromBasket = active.data.current?.basket || "items";
    const toBasket = over.id;

    if (fromBasket === toBasket) return; // Если предмет перетаскивается в ту же область

    const activeItemId = active.id;
    let movedItem: Item | undefined;

    if (fromBasket === "items") {
      // Удалить из "Предметы" и переместить в корзину
      setItems(prevItems => {
        movedItem = prevItems.find(item => item.id === activeItemId);
        return prevItems.filter(item => item.id !== activeItemId);
      });
    } else {
      // Удалить из корзины и переместить в другую корзину или в "Предметы"
      setBaskets(prevBaskets => {
        movedItem = prevBaskets[fromBasket].find(item => item.id === activeItemId);
        return {
          ...prevBaskets,
          [fromBasket]: prevBaskets[fromBasket].filter(item => item.id !== activeItemId),
        };
      });
    }

    if (movedItem) {
      if (toBasket === "items") {
        // Добавить в "Предметы"
        setItems(prevItems => [...prevItems, movedItem!]);
      } else {
        // Добавить в корзину
        setBaskets(prevBaskets => ({
          ...prevBaskets,
          [toBasket]: [...prevBaskets[toBasket], movedItem!],
        }));
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 container">
        <DroppableArea id="items" items={items} />
        <DroppableArea id="basket1" items={baskets.basket1} />
        <DroppableArea id="basket2" items={baskets.basket2} />
      </div>
    </DndContext>
  );
};

type DroppableAreaProps = {
  id: string;
  items: Item[];
};

// В компоненте DroppableArea добавим анимацию подтверждения
const DroppableArea = ({ id, items }: DroppableAreaProps) => {
  const { setNodeRef } = useDroppable({ id });

  const uniqueId = useId();

  return (
    <motion.div
      ref={setNodeRef}
      className="p-4 border border-gray-400 w-48"
      aria-describedby={`DndDescribedBy-${uniqueId}`} // Уникальный идентификатор
      animate={{ backgroundColor: "#e8ffeb" }} // Цвет подтверждения
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
    <h3 className="text-lg font-bold mb-2 text-blue-600">
        {id === "items" ? "Предметы" : `Корзина ${id.slice(-1)}`}
      </h3>
      <div className="space-y-2">
        {items.map(item => (
          <DraggableItem key={item.id} id={item.id} name={item.name} basket={id} />
        ))}
      </div>
    </motion.div>
  );
};

type DraggableItemProps = {
  id: string;
  name: string;
  basket: string;
};

const DraggableItem = ({ id, name, basket }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { basket },
  });

  const uniqueId = useId();

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        zIndex: 9999, // Добавление большого значения zIndex
      }
    : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      aria-describedby={`DndDescribedBy-${uniqueId}`} // Уникальный идентификатор
      className={`p-2 bg-blue-600 rounded-md shadow cursor-pointer text-black dark:text-white`}
      whileHover={{ scale: 1.1 }} // Небольшое увеличение при наведении курсора
      transition={{ type: "spring", stiffness: 800, damping: 100 }}
    >
      {name}
    </motion.div>
  );
};

export default DragDropGame;
