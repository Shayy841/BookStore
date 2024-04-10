import express from "express";
import "dotenv/config";
import dbConnect from "./dbConnect.js";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();
app.use(express.json()); // set the server to accept json data
app.use(cors());
const PORT = process.env.PORT;

const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URL);
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log("Server is started ...");
    });
  } catch (error) {
    console.log(error);
  }
};

start();

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Book Store</h1>");
});

app.use(bookRoute);

app.get("*", (req, res) => {
  res.send("How may i help you?");
});
