import { FC, useState } from "react";
import { deleteDoc, doc, DocumentData, getDoc } from "firebase/firestore/lite";
import { db } from "../Pages/Contacts";
import { ModalChange } from "./ModalChange";
import { ModalDelete } from "./ModalDelete";

interface ContactProps {
  contact: DocumentData;
  fetchData: () => void;
  setId: string;
}

export const Contact: FC<ContactProps> = ({ contact, fetchData, setId }) => {
  const [isModalChange, setIsModalChange] = useState(false);
  const onCloseChange = () => setIsModalChange(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const onCloseDelete = () => setIsModalDelete(false);

  async function deleteContact() {
    const contactRef = doc(db, "contacts", `${contact.id}`);
    const contactSnap = await getDoc(contactRef);
    await deleteDoc(doc(db, "contacts", `${contactSnap.id}`));
    fetchData();
  }

  return (
    <li className="collection-item">
      <div className="row">
        <div className="col s8">
          <p className="title bold">{contact.firstName}</p>
          <p className="title bold">{contact.lastName}</p>
          <p>{contact.email}</p>
          <p>{contact.phone}</p>
        </div>
        <div className="col s2">
          <button
            className="btn-small modal-trigger waves-effect waves-light"
            onClick={() => setIsModalChange(true)}
          >
            <i className="material-icons">edit</i>
          </button>
          <ModalChange
            visible={isModalChange}
            onClose={onCloseChange}
            contact={contact}
            fetchData={fetchData}
            setId={setId}
            deleteContact={deleteContact}
          />
        </div>
        <div className="col s2">
          <button
            className="btn-small modal-trigger waves-effect waves-light right"
            name="action"
            onClick={() => setIsModalDelete(true)}
          >
            <i className="material-icons">delete</i>
          </button>
          <ModalDelete
            visible={isModalDelete}
            onClose={onCloseDelete}
            deleteContact={deleteContact}
          />
        </div>
      </div>
    </li>
  );
};
