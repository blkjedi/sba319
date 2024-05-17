//? =========imports
import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users.js";
import menuRouter from "./routes/menu_items.js"
import storeRouter from "./routes/store_locations.js"

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());

//?==============middleware
app.use((req, res, next) => {
  console.log("request from url:" + req.url);
  next();
});

//?===============routes

app.get("/", (req, res) => {
  res.send("welcome to the Driv thru  api");
});

app.use("/users", usersRouter);
app.use("/menu_items",menuRouter);
app.use("/store_locations",storeRouter);


//?==========global error middleware
app.use((err, _, res, next) => {
    res.status(500).send("server error");
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });