import mongoose from 'mongoose';

// Define the Chat schema
const ChatSchema = mongoose.Schema({
    time: { type: Date, default: Date.now },
    user: { type: String, required: true },
    room: { type: String, required: true },
    data: { type: String, required: true },
    type: { type: String, required: true },
    broadcast: { type: Number, default: 0 },
    unicast: { type: Boolean, default: false },
    toUser: { type: String, default: null }
});

// Export the model
export default mongoose.model('Chat', ChatSchema, 'chats');
