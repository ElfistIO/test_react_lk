import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { ContactsPage } from "./Pages/Contacts";
import { NotFound } from "./Pages/NotFound";
import "materialize-css/dist/css/materialize.min.css";

const App = () => {
  const [auth, setAuth] = useState({});

  if (Object.keys(auth).length == 0) {
    return <Login setAuth={setAuth} />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
