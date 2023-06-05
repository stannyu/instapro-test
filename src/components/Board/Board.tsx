import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoardState, Card } from "../../types";

import CardDetailsModal from "../Modals/CardDetailsModal";
import Column from "../Column/Column";
import Button from "../Button";

import {
  addCardToColumnState,
  addColumnState,
  moveCardToColumnState,
  removeCardFromBoardState,
  removeCardState,
  updateColumnLabelState,
} from "../../utils/state";

import "./board.scss";

// You can use empty arrays as initial state
// const initialBoardState: BoardState = {
//   columns: [],
//   cards: [],
// };

const initialBoardState: BoardState = {
  columns: [
    {
      id: "column-1",
      label: "To Do",
      cardIds: ["card-1"],
    },
    {
      id: "column-2",
      label: "In Progress",
      cardIds: ["card-2"],
    },
    {
      id: "column-3",
      label: "Done",
      cardIds: ["card-3"],
    },
  ],
  cards: [
    {
      id: "card-1",
      title: "Card 1",
      content: "This is card 1",
    },
    {
      id: "card-2",
      title: "Card 2",
      content: "This is card 2",
    },
    {
      id: "card-3",
      title: "Card 3",
      content: "This is card 3",
    },
  ],
};

const Board: React.FC = () => {
  const savedBoardState = localStorage.getItem("boardState");
  const parsedBoardState = savedBoardState
    ? JSON.parse(savedBoardState)
    : initialBoardState;

  const [boardState, setBoardState] = useState<BoardState>(parsedBoardState);
  const { cardId } = useParams();
  const navigate = useNavigate();

  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [isCardDetailsModalOpen, setCardDetailsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("boardState", JSON.stringify(boardState));
  }, [boardState]);

  useEffect(() => {
    if (cardId) {
      const matchedCard = boardState.cards.find((card) => card.id === cardId);
      if (matchedCard) {
        setActiveCard(matchedCard);
        setCardDetailsModalOpen(true);
      }
    } else {
      setCardDetailsModalOpen(false);
      setActiveCard(null);
    }
  }, [boardState, cardId]);

  const addColumn = (label: string) => {
    setBoardState((prevState) => addColumnState(label, prevState));
  };

  const addCardToColumn = (columnId: string, card: Card): void => {
    setBoardState((prevState) =>
      addCardToColumnState(prevState, columnId, card)
    );
  };

  const removeCardFromColumn = (cardId: string, columnId: string): void => {
    setBoardState((prevState) =>
      removeCardFromBoardState(prevState, columnId, cardId)
    );
  };

  const moveCardToColumn = (cardId: string, targetColumnId: string): void => {
    setBoardState((prevState) =>
      moveCardToColumnState(cardId, targetColumnId, prevState)
    );
  };

  const updateColumnLabel = (columnId: string, newLabel: string): void => {
    setBoardState((prevState) =>
      updateColumnLabelState(prevState, columnId, newLabel)
    );
  };

  const removeCard = (cardId: string): void => {
    setBoardState((prevState) => removeCardState(prevState, cardId));
  };

  const columnTemplates = boardState.columns.map((column) => {
    const cards = boardState.cards.filter((card) =>
      column.cardIds.includes(card.id)
    );
    return (
      <Column
        key={column.id}
        column={column}
        cards={cards}
        addCardToColumn={addCardToColumn}
        moveCardToColumn={moveCardToColumn}
        updateColumnLabel={updateColumnLabel}
        removeCardFromColumn={removeCardFromColumn}
      />
    );
  });

  return (
    <div className="board">
      {columnTemplates}
      <Button
        label="Add Column"
        outline
        onClick={() => addColumn("Click to rename!")}
      />
      {isCardDetailsModalOpen && activeCard && (
        <CardDetailsModal
          card={activeCard}
          closeModal={() => navigate("/")}
          removeCard={() => removeCard(activeCard.id)}
        />
      )}
    </div>
  );
};

export default Board;
