// index.js

const express = require("express");
const mongoose = require("mongoose");
const passport = require("./config/passport");
const authRoutes = require("./routes/auth");
const customerServiceRoutes = require("./routes/customerService");

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/auth", authRoutes);
app.use("/customer-service", customerServiceRoutes);

// WebSocket Connection
const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("Socket connected");

  // Example: Broadcasting a message to all connected clients
  socket.on("newRequest", (data) => {
    console.log("New request:", data);
    // Broadcast the new request to all connected clients
    io.emit("newRequest", data);
  });

  
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
