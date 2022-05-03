import React, { FC, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAfG_njHT5QemRDV3yyfwOvW347U-WC3EE",
  authDomain: "react-test-contacts.firebaseapp.com",
  projectId: "react-test-contacts",
  storageBucket: "react-test-contacts.appspot.com",
  messagingSenderId: "372240706148",
  appId: "1:372240706148:web:201d918f3ed3909367cd71",
};
export const app = initializeApp(firebaseConfig);

interface LoginProps {
  setAuth: React.Dispatch<React.SetStateAction<{}>>;
}

export const Login: FC<LoginProps> = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [catchError, setCatcherError] = useState<Boolean>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setAuth(user);
      })
      .catch((error) => {
        setCatcherError(true);
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  };

  return (
    <div className="container">
      <div className="row mt-200">
        <form className="col s12" onSubmit={handleSubmit}>
          <div className="input-field col s4 offset-s4">
            <input
              id="email"
              type="email"
              className="validate"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">E-mail</label>
          </div>
          <div className="input-field col s4 offset-s4">
            <input
              id="password"
              type="password"
              className="validate"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            {catchError === true && (
              <div style={{ color: "red" }}>Wrong email or password</div>
            )}
          </div>
          <div className="col s4 offset-s4 center-align mt-15">
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
