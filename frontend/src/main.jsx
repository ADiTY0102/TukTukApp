import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { UserDataContext } from "./context/userContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx";
function Root() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <CaptainContext>
        <UserDataContext.Provider value={{ user, setUser }}>
          <App />
        </UserDataContext.Provider>
      </CaptainContext>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
