// import { DocumentData } from "firebase/firestore/lite";
// import { Reducer, Action } from "redux";
import { FETCH_CONTACTS } from "../actions/fetchContacts";

// interface ContactsState {
//   contacts: DocumentData[];
//   searchContacts: DocumentData[];
//   isLoading: boolean;
//   isError: boolean;
// }

const initialState = {
  contacts: [],
};

export const contactsReducer = (
  state = initialState,
  action: { type: any }
) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state };
    default:
      return state;
  }
};
