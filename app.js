const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", bookRoutes);
app.use("/api", reviewRoutes);

// Mongo connection to connect with mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Book Review is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
