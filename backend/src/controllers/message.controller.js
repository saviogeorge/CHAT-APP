import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    //get the users
    //and filter out the users whose 
    //id is not equal to the current users id except the password
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const myId = req.user._id;
  
      //find all the messages 
      //between the sender and receiver
      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };



export const sendMessage = async (req, res) => {
try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    //check if an image is received
    //if so upload and get he url from 
    //cloudinary
    let imageUrl;
    if (image) {
      //TODO
    }

    //create the message
    const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: imageUrl,
    });

    //save the message to the DB
    await newMessage.save();

    //TODO: real time socket.io handling

    res.status(201).json(newMessage);
} catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
}
};