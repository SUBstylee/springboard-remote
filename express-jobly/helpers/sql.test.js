const { BadRequestError } = require('../expressError');
const { sqlForPartialUpdate } = require('./sql');

describe('sqlForPartialUpdate', () => {
    test('updates a single item', () => {
        const result = sqlForPartialUpdate({ field1: "value1" }, { field1: "field1" });
        expect(result).toEqual({ setCols: "\"field1\"=$1", values: ['value1'] });
    });
    test('update multiple items', () => {
        const result = sqlForPartialUpdate({ field1: "value1", field2: "value2" }, { field1: "field1", field2: "field2" });
        expect(result).toEqual({ setCols: "\"field1\"=$1, \"field2\"=$2", values: ['value1', "value2"] });
    });
    test('bad request error if no data is sent', () => {
        expect(() => { sqlForPartialUpdate({}, {}) }).toThrow(BadRequestError);
        expect(() => { sqlForPartialUpdate({}, {}) }).toThrow("No data");
    });
});