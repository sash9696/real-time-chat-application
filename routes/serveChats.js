import { Router } from 'express';
import { getMessages, getDirectMessages } from '../controllers/chatController.js'; // Import the controller functions

const router = Router();

// Route for handling general chat room messages
router.post('/', getMessages);

// Route for handling direct messages (DMs)
router.post('/dm', getDirectMessages);

export default router; // Export the router so it can be used in other parts of the app
