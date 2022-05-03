import { doc, DocumentData, setDoc } from "firebase/firestore/lite";
import { FC, useEffect, useState } from "react";
import { db } from "../Pages/Contacts";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  contact: DocumentData;
  fetchData: () => void;
  setId: string;
  deleteContact: () => void;
}

export const ModalChange: FC<ModalProps> = ({
  visible = false,
  onClose,
  contact,
  fetchData,
  setId,
  deleteContact,
}) => {
  const [changeFirstName, setChangeFirstName] = useState("");
  const [changeLastName, setChangeLastName] = useState("");
  const [changeEmail, setChangeEmail] = useState("");
  const [changePhone, setChangePhone] = useState("");
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case "Escape":
        onClose();
        setChangeFirstName("");
        setChangeLastName("");
        setChangeEmail("");
        setChangePhone("");
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  async function changeContact() {
    if (
      changeFirstName === "" ||
      changeLastName === "" ||
      changeEmail === "" ||
      changePhone === ""
    ) {
      onClose();
      return;
    }
    await setDoc(doc(db, "contacts", `${setId}`), {
      firstName: changeFirstName,
      lastName: changeLastName,
      email: changeEmail,
      phone: changePhone,
      id: setId,
    });
    deleteContact();
    fetchData();
  }

  if (!visible) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="row">
          <h4 className="center-align">Change contact</h4>
          <div className="input-field col s6">
            <input
              id="ChangeFirst_name"
              type="text"
              className="validate"
              onChange={(e) => setChangeFirstName(e.target.value)}
            />
            <label htmlFor="ChangeFirst_name" style={{ transform: "" }}>
              First Name
            </label>
          </div>
          <div className="input-field col s6">
            <input
              id="ChangeLast_name"
              type="text"
              className="validate"
              value={changeLastName}
              onChange={(e) => setChangeLastName(e.target.value)}
            />
            <label htmlFor="ChangeLast_name">Last Name</label>
          </div>
          <div className="input-field col s6">
            <input
              id="ChangeEmail"
              type="email"
              className="validate"
              value={changeEmail}
              onChange={(e) => setChangeEmail(e.target.value)}
            />
            <label htmlFor="ChangeEmail">Email</label>
          </div>
          <div className="input-field col s6">
            <input
              id="ChangePhone"
              type="text"
              className="validate"
              value={changePhone}
              onChange={(e) => setChangePhone(e.target.value)}
            />
            <label htmlFor="ChangePhone">Phone</label>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="waves-effect waves-green btn-small"
            onClick={onClose}
          >
            Cancel
          </button>
          &nbsp;
          <button
            className="waves-effect waves-green btn-small"
            onClick={changeContact}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};
