export interface Card {
  id: string;
  title: string;
  content: string;
}

export interface Column {
  id: string;
  label: string;
  cardIds: string[];
}

export type BoardState = {
  columns: Column[];
  cards: Card[];
};
