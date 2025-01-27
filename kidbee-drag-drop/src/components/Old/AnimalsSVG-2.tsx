import React from "react";
import DraggableAnimal from "./DraggableAnimal";

const AnimalsSVG = ({ data }: { data: any }) => {
  const taskData = data.taskData; // Распаковываем taskData

  // Проверяем, что данные корректно переданы
  if (!taskData || !taskData.apartments || !taskData.animals) {
    console.error("Invalid data:", taskData);
    return null; // Не рендерим, если данных нет
  }

  const fieldWidth = 800;
  const fieldHeight = 600;

  const apartmentsHeight = fieldHeight / 2;
  const animalsHeight = fieldHeight / 2;

  const apartmentWidth = fieldWidth / taskData.apartments.length; // Используем taskData
  const apartmentHeight = apartmentsHeight * 0.8;

  const columns = 5; // Количество колонок для животных
  const rows = Math.ceil(taskData.animals.length / columns);
  const cellWidth = fieldWidth / columns;
  const cellHeight = animalsHeight / rows;

  return (
    <svg
      width={fieldWidth}
      height={fieldHeight}
      className="border border-gray-300"
    >
      {/* Apartments */}
      <g>
        {taskData.apartments.map((apartment: any, index: number) => (
          <image
            key={apartment.id}
            href={apartment.image}
            x={index * apartmentWidth}
            y={0}
            width={apartmentWidth}
            height={apartmentHeight}
          />
        ))}
      </g>

      {/* Animals */}
      <g>
        {taskData.animals.map((animal: any, index: number) => {
          const col = index % columns;
          const row = Math.floor(index / columns);

          const x = col * cellWidth + (cellWidth - animal.scale * 50) / 2; // Центрирование в ячейке
          const y =
            apartmentsHeight +
            row * cellHeight +
            (cellHeight - animal.scale * 50) / 2; // Центрирование в ячейке

          return (
            <DraggableAnimal
              key={animal.id}
              animal={animal}
              index={index}
              ariaDescribedby={`animal-${animal.id}`}
              style={{
                transform: `scale(${animal.scale})`,
              }}
              x={x}
              y={y}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default AnimalsSVG;
