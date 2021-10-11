/** Cat routes for express-pg-oo */

const express = require("express");

const Cat = require("../models/cat");

const router = new express.Router();

// IMPORTANT: all of these function bodies should really be
// wrapped in a try/catch, where catching an error calls
// next(err) --- this is omitted here for brevity in slides


/** get all cats: [{id, name, age}, ...] */
router.get('/', async (req, res, next) => {
  try {
    const cats = await Cat.getAll();
    return res.json(cats);
  } catch (e) {
    return next(e);
  };
});

/** get cat by id: {id, name, age} */
router.get('/:id', async (req, res, next) => {
  try {
    const cat = await Cat.getById(req.params.id);
    return res.json(cat);
  } catch (e) {
    return next(e);
  };
});;


/** create cat from {name, age}: return {name, age} */
router.post('/', async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const cat = await Cat.create(name, age);
    return res.json(cat);
  } catch (e) {
    return next(e)
  }
});


/** delete cat from {id}; returns "deleted" */
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const cat = await Cat.remove(id);
    return res.json({ msg: `Cat with id: ${id} removed from DB!` });
  } catch (e) {
    return next(e);
  };
});

/** update a cats {name} and {age} from {id}: returns new {name, age} */
router.patch('/:id', async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const cat = await Cat.update(req.params.id, name, age);
    return res.json(cat);
  } catch (e) {
    return next(e);
  }
});

/** age cat: returns new {age} (older, younger) */
router.patch('/:id/older', async (req, res, next) => {
  try {
    const cat = await Cat.makeOlder(req.params.id);
    return res.json(cat);
  } catch (e) {
    return next(e);
  }
});

router.patch('/:id/younger', async (req, res, next) => {
  try {
    const cat = await Cat.makeYounger(req.params.id);
    return res.json(cat);
  } catch (e) {
    return next(e);
  }
});



module.exports = router;