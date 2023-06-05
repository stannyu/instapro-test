import { BoardState, Card } from "../types";
import { generateObjectID } from "./shared";

const removeCardFromBoardState = (
  prevState: BoardState,
  columnId: string,
  cardId: string
) => {
  const updatedColumns = prevState.columns.map((column) =>
    column.id === columnId
      ? { ...column, cardIds: column.cardIds.filter((id) => id !== cardId) }
      : column
  );

  const updatedCards = prevState.cards.filter((card) => card.id !== cardId);

  return {
    ...prevState,
    columns: updatedColumns,
    cards: updatedCards,
  };
};

function moveCardToColumnState(
  cardId: string,
  targetColumnId: string,
  prevState: BoardState
) {
  const sourceColumn = prevState.columns.find((column) =>
    column.cardIds.includes(cardId)
  );

  if (!sourceColumn) {
    console.error(`Card ${cardId} does not exist`);
    return prevState;
  }

  const targetColumn = prevState.columns.find(
    (column) => column.id === targetColumnId
  );

  if (!targetColumn) {
    console.error(`Target column ${targetColumnId} does not exist`);
    return prevState;
  }

  if (sourceColumn.id === targetColumn.id) {
    return prevState;
  }

  const sourceColumnUpdated = {
    ...sourceColumn,
    cardIds: sourceColumn.cardIds.filter((id) => id !== cardId),
  };

  const targetColumnUpdated = {
    ...targetColumn,
    cardIds: [...targetColumn.cardIds, cardId],
  };

  const updatedColumns = prevState.columns.map((column) => {
    switch (column.id) {
      case sourceColumn.id:
        return sourceColumnUpdated;
      case targetColumn.id:
        return targetColumnUpdated;
      default:
        return column;
    }
  });

  return {
    ...prevState,
    columns: updatedColumns,
  };
}

const updateColumnLabelState = (
  prevState: BoardState,
  columnId: string,
  newLabel: string
) => {
  const updatedColumns = prevState.columns.map((column) =>
    column.id === columnId ? { ...column, label: newLabel } : column
  );

  return {
    ...prevState,
    columns: updatedColumns,
  };
};

const removeCardState = (prevState: BoardState, cardId: string) => {
  const column = prevState.columns.find((column) =>
    column.cardIds.includes(cardId)
  );

  if (!column) {
    return prevState;
  }

  const updatedColumn = {
    ...column,
    cardIds: column.cardIds.filter((id) => id !== cardId),
  };

  const updatedColumns = prevState.columns.map((col) =>
    col.id === updatedColumn.id ? updatedColumn : col
  );

  const updatedCards = prevState.cards.filter((card) => card.id !== cardId);

  return {
    columns: updatedColumns,
    cards: updatedCards,
  };
};

const addCardToColumnState = (
  prevState: BoardState,
  columnId: string,
  card: Card
) => {
  const updatedColumns = prevState.columns.map((column) =>
    column.id === columnId
      ? { ...column, cardIds: [...column.cardIds, card.id] }
      : column
  );

  return {
    ...prevState,
    columns: updatedColumns,
    cards: [...prevState.cards, card],
  };
};

const addColumnState = (label: string, prevState: BoardState) => {
  const id = generateObjectID();

  return {
    ...prevState,
    columns: [...prevState.columns, { id, label, cardIds: [] }],
  };
};

export {
  removeCardFromBoardState,
  moveCardToColumnState,
  updateColumnLabelState,
  addCardToColumnState,
  addColumnState,
  removeCardState,
};
