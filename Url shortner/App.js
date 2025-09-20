import React from "react";
import UrlShortenerForm from "./components/UrlShortenerForm";
import StatsPage from "./components/StatsPage";
import { UrlProvider } from "./context/UrlContext";
import { LoggerProvider } from "./context/LoggerContext";
import { Container } from "@mui/material";

function App() {
  return (
    <LoggerProvider>
      <UrlProvider>
        <Container>
          <h1>React URL Shortener</h1>
          <UrlShortenerForm />
          <h2>Statistics</h2>
          <StatsPage />
        </Container>
      </UrlProvider>
    </LoggerProvider>
  );
}

export default App;
