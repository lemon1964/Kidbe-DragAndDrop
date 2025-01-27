"use client";

import React, { useState, useEffect, useRef } from "react";
import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { useId } from "react";

// Типы для Field
type Field = {
  width: number;
  height: number;
  x: number;
  y: number;
  scale: number;
};

// Типы для ApartmentItem
type ApartmentItem = {
  id: string;
  color: string;
  image: string;
  width: number;
  height: number;
};

// Типы для Apartments
type Apartments = {
  container: {
    x: number;
    y: number;
    scale: number;
    width: number;
    height: number;
  };
  items: ApartmentItem[];
};

// Типы для AnimalItem
type AnimalItem = {
  id: string;
  name: string;
  color: string;
  image: string;
  width: number;
  height: number;
};

// Типы для Animals
type Animals = {
  scale: number;
  placement: string;
  // placement: "random" | "grid";
  items: AnimalItem[];
};

// Общий тип данных для AnimalsSVG
type AnimalsSVGData = {
  field: Field;
  apartments: Apartments;
  animals: Animals;
};

// Пропсы для AnimalsSVG
type AnimalsSVGProps = {
  data: AnimalsSVGData;
};

const DraggableAnimal = ({
    animal,
    index,
    ariaDescribedby,
  }: {
    animal: any;
    index: number;
    ariaDescribedby: string;
  }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: animal.id,
    });
  
    const ref = useRef<SVGGElement>(null);
  
    useEffect(() => {
      if (ref.current) {
        setNodeRef(ref.current as unknown as HTMLElement); // Преобразование SVGGElement в HTMLElement
      }
    }, [ref, setNodeRef]);
  
    const style = {
      transform: transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : undefined,
      cursor: "grab",
    };
  
    return (
      <g
        ref={ref}
        style={style}
        {...listeners}
        {...attributes}
        aria-describedby={ariaDescribedby} // Используем ariaDescribedby
      >
        <image
          href={animal.image}
          x={index * 50} // Примерная позиция, заменить по необходимости
          y={0}
          width={animal.width}
          height={animal.height}
        />
      </g>
    );
  };

const AnimalsSVG: React.FC<AnimalsSVGProps> = ({ data }) => {
  const { field, apartments, animals } = data;
  const [animalPositions, setAnimalPositions] = useState<{ x: number; y: number }[]>([]);
  const safeId = useId();

  // Генерация позиций для животных
  useEffect(() => {
    if (animals.placement === "random") {
      const positions = animals.items.map(() => ({
        x: Math.random() * (field.width - 50),
        y: Math.random() * (field.height - 50),
      }));
      setAnimalPositions(positions);
    }
  }, [animals.items, animals.placement, field.width, field.height]);


  return (
    <div
      className="relative"
      style={{
        width: `${field.width * field.scale}px`,
        height: `${field.height * field.scale}px`,
        left: `${field.x}px`,
        top: `${field.y}px`,
      }}
    >
      <DndContext
        onDragEnd={(event: DragEndEvent) => {
          console.log("Перетащили:", event);
          // Логика фиксации нового положения
        }}
      >
        <svg
          className="absolute"
          viewBox={`0 0 ${field.width} ${field.height}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Apartments */}
          <g
            transform={`translate(${apartments.container.x}, ${apartments.container.y}) scale(${apartments.container.scale})`}
          >
            {apartments.items.map((apartment, index) => (
              <image
                key={apartment.id}
                href={apartment.image}
                x={index * apartment.width * 1.1} // Увеличиваем расстояние между квартирами
                y={0}
                width={apartment.width}
                height={apartment.height}
              />
            ))}
          </g>

          {/* Animals */}
          {animals.items.map((animal, index) => (
            <DraggableAnimal
              key={animal.id}
              animal={animal}
              index={index}
              ariaDescribedby={`DndDescribedBy-${safeId}`}
              />
          ))}
        </svg>
      </DndContext>
    </div>
  );
};

export default AnimalsSVG;
