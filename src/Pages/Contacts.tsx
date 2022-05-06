import { useEffect, useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore/lite";
import { collection, getDocs } from "firebase/firestore/lite";
import { nanoid } from "nanoid";
import { Contact } from "../Components/Contact";
import { app } from "./Login";
// import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { fetchContacts } from "../app/actions/fetchContacts";

export const db = getFirestore(app);

interface DocumentData {
  [field: string]: string;
}

export const ContactsPage = () => {
  // const dispatch = useAppDispatch();
  // const contactsRedux = useAppSelector((state) => state.contacts);
  const [contacts, setContacts] = useState<DocumentData[]>([]);
  const [searchContacts, setSearchContacts] = useState(contacts);
  const [search, setSearch] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let setId = nanoid();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    const contactsCol = collection(db, "contacts");
    const contactsSnapshot = await getDocs(contactsCol);
    const contactsList = contactsSnapshot.docs.map((doc) => doc.data());
    setContacts(contactsList);
    setSearchContacts(contactsList);
    setIsLoading(false);
  }

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if ((firstName || lastName || email || phone) === "") {
      return;
    } else {
      await setDoc(doc(db, "contacts", `${setId}`), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        id: setId,
      });
      fetchData();
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
    }
  }

  const handleSearch = (e: { target: { value: any } }) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = contacts.filter((contact) => {
        return contact.lastName.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setSearchContacts(results);
    } else {
      setSearchContacts(contacts);
    }
    setSearch(keyword);
  };
  const handleSearchSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSearch("");
    setSearchContacts(contacts);
  };

  return (
    <div className="container">
      <nav>
        <div className="nav-wrapper teal lighten-1">
          <div className="brand-logo center">Contacts</div>
          <form onSubmit={(e) => handleSearchSubmit(e)}>
            <div className="input-field">
              <input
                id="search"
                type="search"
                value={search}
                onChange={handleSearch}
                placeholder="Search by last name..."
              />
              <label className="label-icon" htmlFor="search">
                <i className="material-icons">search</i>
              </label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
      <div className="container mt-50">
        <div className="row">
          <h4 className="center-align">Create new contact</h4>
          <form className="col s12 center-align" onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="first_name"
                  type="text"
                  className="validate"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="last_name"
                  type="text"
                  className="validate"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="phone"
                  type="text"
                  className="validate"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="phone">Phone</label>
              </div>
            </div>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Create
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
        {isLoading ? (
          <div className="progress cyan lighten-1">
            <div className="indeterminate"></div>
          </div>
        ) : searchContacts && searchContacts.length > 0 ? (
          <ul className="collection container">
            {searchContacts.map((contact) => (
              <Contact
                contact={contact}
                key={contact.id}
                fetchData={fetchData}
                setId={setId}
              />
            ))}
          </ul>
        ) : (
          <h4 className="center-align">Contact not found!</h4>
        )}
      </div>
    </div>
  );
};
