[![Continuous Integration (CI)](https://github.com/Chandan9898Kumar/Crud-Using-Rest-Api/actions/workflows/Continuous_Integration.yml/badge.svg?branch=features)](https://github.com/Chandan9898Kumar/Crud-Using-Rest-Api/actions/workflows/Continuous_Integration.yml)

# Getting Started with Create React App And Its Dependencies.

#### React

1. react - because this is a React-based template
2. react-dom - for adding React app to the DOM
3. react-router - for creating routes to views
4. history - peer dependency of react-router

### Webpack

1. webpack - for packaging
2. webpack-dev-server - for development

### Loaders

1. babel-loader - for loading React/jsx components
2. babel-core - peer dependency for babel-loader
3. babel-preset-react - to properly load React components
4. file-loader - for loading images etc.
5. style-loader - for loading styles
6. css-loader - for loading css
7. sass-loader - for loading sass

### Plugins

1. copy-webpack-plugin - to copy static boilerplate to build
2. Testing
3. jest-cli - for running tests

### Linting

1. eslint - for linting
2. eslint-plugin-react - to handle linting amidst jsx

### Testing

1. React Testing Library : npm install --save-dev @testing-library/react
2. Jest.
3. Enzyme.

### Re-Render :

`When a component that is already displayed is re-render again. Purpose is to keep the UI in sync with the states`

### Error :

`FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory`
Solution :-

1. See the current value of max-old-space-size (in MB)
   To see the current (not exact but very close) value of max-old-space-size (in MB), run in your terminal :
   `   node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'     `

2. Put this is in terminal :  
   a. `   Set NODE_OPTIONS="--max-old-space-size=8192"    `
   OR
   b `   $env:NODE_OPTIONS="--max-old-space-size=8192"   `

### Best Practices React

1. `prop-types`
   Using 'prop-types' to document and validate the types of props passed to a component helps prevent errors. Prop types help to ensure that the correct data types are being passed into your components, reducing the likelihood of runtime errors. Prop types serve as documentation for your components, making it clear what types of data each component expects and what the component does with that data. They can help to identify issues with your code by providing helpful error messages when an incorrect data type is passed to a component.

Using prop types can help to facilitate collaboration between developers by making it clear what data is expected by each component and reducing confusion about how to use the component. Using prop types can improve the overall quality of your code by reducing the likelihood of runtime errors and making it more maintainable and readable.

### Error In Webpack

Module not found: Error: Can't resolve './App' in '/home/user/Desktop/WebDev/React/temp/merntemplate/src'
Did you mean 'App.js'?
BREAKING CHANGE: The request './App' failed to resolve only because it was resolved as fully specified
(probably because the origin is strict EcmaScript Module, e. g. a module with javascript mimetype, a '_.mjs' file, or a '_.js' file where the package.json contains '"type": "module"').
The extension in the request is mandatory for it to be fully specified.
Add the extension to the request.

` Solution : In webPack Rules write this.`
{
test: /\.m?js/,
resolve: {
fullySpecified: false,
},
}

### CI/CD in GitHub Actions

- DECIDE WHEN THE WORKFLOW IS RUN.

To run the workflow, the triggers need to be defined. workflow to run when a push happens to the main/other branch, and also when a pull request is opened or changed.

```ts
name: ci;
on: push: branches: -"main";
pull_request: {
}
```

`You can create multiple workflows in your repository. Below are examples of workflows you can create in GitHub Actions :`

1. Build workflow: This helps us build our code from the source ensuring the code works well on all platforms and environments
2. Test workflow: This runs tests (unit and integrated) on every pull request to your repository ensuring the code is bug-free
3. Deploy workflow: This helps developers to deploy code to a production environment.
4. Notification workflow: This is used to send a notification when an event occurs in a repository.

### In summary, using GitHub Actions developers can create a CI/CD pipeline to automate the software development lifecycle workflows.

- It covers a couple of stages:

1. `Source stage`: At this stage, you develop or implement the required features using version control software like Git.
2. `Build Stage`:  This step put together the source code with all its dependencies into an artifact (executable format)
3. `Test stage`:   At this stage, you integrate automated testing to validate the quality of the code, and detect and fix bugs.
                   Various tests can be executed at this stage, once the code passes the tests, it is ready to be deployed.
4. `Deployment`:   The final stage is to automatically deploy the app to the staging or production environment.
