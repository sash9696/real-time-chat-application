import UserSchema from '../models/chat.js'; // Import the UserSchema model

// Controller for handling general chat room messages
export const getMessages = async (req, res) => {
  try {
    const user = req.body.user;
    const room = req.body.room;

    // Define the filter conditions based on the provided user and room
    let filter = {
      $or: [
        { $and: [{ room: room }, { unicast: false }] },
        { broadcast: 1 },
      ],
    };

    // If no user is provided, find all messages in the room or that are broadcast
    if (!user) {
      filter = { $or: [{ room: room }, { isBroadcast: 1 }] };
    }

    console.log('Filter used:', filter); // Debug log to check the filter
    
    // Fetch data from the database based on the filter
    const data = await UserSchema.find(filter, { _id: 0 });
    res.status(200).send(JSON.stringify(data)); // Send the data back as a JSON response
  } catch (error) {
    console.error('Error in getMessages:', error); // Log error for debugging
    res.status(500).send({ error: 'Internal server error' }); // Send a clearer error message
  }
};

// Controller for handling direct messages (DMs)
export const getDirectMessages = async (req, res) => {
  try {
    const user = req.body.user;
    const room = req.body.room;

    // Define the filter conditions for direct messages
    let filter = {
      $or: [
        { $and: [{ unicast: true }, { user: user }] },
        { $and: [{ unicast: true }, { toUser: user }] },
      ],
    };

    // If no user is provided, find messages in the room or broadcast messages
    if (!user) {
      filter = { $or: [{ room: room }, { isBroadcast: 1 }] };
    }

    console.log('Filter used:', filter); // Debug log to check the filter
    
    // Fetch data from the database based on the filter
    const data = await UserSchema.find(filter, { _id: 0 });
    res.status(200).send(JSON.stringify(data)); // Send the data back as a JSON response
  } catch (error) {
    console.error('Error in getDirectMessages:', error); // Log error for debugging
    res.status(500).send({ error: 'Internal server error' }); // Send a clearer error message
  }
};
