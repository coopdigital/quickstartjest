// This file contains example of how to write js tests
// the tests are failing tests, so you can fix them to learn how
// jest works. Otherwise you can delete this file or add it to
// testPathIgnorePatterns in the jest section of package.json


// tests can be written at the top level like this
// test('description', fn);
test('toBe tests exact equality using Object is', () => {
  expect(2 + 1).toBe(4);
});


test('exampleFunction returns true', () =>{
  function exampleFunction(){
    return true;
  }

  expect(exampleFunction()).toBe(false);
});


// use toEqual to compare arrays and objects
// not can be used to negate a test
test('toEqual recursively checks arrays and objects etc', () => {
  let arrayA = [0, 1];
  let arrayB = [0, 2];
  expect(arrayA).toEqual(arrayB);
  expect(arrayA).not.toBe(arrayB); // a is not the same object as b, so will
                                  // be true even if the previous test passes

  let objectA =  {'a': 0, 'b':1};
  let objectB = {'a': 0, 'b':2};
  expect(objectA).toEqual(objectB);
  expect(objectA).not.toBe(objectB);
});


// tests can be grouped together using 'describe'('name', fn)
describe('truthiness tests', () =>{
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
  test('greater than (or equal)', () => {
    expect(3).toBeGreaterThan(4);
    expect(3.5).toBeGreaterThanOrEqual(4.5);
  });
    expect(5).toBeLessThan(4);
    expect(5.5).toBeLessThanOrEqual(4.5);

  test(
    'use toBeCloseTo for floating point numbers to avoid rounding errors',
    () => {
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
    expect('string').not.toContain(substr);
  });

  test('matching substrings', ()=>{
    // using toContain
    expect('string').toContain(substr);

    // using expect.stringContaining
    expect('string').not.toEqual(expect.stringContaining(substr));
  });

  test('matching strings using regex', () => {
    expect('string').toMatch(/ni/);
    expect('string').toEqual(expect.stringMatching(/rt/));
  });

    test('check the length of a string', () => {
    expect('string').toHaveLength(5);
  });
});


describe('testing arrays', () => {
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
    let expected = ['crimson', 'puce'];
    expect(colours).toEqual(expect.not.arrayContaining(expected));
  });
    test('check the length of an array', () => {
    expect(colours).toHaveLength(4);
  });
});


describe('testing objects', () => {
  const obj = {'a': 1, 'b': 2};
  test('comparing objects with toEquals', () => {
    let expected = {'a': 1, 'b': 1};
    expect(obj).toEqual(expected);
  });

  test('expect.objectContaining tests the expected object is a subset', () =>{
    let expected = {'a': 2};
    expect(obj).toEqual(expect.objectContaining(expected));

    expected = {'b': 1};
    expect(obj).toEqual(expect.not.objectContaining(expected));
  });

  test('toMatchObject checks members of expected are in object', () => {
    let expected = {'a': 2};
    expect(obj).toMatchObject(expected);
  });

  test('toMatchObject checks recursively', () => {
    let expected = {
      'name': 'Quimby',
      'animal':{
        'colour': expect.stringMatching(/tabby|calico/), // tabby or calico;
      },
    };

    let myCat = {
      'name': 'Quimby',
      'animal':{
        'type': 'cat',
        'colour': 'black',
      },
      'age': undefined,     // my cat's a rescue we don't know how old she is
    };

    expect(myCat).toMatchObject(expected);
  });
});

describe('toThrow is used to check an Exception has be thrown', () => {
  const GoodError = function(msg){this.msg = msg;};
  const BadError = function(msg){this.msg = msg;};

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
