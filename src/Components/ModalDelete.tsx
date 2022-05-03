import { FC, useEffect } from "react";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  deleteContact: () => void;
}

export const ModalDelete: FC<ModalProps> = ({
  visible = false,
  onClose,
  deleteContact,
}) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  if (!visible) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="row center-align">Are you sure?</div>
        <div className="modal-footer">
          <button
            className="waves-effect waves-green btn-small"
            onClick={onClose}
          >
            No
          </button>
          &nbsp;
          <button
            className="waves-effect waves-green btn-small"
            onClick={deleteContact}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
