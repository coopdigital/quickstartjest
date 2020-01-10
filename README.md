# node quick start with js
This contains a repo you can clone to get quickly started with test-driven js.
Once cloned run ```npm install``` then ```npm test```

A Sample function is in ```src/index.js``` with a corresponding test in ```__tests__/main.tests.js``` to get you started.

## Example tests
Included in the ```__tests__``` directory is ```example.tests.js```

This contains failing tests that will introduce you to the basics of
[jest](https://jestjs.io/) the testing framework used.

You can safely delete this file if not needed or add the following
to package.json so its ignored.
```
"testPathIgnorePatterns": [
      "/node_modules/",
      "__tests__/example.tests.js",
    ]
  }
}
```
