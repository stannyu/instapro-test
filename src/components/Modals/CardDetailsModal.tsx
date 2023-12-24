import React from "react";
import { useNavigate } from "react-router-dom";

import { Card as CardType } from "../../types";

import Button from "../Button";
import Modal from "./Modal";

interface CardDetailsModalProps {
  card: CardType;
  removeCard: (cardId: string) => void;
  closeModal: () => void;
}

const CardDetailsModal: React.FC<CardDetailsModalProps> = ({
  card,
  removeCard,
  closeModal,
}) => {
  const navigate = useNavigate();

  const handleRemoveClick = () => {
    removeCard(card.id);
    navigate("/");
  };

  const bodyContent = (
    <div className="card-details">
      <div className="card-content">
        <h2 onClick={() => console.log("aaa")}>{card.title}</h2>
        <p>{card.content}</p>
      </div>
      <div className="card-sidebar">
        <h3>Sidebar</h3>
        <Button danger label="Delete Card" onClick={handleRemoveClick} />
      </div>
    </div>
  );

  return (
    <Modal
      title="Card Details"
      body={bodyContent}
      footer={false}
      actionLabel="Delete"
      onClose={closeModal}
      size="L"
    />
  );
};

export default CardDetailsModal;
