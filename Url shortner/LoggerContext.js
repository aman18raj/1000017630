import React, { createContext, useState } from "react";

export const LoggerContext = createContext();

export const LoggerProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const log = (message) => {
    const entry = { timestamp: new Date().toISOString(), message };
    setLogs((prev) => [...prev, entry]);
  };

  return (
    <LoggerContext.Provider value={{ logs, log }}>
      {children}
    </LoggerContext.Provider>
  );
};
