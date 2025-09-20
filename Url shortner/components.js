import React, { useState, useContext } from "react";
import { UrlContext } from "../context/UrlContext";
import { TextField, Button, Card, CardContent } from "@mui/material";

export default function UrlShortenerForm() {
  const { shortenUrl } = useContext(UrlContext);
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState(30);
  const [custom, setCustom] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    try {
      if (!/^https?:\/\/.+\..+/.test(url)) {
        setError("Invalid URL format");
        return;
      }
      const newUrl = shortenUrl(url, parseInt(validity), custom || null);
      setError("");
      alert(`Short URL created: http://localhost:3000/${newUrl.code}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card>
      <CardContent>
        <TextField label="Original URL" fullWidth onChange={(e) => setUrl(e.target.value)} />
        <TextField label="Validity (minutes)" type="number" fullWidth defaultValue={30} onChange={(e) => setValidity(e.target.value)} />
        <TextField label="Custom Shortcode (optional)" fullWidth onChange={(e) => setCustom(e.target.value)} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button variant="contained" onClick={handleSubmit}>Shorten</Button>
      </CardContent>
    </Card>
  );
}
