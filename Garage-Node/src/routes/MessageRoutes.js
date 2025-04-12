const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageController');

// API Route to handle "Send a Message" form submission
router.post('/sendmessage', messageController.createMessage);

// PI Route to get all messages (for admin panel)
router.get('/messages', messageController.getMessages);

module.exports = router;
