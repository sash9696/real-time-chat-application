import express from 'express';
import http from 'http';
import { Server as socketio } from 'socket.io'; 
import cors from 'cors';
import mongoose from 'mongoose';
const SERVER_NAME = process.env.SERVER_NAME || 'APP';

const app = express();


const uri= 'mongodb+srv://sahilchopra9696:Hwjtp6VpV2LxknKX@cluster0.r2ql7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const httpServer = http.createServer(app);
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const io = new socketio(httpServer, {
  cors: {
    origin: "*",  // Allow all origins (for testing)
    methods: ["GET", "POST"]
  }
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.on('message', (data) => {
    console.log('Received message: ', data);
    socket.emit('message', { response: 'Message received!' });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the Chat App!');
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`${SERVER_NAME} is running on port ${PORT}`);
});
