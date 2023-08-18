const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const studentRoute = require("./routes/student");
const facultyRoute = require("./routes/facultyRoutes")
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/student", studentRoute);
app.use("/api/faculty", facultyRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
