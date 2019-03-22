# Testing Your PX Blue Applications
Testing is an important part of building an application, but unfortunately, it usually does not receive as much attention as it should. Testing should be considered from the very beginning of development, not as an afterthought once development is finished. In general, every time you write a new piece of code or update existing code, you should also write a test that verifies that your code is correct.

Tests come in a variety of different flavors. The following sections discuss Unit Tests and End-to-End (E2E) Tests.

## Unit Testing 
Unit testing focuses on testing small pieces of your application (such as testing that functions return the expected values for various inputs). These will likely make up the bulk of your tests. They are quick to write, easy to automate, and can help you achieve significant code coverage.

Angular and React both come with built-in unit testing frameworks (if you are using the Angular CLI or Create React App). For consistency, you should stick to using these standard tools unless you have a good reason for using alternatives. 

### Angular
The Angular CLI comes pre-configured with Jasmine and Karma for unit testing. When you create a new project, sample tests are created in your project for you (test files are identified by the ```.spec.ts``` file extension). You can execute the tests by running the following in your terminal:
```
cd your/project/root
ng test
```
This will build your app and launch the browser with the test runner. For more detailed information on writing test cases, see the documentation for [Jasmine](https://jasmine.github.io/2.0/introduction) and [Karma](https://karma-runner.github.io/latest/index.html).

### React
The Create React App CLI is pre-configured with the Jest testing framework. When creating a new project, a sample test is created in your project for you (test files are identified by the ```.test.js``` file extension). You can execute the tests by running the following in your terminal:
```
cd your/project/root
yarn test
```

This will run your tests and show the pass/fail output in the terminal.

There are additional test utilities that complement Jest well. Create React App provides access to ```react-testing-library``` through the ```react-dom``` dependency. The PX Blue team has also made use of Enzyme, a testing framework created by AirBnB. 

For detailed information, refer to the [Jest](https://github.com/facebook/jest), [Running React Tests](https://facebook.github.io/create-react-app/docs/running-tests), [Enzyme](https://airbnb.io/enzyme/), or [react-testing-library](https://github.com/kentcdodds/react-testing-library) documentation.


## End-to-End Testing
End-to-End tests are a higher level test than Unit Tests. They focus primarily on the flow of the application, making sure that the different parts of the application work together correctly. For example, you may test that clicking a login button takes you to the appropriate sign-in page.

### Cypress
Cypress is an open source testing framework that boasts support for any modern JavaScript framework. It works well for E2E tests in both Angular and React applications and is easier to use than some of the more traditional tools, such as Selenium. 

For a more detailed write-up on Cypress, check out our [GitHub](https://github.com/pxblue/pxblue-docs/blob/testing_strategies/cypress.md) document, or refer to the official [Cypress Documentation](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements).