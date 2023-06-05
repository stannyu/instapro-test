import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card as CardType } from "../../types";

import "./card.scss";

interface CardProps {
  card: CardType;
  moveCard: (cardId: string, newColumnId: string) => void;
  columnId: string;
  clickHandler: () => void;
}

const Card: React.FC<CardProps> = ({ card, moveCard, columnId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${card.id}`);
  };

  const [dragging, setDragging] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("oldColumnId", columnId);
    setDragging(true);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData();
    setDragging(false);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (dragging) {
      return;
    }
    setDragOver(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const cardId = e.dataTransfer.getData("cardId");
    moveCard(cardId, columnId);
    setDragOver(false);
  };

  return (
    <div
      className={`card ${dragOver ? "dragover" : ""}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <h3>{card.title}</h3>
      <p>{card.content}</p>
      <p>{card.id}</p>
    </div>
  );
};

export default Card;
