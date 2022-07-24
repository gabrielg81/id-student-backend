import express from "express";
import { router } from "./src/routes";

const app = express();

app.use(express.json());

app.use(router);
const port = 80;
app.listen(port, () => console.log(`Server ON! Port: ${port}`));