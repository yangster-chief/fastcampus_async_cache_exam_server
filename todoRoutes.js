const express = require('express');
const router = express.Router();
const ToDo = require('./toDoModel.js').ToDo;

// Get all ToDo items
// Get all ToDo items
router.get('/', async (req, res) => {
    try {
        const toDos = await ToDo.find();
        res.status(200).send(toDos);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Create a new ToDo item
router.post('/', async (req, res) => {
    try {
        const toDo = new ToDo({
            text: req.body.text,
        });
        const savedToDo = await toDo.save();
        res.status(201).send(savedToDo);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update a ToDo item
router.patch('/:id', async (req, res) => {
    try {
        const toDo = await ToDo.findOneAndUpdate(
            { _id: req.params.id },
            { done: true },
            { new: true } // Return the updated object
        );
        if (!toDo) {
            return res.status(404).send({ message: 'ToDo not found' });
        }
        res.status(200).send(toDo);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;
