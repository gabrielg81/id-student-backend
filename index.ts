import express from "express";
import { router } from "./src/routes";

import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "*",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());

app.use(router);

/*app.listen(() => console.log("Server ON!"));*/

const port = 8080;
app.listen(port, () => console.log(`Server ON! Port: ${port}`));
