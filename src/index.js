import express from "express";

import usersRouters from "./routes/users.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Resource routes
app.use("/users", usersRouters);

// Error handling
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
