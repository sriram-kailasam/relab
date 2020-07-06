import express, { Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { ExecutionController } from "./api/code-runner/execution-controller";
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const executionController = new ExecutionController();
app.use("/api/execute", executionController.register());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server started on port ", port);
});
