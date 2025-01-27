// src/components/DragDropAnimalsWithGraphics.tsx
import React, { useCallback, useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TaskData, Animal, Apartment } from "../../types/drag-drop";

interface DragDropAnimalsWithGraphicsProps {
  taskData: TaskData;
}

const rainbowColors = ["#FF0000", "#FFFF00", "#00FF00", "#0000FF", "#FFA500", "#00FFFF", "#800080"]; // Красный, Желтый, Зеленый, Синий, Оранжевый, Голубой, Фиолетовый

const DragDropAnimalsWithGraphics: React.FC<DragDropAnimalsWithGraphicsProps> = ({ taskData }) => {
  const [apartments, setApartments] = useState<Apartment[]>(
    taskData.apartments.map(apartment => ({
      ...apartment,
      animals: [],
    }))
  );

  const [unassignedAnimals, setUnassignedAnimals] = useState<Animal[]>(taskData.animals);

  const moveAnimalToApartment = (animalId: number, apartmentId: number) => {
    const draggedAnimal = unassignedAnimals.find(animal => animal.id === animalId);
    const targetApartment = apartments.find(apartment => apartment.id === apartmentId);

    if (draggedAnimal && targetApartment) {
      // Проверка на соответствие цвета животного и цвета дома
      if (draggedAnimal.color !== targetApartment.color) {
        return;
      }

      setUnassignedAnimals(prevAnimals => prevAnimals.filter(animal => animal.id !== animalId));
      setApartments(prevApartments =>
        prevApartments.map(apartment =>
          apartment.id === apartmentId
            ? { ...apartment, animals: [...apartment.animals, draggedAnimal] }
            : apartment
        )
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: `url(${taskData.backgroundImage})` }}
    >
      <div className="bg-opacity-50 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-[0_0_8px_rgba(0,0,255,0.8)]">
          {taskData.task}
        </h1>
        <div className="flex gap-8 justify-center mb-12">
          {apartments.map((apartment, index) => (
            <Apartment
              key={apartment.id}
              id={apartment.id}
              color={apartment.color}
              animals={apartment.animals}
              moveAnimalToApartment={moveAnimalToApartment}
              image={apartment.image}
              name={apartment.name}
              index={index}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          <AnimalList animals={unassignedAnimals} />
        </div>
      </div>
    </div>
  );
};

const Apartment: React.FC<{
  id: number;
  color: string;
  animals: Animal[];
  moveAnimalToApartment: (animalId: number, apartmentId: number) => void;
  image: string;
  name: string;
  index: number;
}> = ({ id, color, animals, moveAnimalToApartment, image, name, index }) => {
  const [{ isOver }, drop] = useDrop<{ id: number }, void, { isOver: boolean }>({
    accept: "ANIMAL",
    drop: (item: { id: number }) => {
      moveAnimalToApartment(item.id, id);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  const dropRef = useCallback(
    (node: HTMLDivElement | null) => {
      drop(node);
    },
    [drop]
  );

    // Назначение цвета радуги по индексу
  const backgroundColor = rainbowColors[index % rainbowColors.length];

  return (
    <div
      ref={dropRef}
      className={`relative flex flex-col items-center p-4 rounded-lg shadow-md transition-all duration-300 ${
        isOver ? "bg-opacity-80" : ""
      }`}
      style={{ backgroundColor }}
    >
      <h2
        className={`text-xl font-bold text-white mb-4 p-2 rounded-lg bg-opacity-90`}
        style={{ backgroundColor: "#00000090" }}
      >
        {name}
      </h2>
      <img
        src={image}
        alt={`Дом ${color}`}
        className="w-full h-40 object-cover rounded-md border-2 border-white"
      />
      <div className="absolute bottom-4 left-4 flex gap-2">
        {animals.map(animal => (
          <img
            key={animal.id}
            src={animal.image}
            alt={animal.name}
            width="30"
            height="30"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
        ))}
      </div>
    </div>
  );
};

const AnimalComponent: React.FC<{ animal: Animal }> = ({ animal }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ANIMAL",
    item: { id: animal.id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [randomOffset, setRandomOffset] = useState<number>(0);

  useEffect(() => {
    setRandomOffset(Math.random() * 50);
  }, []);

  return (
    <div
      ref={(node: HTMLDivElement | null) => {
        if (node) {
          drag(node);
        }
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        margin: "10px",
        transform: `translateY(${randomOffset}px)`,
      }}
      className="transition-all duration-300 ease-in-out p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105"
    >
      <img
        src={animal.image}
        alt={animal.name}
        className="w-20 h-20 object-cover rounded-full mx-auto"
      />
      <p className="text-center text-lg font-bold mt-2">{animal.name}</p>
    </div>
  );
};

const AnimalList: React.FC<{ animals: Animal[] }> = ({ animals }) => {
  return (
    <div className="flex flex-wrap justify-start gap-6 p-6">
      {animals.map(animal => (
        <AnimalComponent key={animal.id} animal={animal} />
      ))}
    </div>
  );
};

export default DragDropAnimalsWithGraphics;







