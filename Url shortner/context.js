import React, { createContext, useState, useContext } from "react";
import { LoggerContext } from "./LoggerContext";

export const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);
  const { log } = useContext(LoggerContext);

  const generateShortcode = () => Math.random().toString(36).substring(2, 8);

  const shortenUrl = (originalUrl, validity, customCode) => {
    let code = customCode || generateShortcode();
    if (urls.find((u) => u.code === code)) {
      throw new Error("Shortcode already exists!");
    }

    const expiry = new Date(Date.now() + (validity || 30) * 60000);
    const newUrl = { originalUrl, code, expiry, clicks: [] };
    setUrls((prev) => [...prev, newUrl]);
    log(`URL shortened: ${originalUrl} -> ${code}`);
    return newUrl;
  };

  const registerClick = (code, source = "localhost", location = "IN") => {
    setUrls((prev) =>
      prev.map((u) =>
        u.code === code
          ? {
              ...u,
              clicks: [...u.clicks, { time: new Date(), source, location }],
            }
          : u
      )
    );
    log(`Click registered for shortcode: ${code}`);
  };

  return (
    <UrlContext.Provider value={{ urls, shortenUrl, registerClick }}>
      {children}
    </UrlContext.Provider>
  );
};
