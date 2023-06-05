import React, { useEffect, useRef, useState } from "react";
import { Column as ColumnType } from "../../types";

interface ColumnTitleProps {
  column: ColumnType;
  updateColumnLabel: (columnId: string, label: string) => void;
}

const ColumnTitle: React.FC<ColumnTitleProps> = ({
  column,
  updateColumnLabel,
}) => {
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [editableTitle, setEditableTitle] = useState(column.label);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(e.target.value);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateColumnLabel(column.id, editableTitle);
      setIsEditingTitle(false);
    } else if (e.key === "Escape") {
      setEditableTitle(column.label);
      setIsEditingTitle(false);
    }
  };

  const handleTitleBlur = () => {
    setEditableTitle(column.label);
    setIsEditingTitle(false);
  };

  /**
   * INPLACE TITLE EDITING:
   *          ~~~
   * Press Enter  -> update column label
   * Press Escape -> reset editableTitle to column.label
   *
   * didn't add controls due to time constraints
   */
  return (
    <div className="column-title-container">
      {isEditingTitle ? (
        <input
          ref={titleInputRef}
          type="text"
          value={editableTitle}
          onChange={handleTitleChange}
          onKeyDown={handleTitleKeyDown}
          onBlur={handleTitleBlur}
          className="form-input column-title-input"
        />
      ) : (
        <h2 className="column-title" onClick={handleTitleClick}>
          {column.label}
        </h2>
      )}
    </div>
  );
};

export default ColumnTitle;
