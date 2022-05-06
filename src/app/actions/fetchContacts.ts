export const FETCH_CONTACTS = "FETCH_CONTACTS";

export const fetchContacts = (contacts: undefined) => ({
  type: FETCH_CONTACTS,
  contacts,
});
