import React, { useContext } from "react";
import { UrlContext } from "../context/UrlContext";
import { Card, CardContent } from "@mui/material";

export default function StatsPage() {
  const { urls } = useContext(UrlContext);

  return (
    <div>
      {urls.map((u) => (
        <Card key={u.code} style={{ margin: "10px" }}>
          <CardContent>
            <h3>Short URL: http://localhost:3000/{u.code}</h3>
            <p>Original: {u.originalUrl}</p>
            <p>Expires: {u.expiry.toString()}</p>
            <p>Clicks: {u.clicks.length}</p>
            <ul>
              {u.clicks.map((c, i) => (
                <li key={i}>
                  {c.time.toString()} | {c.source} | {c.location}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
