const Message = require('../model/MessageModel'); // Message Model Import

// Create a New Message (User Sends a Message)
exports.createMessage = async (req, res) => {
    try {
        const { fullName, email, phone, subject, message } = req.body;

        // Basic Validation
        if (!fullName || !email || !subject || !message) {
            return res.status(400).json({ error: 'All required fields must be filled!' });
        }

        // Create new message
        const newMessage = new Message({ fullName, email, phone, subject, message });
        await newMessage.save();

        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Server Error. Please try again later.' });
    }
};

//  Get All Messages (For Admin Panel)
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }); // Latest first
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Server Error. Please try again later.' });
    }
};
