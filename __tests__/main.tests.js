// import module
// note there is not need to use the file name as its index.js
// alternatives are require('../src/index') or require('../src/index.js')
const main = require('../src');

describe('use this to group tests together', ()=> {
  test('exampleFunction returns true', () => {
    expect(main.exampleFunction()).toBe(false);
  });
});