const express = require('express');
const mongoose = require('mongoose');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const customerServiceRoutes = require('./routes/customerService');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); // Add this line for WebSocket

// ... (rest of the code)

// WebSocket Connection
io.on('connection', (socket) => {
  console.log('Socket connected');

  // You can add more logic here for handling real-time updates
});

// ... (rest of the code)

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
