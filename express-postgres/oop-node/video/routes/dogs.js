/** Dog routes for express-pg-oo */

const express = require("express");
const ExpressError = require("../expressError");
const Dog = require("../models/dog");
const router = new express.Router();



/** get all dogs: [{id, name, age}, ...] */
router.get('/', async (req, res, next) => {
  try {
    const dogs = await Dog.getAll()
    dogs.forEach(d => d.speak());
    return res.json(dogs);
  } catch (e) {
    return next(e);
  };
});

/** get dog by id: {id, name, age} */
router.get('/:id', async (req, res, next) => {
  try {
    const dog = await Dog.getById(req.params.id);
    return res.json(dog);
  } catch (e) {
    return next(e);
  };
});

/** create dog from {name, age}: return id */
router.post('/', async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const dog = await Dog.create(name, age);
    return res.json(dog);
  } catch (e) {
    return next(e);
  };
});

/** delete dog from {id}; returns "deleted" */
router.delete('/:id', async (req, res, next) => {
  try {
    const dog = await Dog.getById(req.params.id);
    await dog.remove();
    return res.json({ msg: `Removed dog with id: ${req.params.id}!` });
  } catch (e) {
    return next(e);
  };
});

/** age dog: returns new age (older/younger) */
router.patch('/:id/older', async (req, res, next) => {
  try {
    let dog = await Dog.getById(req.params.id);
    dog.age += 1;
    await dog.save()
    return res.json(dog);
  } catch (e) {
    return next(e);
  };
});
router.patch('/:id/younger', async (req, res, next) => {
  try {
    let dog = await Dog.getById(req.params.id);
    dog.age -= 1;
    await dog.save()
    return res.json(dog);
  } catch (e) {
    return next(e);
  };
});

/** rename dog: returns new name */
router.patch('/:id/rename', async (req, res, next) => {
  try {
    let dog = await Dog.getById(req.params.id);
    if (!req.body.newName || req.body.newName.length === 0) throw new ExpressError(`You must input a new name!`, 400)
    dog.name = req.body.newName;
    await dog.save()
    return res.json(dog);
  } catch (e) {
    return next(e);
  };
});

module.exports = router;