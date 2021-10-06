const Item = require('../item');
const { Router } = require('express');
const router = new Router();

// GET /items, GET /item/:name
router.get('/', (req, res, next) => {
    try {
        return res.json({ items: Item.getAll() });
    } catch (e) {
        next(e);
    }
})
router.get('/:name', (req, res, next) => {
    try {
        return res.json({ item: Item.getItem(req.params.name) });
    } catch (e) {
        next(e);
    }
})
// POST /item
router.post('/', (req, res, next) => {
    try {
        const newItem = new Item(req.query.name, +req.query.price);
        return res.json({ item: newItem });
    } catch (e) {
        return next(e);
    };
});
// PATCH /item/:name
router.patch('/:name', (req, res, next) => {
    try {
        const findItem = Item.patchItem(req.params.name, req.query);
        return res.json({ item: findItem });
    } catch (e) {
        return next(e);
    }
});
// DELETE /items/:name
router.delete('/:name', (req, res, next) => {
    try {
        const itemName = req.params.name;
        Item.deleteItem(req.params.name);
        return res.json({ message: `Deleted ${itemName}` });
    } catch (e) {
        next(e);
    };
});
module.exports = router;