## Exercism Setup

All of the Exercism exercises can be done from the comfort of your own command line. This will require some configuration and setup on your part.

1. Install jasmine-node `npm install jasmine-node -g` This is the test framework we will use to run the tests
2. Using the terminal, browse to the `exercism` folder in this folder
3. For each of the following challenges, update the .js file to make the tests pass. You can run the tests by running `jasmine-node .`
4. Make sure to commit your repo with the update js file, and the marked checkbox in this file, and push to github after every challenge is done


#### Making your first node module

To create a module that can be loaded with `var Bob = require('./bob.js');`, put this code in bob.js:

```

var Bob = function() {};

Bob.prototype.hey = function(what) {
  //
  // Your solution to the exercise goes here
  //
};

module.exports = Bob;

```

#### Setting up a Linter

A linter is like a tester for your code's style and formatting. In some languages there are many acceptable styles, and using a linter allows you to be internally consistent (e.g. Ruby), or adhere to one of many common styles. In other languages there are fewer choices, and a linter allows programmers to look at code from a great variety of sources and still feel at home (e.g. Go).


The old standard linter for JavaScript is [JSLint](http://jslint.com/). However, it is controversially picky. [JSHint](http://jshint.com/) is another popular linter. We suggest using [ESLint](http://eslint.org/), which is more customizable than either JSLint or JSHint, and is well-run.

To get started using ESLint, follow the [instructions here](http://eslint.org/docs/user-guide/command-line-interface.html). Once you have ESLint installed, you'll be able to lint your code with a simple `eslint [options] [file|dir]*` command. Eg, if you're in the hello-world directory, `eslint .` would lint all files in that directory.
