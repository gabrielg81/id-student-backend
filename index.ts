import express from "express";
import { router } from "./src/routes";

import cors from "cors";

const app = express();

app.use(express.json());

app.use(router);

const corsOptions = {
  origin: "*",
  preflightContinue: false,
  credentials: true,
};
app.use(cors(corsOptions));

/*app.listen(() => console.log("Server ON!"));*/

const port = 8080;
app.listen(port, () => console.log(`Server ON! Port: ${port}`));
