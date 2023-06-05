import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Column as ColumnType, Card as CardType } from "../../types";

import CardAddModal from "../Modals/CardAddModal";
import Card from "../Card/Card";
import Button from "../Button";
import ColumnTitle from "./ColumnTitle";

import "./column.scss";

/**
 * Have to clarify something here:
 *
 * In real case scenario I would put both modals: card details and add card inside Board component
 * but since I am not using state management here it would create tightly coupled binding
 * which is not ideal and take time to implement. So I put CardAddModal here.
 */

interface ColumnProps {
  column: ColumnType;
  cards: CardType[];
  addCardToColumn: (columnId: string, card: CardType) => void;
  moveCardToColumn: (cardId: string, targetColumnId: string) => void;
  updateColumnLabel: (columnId: string, label: string) => void;
  removeCardFromColumn: (cardId: string, columnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  cards,
  addCardToColumn,
  moveCardToColumn,
  updateColumnLabel,
}) => {
  const navigate = useNavigate();

  const [addingCard, setAddingCard] = useState(false);

  const handleAddCardClick = () => {
    setAddingCard(true);
  };

  const addCard = (card: CardType): void => {
    addCardToColumn(column.id, card);
    setAddingCard(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    moveCardToColumn(cardId, column.id);
  };

  const handleCardDetailsClick = (card: CardType) => {
    navigate(`/${card.id}`);
  };

  return (
    <div className="column" onDragOver={handleDragOver} onDrop={handleDrop}>
      <ColumnTitle column={column} updateColumnLabel={updateColumnLabel} />
      <div className="cards-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            moveCard={moveCardToColumn}
            columnId={column.id}
            clickHandler={() => handleCardDetailsClick(card)}
          />
        ))}
      </div>

      {addingCard && (
        <CardAddModal
          addCard={(card) => addCard(card)}
          close={() => setAddingCard(false)}
        />
      )}
      <Button outline label="Add Card" onClick={handleAddCardClick} />
    </div>
  );
};

export default Column;
