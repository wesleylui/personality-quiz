// UserContext.jsx
// will hold the context for the user's name

import React, { createContext, useState } from "react";

// the UserContext
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [name, setName] = useState("");

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
}
