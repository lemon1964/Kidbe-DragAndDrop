# Перетаскивание объектов Drag and Drop

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

 

git add .
git commit -m "initial"
git branch -M main
git push -u origin main

rm -rf .git 
git remote -v