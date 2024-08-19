
const express = require('express');
const router = express.Router();
const items = require('../db/fakeDb');

// GET /items - return list of items
router.get('/', (req, res) => {
    res.json(items);
});

// POST /items - add item to list
router.post('/', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json({ added: newItem });
});

// GET /items/:name - return single item by name
router.get('/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
});

// PATCH /items/:name - update item by name
router.patch('/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;

    res.json({ updated: item });
});

// DELETE /items/:name - delete item by name
router.delete('/:name', (req, res) => {
    const itemIndex = items.findIndex(i => i.name === req.params.name);
    if (itemIndex === -1) return res.status(404).json({ error: "Item not found" });

    items.splice(itemIndex, 1);
    res.json({ message: "Deleted" });
});

module.exports = router;
