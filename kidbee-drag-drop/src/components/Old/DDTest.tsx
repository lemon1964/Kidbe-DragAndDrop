"use client";

import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";

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
      setItems((prevItems) => {
        movedItem = prevItems.find((item) => item.id === activeItemId);
        return prevItems.filter((item) => item.id !== activeItemId);
      });
    } else {
      // Удалить из корзины и переместить в другую корзину или в "Предметы"
      setBaskets((prevBaskets) => {
        movedItem = prevBaskets[fromBasket].find((item) => item.id === activeItemId);
        return {
          ...prevBaskets,
          [fromBasket]: prevBaskets[fromBasket].filter((item) => item.id !== activeItemId),
        };
      });
    }

    if (movedItem) {
      if (toBasket === "items") {
        // Добавить в "Предметы"
        setItems((prevItems) => [...prevItems, movedItem!]);
      } else {
        // Добавить в корзину
        setBaskets((prevBaskets) => ({
          ...prevBaskets,
          [toBasket]: [...prevBaskets[toBasket], movedItem!],
        }));
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4">
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

const DroppableArea = ({ id, items }: DroppableAreaProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="p-4 border border-gray-400 w-48">
      <h3 className="text-lg font-bold mb-2">
        {id === "items" ? "Предметы" : `Корзина ${id.slice(-1)}`}
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <DraggableItem key={item.id} id={item.id} name={item.name} basket={id} />
        ))}
      </div>
    </div>
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

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-2 bg-blue-200 rounded-md shadow cursor-pointer"
    >
      {name}
    </div>
  );
};

export default DragDropGame;
