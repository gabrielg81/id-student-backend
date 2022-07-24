import express from "express";
import { router } from "./src/routes";

const app = express();

app.use(express.json());

app.use(router);

app.listen(8080, () => console.log("Server ON! 8080"));
