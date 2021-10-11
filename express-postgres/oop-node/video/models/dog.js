/** Dog model.
 *
 * These is an example of smarter, stateful model. It acts a
 * bit like an ORM, in that you make instances of Dog and call
 * methods on them.
 *
 * */
const db = require("../db");
const ExpressError = require('../expressError');

class Dog {
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
  static async getAll() {
    const results = await db.query(`SELECT id,name,age FROM dogs`);
    const dogs = results.rows.map(r => new Dog(r.id, r.name, r.age));
    return dogs;
  };
  static async getById(id) {
    const result = await db.query(`SELECT id,name,age FROM dogs WHERE id=$1`, [id]);
    const d = result.rows[0];
    if (!d) throw new ExpressError(`Dog with id: ${id} not found!`, 404);
    return new Dog(d.id, d.name, d.age);
  }
  static async create(name, age) {
    if (!name || !age) throw new ExpressError(`You must provide a name and age!`, 400);
    const result = await db.query(`INSERT INTO dogs (name,age) VALUES ($1,$2) RETURNING id,name,age`, [name, age]);
    const d = result.rows[0];
    return new Dog(d.id, d.name, d.age);
  }
  async remove() {
    await db.query(`DELETE FROM dogs WHERE id=$1`, [this.id]);
  };
  async save() {
    const results = await db.query(
      `UPDATE dogs
      SET name=$1,age=$2
      WHERE id=$3`,
      [this.name, this.age, this.id]
    );
  };
  speak() {
    console.log(`${this.name} says woof!`);
  };
};

module.exports = Dog;