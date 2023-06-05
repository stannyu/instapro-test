import React, { FunctionComponent, useCallback } from "react";

import Button from "../Button";

import "./modal.scss";

type ModalSize = "M" | "L";

interface ModalProps {
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: boolean;
  actionLabel: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  size?: ModalSize;
}

const Modal: FunctionComponent<ModalProps> = ({
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  size = "M",
  footer = true,
}) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    /**
     * one way is to call method directly from themplate
     * another is to handle errors/disabled/etc. states in useCallback
     */
    onSubmit && onSubmit();
  }, [onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    secondaryAction && secondaryAction();
  }, [secondaryAction]);

  return (
    <>
      <div className={`modal-wrapper ${size === "M" ? "modal-m" : "modal-l"}`}>
        <div className="modal-title">
          <h2 className="title-text">{title}</h2>
          <p className="close-icon" onClick={handleClose}>
            ✕
          </p>
        </div>
        <div>{body}</div>
        {footer && (
          <div className="modal-footer">
            <Button primary label={actionLabel} onClick={handleSubmit} />
            {secondaryAction && secondaryActionLabel && (
              <Button
                outline
                label={secondaryActionLabel}
                onClick={handleSecondaryAction}
              />
            )}
          </div>
        )}
      </div>

      <div className="overlay" onClick={handleClose}></div>
    </>
  );
};

export default Modal;
