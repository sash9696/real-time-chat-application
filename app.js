import express from 'express';
import http from 'http';
import { Server as socketio } from 'socket.io'; 
import cors from 'cors';

const SERVER_NAME = process.env.SERVER_NAME || 'APP';

const app = express();

const httpServer = http.createServer(app);

const io = new socketio(httpServer, {
  cors: {
    origin: "*",  
    methods: ["GET", "POST"]
  }
});


app.use(cors());

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Example API endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Chat App!');
});

// Start the server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`${SERVER_NAME} is running on port ${PORT}`);
});
