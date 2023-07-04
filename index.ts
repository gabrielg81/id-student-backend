import express from "express";
import { router } from "./src/routes";

import cors from "cors";

const app = express();

// app.use(
//   cors({
//     origin: "*",
//     methods: "*",
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     credentials: true,
//   })
// );

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.use(express.json());

app.use(router);

/*app.listen(() => console.log("Server ON!"));*/

const port = 8080;
app.listen(port, () => console.log(`Server ON! Port: ${port}`));
