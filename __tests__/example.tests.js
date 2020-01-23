// This file contains example of how to write js tests
// the tests are failing tests, so you can fix them to learn how
// jest works. Otherwise you can delete this file or add it to
// testPathIgnorePatterns in the jest section of package.json

// Comments like this are notes and explantations

/* Comments like this are notes on what (not) to change, hints, etc.
 * The expected results are correct so you need to change things
 * to match e.g.
 *  expect(1+1).toEqual(3) <-- do not change the value in this( toEqual)
 *           ^
 *           |
 *           ------ Change this, the thing that produces the value
 */

// tests can be written at the top level like this
// test('description', fn);

test('toBe tests exact equality using Object is', () => {
  expect(2 + 1).toBe(4);
});


test('exampleFunction returns true', () =>{
  /* this is a function so change this not the test */
  function exampleFunction(){
    return true;
  }

  expect(exampleFunction()).toBe(false);
});


// use toEqual to compare arrays and objects
// not can be used to negate a test
test('toEqual recursively checks arrays', () => {
  /* Change the arrays and objects not the tests */
  let arrayA = [0, 1];
  let arrayB = [0, 2];

  expect(arrayA).toEqual(arrayB);

  /* You don't need to change anything here:
   * a is not the same object as b, so this will always pass
   * this is the difference between identity and equality
   * ie between == and === */
  expect(arrayA).not.toBe(arrayB);
});

test('toEqual recursively checks objects etc', () => {
  let objectA =  {'a': 0, 'b':1};
  let objectB = {'a': 0, 'b':2};

  expect(objectA).toEqual(objectB);

  /* You don't need to change anything here (see above)
   * identity is also known as deep equality */
  expect(objectA).not.toBe(objectB);
});


// tests can be grouped together using 'describe'('name', fn)
describe('truthiness tests', () =>{
  /* not true is false, most of these want you to add or remove not
   * you will need to get them all right.
   *
   * Sometimes you one "test" per test() is better
   * but its ok to group them like this to express multiple citeria
   * for the same thing */
  test('tobeTruthy matches things if treats as true', () => {
    expect(false).toBeTruthy();
    expect(1).not.toBeTruthy();
    expect([]).not.toBeTruthy();
    expect(null).toBeTruthy();
  });

  test('tobeFalsy matches things if treats as false', () => {
    expect(true).toBeFalsy();
    expect(0).not.toBeFalsy();
    expect(-1).not.toBeFalsy();
    expect(null).not.toBeFalsy();
    expect(undefined).not.toBeFalsy();
  });

  test('match only null or undefined', () => {
    expect(null).not.toBeNull();
    expect(undefined).not.toBeUndefined();

    let defined = 'a';
    expect(defined).not.toBeDefined();
  });
});


describe('testing numbers', () => {
  test('greater than', () => {
    expect(3).toBeGreaterThan(4);
  });

  test('greater than or equal', () => {
    expect(3.5).toBeGreaterThanOrEqual(4.5);
  });

  test('less than', () => {
    expect(5).toBeLessThan(4);
  });

  test('less than or equal', () => {
    expect(5.5).toBeLessThanOrEqual(4.5);
  });

  test(
    'use toBeCloseTo for floating point numbers to avoid rounding errors',
    () => {
      /* Exception: change the second number, not val */
      let val = 0.1 + 0.2; // 0.30000000000000004 with js
      expect(val).toBeCloseTo(0.4);
    }
  );
});


describe('testing strings', () => {

  let substr = 'str';
  test('string comparison with toBe and toEqual', () => {
    expect('string').toBe('strings');
    expect('string').toEqual('strings');
  });

  test('matching substrings', ()=>{
    let word = 'word';
    // using toContain
    expect(word).toContain(substr);

    // using expect.stringContaining
    expect(word).toEqual(expect.stringContaining(substr));
  });

  test('matching strings using regex', () => {
    let word = 'green';
    expect(word).toMatch(/ye/);
    expect(word).toEqual(expect.stringMatching(/lo/));
  });

  test('check the length of a string', () => {
    expect('word').toHaveLength(5);
  });
});


describe('testing arrays', () => {
  /* change this array */
  let colours = ['puce', 'crimson', 'celadon'];

  test('toContain tests the presence of a single element', () => {
    expect(colours).toContain('red');
  });

  test('expect.arrayContaining matches a subset', () =>{
    // Hint: all members of expected must be in colours,
    // but colours can contain things not in expected
    let expected = ['crimson', 'puce', 'green'];
    expect(colours).toEqual(expect.arrayContaining(expected));
  });

  test('expect.not.arrayContaining is not a subset of the array', () =>{
    /* Exception: change expected so the test passes */
    let expected = ['celadon', 'puce'];
    expect(colours).toEqual(expect.not.arrayContaining(expected));
  });
    test('check the length of an array', () => {
    expect(colours).toHaveLength(6);
  });
});


describe('testing objects', () => {
  const obj = {'a': 1, 'b': 1};

  test('comparing objects with toEquals', () => {
    let expected = {'a': 1, 'b': 2};
    expect(obj).toEqual(expected);
  });

  test('expect.objectContaining tests for  a subset', () =>{
    /* change expected so it matches the object that passes the last test */
    let expected = {'a': 2};
    expect(obj).toEqual(expect.objectContaining(expected));
  });

  test('expect.not.objectContaining tests that it is not a subset', () =>{
    /* change expected so it matches the object that passes the last test */
    let expected = {'a': 1};
    expect(obj).toEqual(expect.not.objectContaining(expected));
  });

  test('toMatchObject checks members of expected are in object', () => {
    /* for this change change expected so it matches
     * the object that passes the previous test */
    let expected = {'a': 2};
    expect(obj).toMatchObject(expected);
  });

  test('toMatchObject checks recursively', () => {
    let myCat = {
      'name': 'Quimby',
      'animal':{
        'type': 'cat',
        'colour': 'black',
      },
      'age': undefined,   // my cat's a rescue we don't know how old she is
    };

    /* don't change this */
    let expected = {
      'name': 'Quimby',
      'animal':{
        'colour': expect.stringMatching(/tabby|calico/), // tabby or calico
      },
    };


    expect(myCat).toMatchObject(expected);
  });
});

describe('toThrow is used to check an Exception has be thrown', () => {
  const GoodError = function(msg){this.msg = msg;};
  const BadError = function(msg){this.msg = msg;};

  /* change throwError in the following tests */
  test('toThrow takes an Exception as an argument', () => {
    function throwError(){throw new BadError();}

    expect(throwError).toThrow(GoodError)
  });

  test('toThrow takes a string  as an argument', () => {
    function throwError(){throw new Error('error');}

    // N.B. Not exact match: whoops would also match here
    expect(throwError).toThrow('oops!')
  });

  test('toThrow with no args will catch any exception', () => {
    function throwError(){throw new Error();}

    expect(throwError()).toThrow()
  });
});
