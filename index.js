import express from "express";
import cors from "cors";
import router from "./src/controllers/controllers.js";
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  console.log("API endpoint:", req.originalUrl);
  next();
});
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/image", router);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
