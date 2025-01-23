"use client";

import { Provider } from 'react-redux';
import store from '../store/store';
import DragDropGame from './DragDropGame';

const ClientDragDropGame = () => {
  return (
    <Provider store={store}>
      <DragDropGame />
    </Provider>
  );
};

export default ClientDragDropGame;
