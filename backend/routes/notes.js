const express = require('express');
const Note = require('../models/Note');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to check JWT
const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

// Get all notes
router.get('/', auth, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.userId });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a note
router.post('/', auth, async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = new Note({
            userId: req.user.userId,
            title,
            content,
        });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a note
router.put('/:id', auth, async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a note
router.delete('/:id', auth, async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
