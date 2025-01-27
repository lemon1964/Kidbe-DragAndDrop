# Перетаскивание объектов Drag and Drop

- Добавляем механику перетаскивания объектов / продолжи ряд drag
    - На экраны есть элементы, которые можно перетягивать
    - Есть верные элементы для перетягивания, есть неверные
    - Когда перетягиваем не туда, получаем реакцию что что-то неверно
        - Проигрывается звук
        - Предмет возвращяется на исходное место
    - Предметы для перетягивания, а также места для перетягивания могут располагаться в разных частях экрана
    - Система работает как на широком экране (desktop) так и на вертикальном экране (mobile)

Далее показаны 3 примера:
### 1. Продолжи ряд.
- Вверху - последовательность 1 2 пустой квадрат.
- Ниже - разбросанные по полю цифры, среди которых есть 3.
- Надо 3 перетянуть в пустой квадрат.

### 2. Соедини пары.
- Вверху - последовательность контейнеров из 2 объектов - фрукта и пустого квадрата.
- Ниже - последовательность разных фруктов.
- Надо каждый нижний фрукт положить в свой пустой квадрат.

### 2. Рассели животных с условием Попугай в КРАСНОЙ квартире.
- Слева - последовательность цветных квартир, красная и желтая.
- Справа - желтый попугай и синяя собака.
- По цвету хочется попугая поместить в желтую квартиру, но по условию помещаем в красную.
- Синюю собаку по остаточному принципу селим в красную квартиру.
------------------------------------
```sh
npx create-next-app@latest kidbee-movi-test --typescript --experimental-app
  ```
```sh
cd kidbee-movi-test
  ```

```sh
npm install @reduxjs/toolkit react-redux tailwindcss postcss autoprefixer @dnd-kit/core axios
  ```


- Обновляем зависимости как в основном Кидби.
```sh
 "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "^14.2.12"
  }
  ```

```sh
npx tailwindcss init -p
  ```

- tailwind.config.js
- next.config.mjs

- Создаем Redux хранилище
- /src/store/store.ts
- /src/reducers/notificationReducer.js
- Использовал пока редюсер из другого своего проекта

- mock-данные
- kidbee-movi-test/src/data/mockItems.json

- компонент с drag-and-drop файл DragDropGame.tsx
- /src/components/DragDropGame.tsx + 2 файла для разделения К и С компонент.

- Устанавливаем анимацию
```sh
npm i framer-motion
  ```


------------------------------------------

### команды

```sh
cd kidbee-drag-drop
  ```
```sh
npm run dev
  ```

==========================
import { useId } from "react";
  const safeId = useId();
        aria-describedby={`DndDescribedBy-${safeId}`}


AnimalsSVG-2.json
AnimalsSVG-2.tsx
DraggableAnimal.tsx
DragDrop.tsx
Fruits.json

git add .
git commit -m "animals and fruits"
git branch -M main
git push -u origin main

rm -rf .git 
git remote -v



