"use client";

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@/reducers/notificationReducer";
import { incrementGamesPlayed } from "@/reducers/gameStatsReducer";
import { AppDispatch } from "@/store/store";
import { RootState } from "@/store/store";
import Notification from "@/components/Notification";

const NotificationWrapper = () => {

  const dispatch = useDispatch<AppDispatch>();
  const gamesPlayed = useSelector((state: RootState) => state.gameStats.gamesPlayed);
  
  // Проверка, был ли уже инкремент
  const hasUpdated = useRef(false);

  useEffect(() => {
    // Инкрементируем только один раз при первом рендере
    if (!hasUpdated.current) {
      dispatch(incrementGamesPlayed());
      dispatch(showNotification(`Количество сыгранных игр: ${gamesPlayed}`, "info", 3)); // 5 секунд
      hasUpdated.current = true;
    }
  }, [dispatch, gamesPlayed]);

  return <Notification/> 
};

export default NotificationWrapper;
