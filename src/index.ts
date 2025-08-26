import "dotenv/config";
import express from "express";
import cors from "cors";

import { getProperties } from "./use-cases/getProperties";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET"],
    credentials: true,
  })
);

app.get("/", (_req, res) => res.send("Warden Weather Test: OK"));
app.use(`/get-properties`, getProperties);

app.listen(port, () => console.log(`Server on http://localhost:${port}`));
