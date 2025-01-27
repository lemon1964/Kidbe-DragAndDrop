"use client";

import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { useId } from "react";

type Animal = {
  id: string;
  name: string;
  color: string;
  image: string;
};

type Apartment = {
  id: string;
  color: string;
  image: string;
};

type Condition = {
  description: string;
  condition: string;
};

type DragDropAnimalsProps = {
  apartments: Apartment[];
  animals: Animal[];
  conditions: Condition[];
};

const DragDropAnimals = ({
  apartments: initialApartments,
  animals: initialAnimals,
}: DragDropAnimalsProps) => {
  const [apartments, setApartments] = useState(
    initialApartments.map(apartment => ({
      ...apartment,
      animals: [] as Animal[],
    }))
  );
  const safeId = useId();
  const [unassignedAnimals, setUnassignedAnimals] = useState(initialAnimals);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const draggedAnimal = unassignedAnimals.find(animal => animal.id === active.id);
    const targetApartment = apartments.find(apartment => apartment.id === over.id);

    if (draggedAnimal && targetApartment) {
      // Проверка на соответствие цвета
      if (draggedAnimal.color !== targetApartment.id) {
        return;
      }

      setUnassignedAnimals(prev => prev.filter(animal => animal.id !== active.id));
      setApartments(prev =>
        prev.map(apartment =>
          apartment.id === over.id
            ? { ...apartment, animals: [...apartment.animals, draggedAnimal] }
            : apartment
        )
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4">
        <DroppableArea id="animals" color="white" name="Животные" animals={unassignedAnimals} />
        {apartments.map(apartment => (
          <DroppableArea
            key={apartment.id}
            id={apartment.id}
            color={apartment.id}
            name={`Дом`}
            image={apartment.image}
            animals={apartment.animals}
            aria-describedby={`DndDescribedBy-${safeId}`}
          />
        ))}
      </div>
    </DndContext>
  );
};

type DroppableAreaProps = {
  id: string;
  color: string;
  name: string;
  image?: string;
  animals: Animal[];
};

const DroppableArea = ({ id, color, name, image, animals }: DroppableAreaProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        backgroundColor: image ? "transparent" : color,
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "2px solid black",
        padding: "16px",
        borderRadius: "8px",
        width: "200px",
        minHeight: "150px",
      }}
      className="droppable-area"
    >
      <h3 style={{ textAlign: "center", marginBottom: "8px" }}>{name}</h3>
      <div className="space-y-2">
        {animals.map(animal => (
          <DraggableAnimal key={animal.id} id={animal.id} name={animal.name} image={animal.image} />
        ))}
      </div>
    </div>
  );
};

type DraggableAnimalProps = {
  id: string;
  name: string;
  image: string;
};

const DraggableAnimal = ({ id, name, image }: DraggableAnimalProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    zIndex: transform ? 9999 : undefined,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <img src={image} alt={name} style={{ width: "100%", height: "auto", borderRadius: "4px" }} />
    </div>
  );
};

export default DragDropAnimals;
