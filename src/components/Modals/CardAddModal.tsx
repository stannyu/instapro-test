import React, { useState } from "react";
import { Card as CardType } from "../../types";

import Modal from "./Modal";

interface CardAddModalProps {
  addCard: (card: CardType) => void;
  close: () => void;
}

const CardAddModal: React.FC<CardAddModalProps> = ({ addCard, close }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState({ title: false, content: false });

  const handleSubmit = () => {
    let hasError = false;
    if (!title) {
      setError((prevError) => ({ ...prevError, title: true }));
      hasError = true;
    }
    if (!content) {
      setError((prevError) => ({ ...prevError, content: true }));
      hasError = true;
    }
    if (!hasError) {
      const id = Math.random().toString(36).substring(2, 9);
      addCard({ id, title, content });
    }
  };

  const bodyContent = (
    <div className="add-card-body">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`${error.title ? "validation-error" : ""} form-input`}
      />
      <textarea
        placeholder="Description"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={`${error.title ? "validation-error" : ""} form-textarea`}
      />
    </div>
  );

  return (
    <Modal
      title="Add new Card"
      actionLabel="Create"
      onClose={close}
      onSubmit={handleSubmit}
      body={bodyContent}
      secondaryAction={close}
      secondaryActionLabel="Cancel"
    />
  );
};

export default CardAddModal;
