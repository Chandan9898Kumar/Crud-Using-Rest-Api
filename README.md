[![Continuous Integration (CI)](https://github.com/Chandan9898Kumar/Crud-Using-Rest-Api/actions/workflows/Continuous_Integration.yml/badge.svg?branch=features)](https://github.com/Chandan9898Kumar/Crud-Using-Rest-Api/actions/workflows/Continuous_Integration.yml)

# Getting Started with Create React App And Its Dependencies.

### React

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

1. React Testing Library : npm install --save-dev @testing-library/react.
2. Jest.
3. Enzyme.

- NOTE : To Run A Single File Use : npm test -- --findRelatedTests RelativePath
  `Example` : To Test Only HomePage File : npm test -- --findRelatedTests src\HomePage\HomePage.js

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

### What is continuous integration (CI)?

CI is a practice where developers merge all their code changes into a central repository early and often. It is the use of automated tools to test each change you merge, insisting on the new code’s correctness before integration.

### What problem does CI solve?

To summarize, the objective of CI is to help in the early detection and resolution of bugs, increase code quality, and ensure the code remains stable.

### What is continuous delivery?

1. Continuous delivery (CD) is a practice where code changes are automatically built, tested, and deployed to the production environment. It ensures that software can be released frequently with little resistance. However, it doesn’t necessarily mean it’s deployed immediately. Continuous Deployment, on the other hand, is when changes are deployed to production as soon as they pass the automated tests.

2. CD is an extension of CI, it automates the deployment process by ensuring all code changes are deployed to a testing environment and or a production environment after the build stage.

`You can create multiple workflows in your repository. Below are examples of workflows you can create in GitHub Actions :`

1. Build workflow: This helps us build our code from the source ensuring the code works well on all platforms and environments
2. Test workflow: This runs tests (unit and integrated) on every pull request to your repository ensuring the code is bug-free
3. Deploy workflow: This helps developers to deploy code to a production environment.
4. Notification workflow: This is used to send a notification when an event occurs in a repository.

### In summary, using GitHub Actions developers can create a CI/CD pipeline to automate the software development lifecycle workflows.

- It covers a couple of stages:

1. `Source stage`: At this stage, you develop or implement the required features using version control software like Git.
2. `Build Stage`: This step put together the source code with all its dependencies into an artifact (executable format)
3. `Test stage`: At this stage, you integrate automated testing to validate the quality of the code, and detect and fix bugs.
   Various tests can be executed at this stage, once the code passes the tests, it is ready to be deployed.
4. `Deployment`: The final stage is to automatically deploy the app to the staging or production environment.

### Constituent of GitHub Action workflow file

1. Central to GitHub Actions are workflows. You can set up a workflow to be activated when an event occurs in your repository.
2. To run the workflow, the triggers need to be defined. workflow to run when a push happens to the main/other branch, and also when a pull request is opened or changed.
3. Below is an example of a workflow file. We will use this sample to explore the constituent of a workflow flow.

```ts

name: learn-github-actions
on: [push]
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '14'
      - run: npm i
      - run: npm run build
      - run: npm run test

```

`name:`
This represents the name of your workflow. When set, GitHub will display the name of the workflow in the "Actions" tab of your repository.

`on:`
The on will automatically activate the workflow based on the specified events. You can specify single or multiple events to trigger a workflow.

- The syntax is as below:

```ts
on: event; // for a single event
on: [event1, event2]; // for multiple events
```

- For example:

1. on: delete will run a workflow when the delete event occurs in your repository.
2. on: push will run a workflow when you push code to the repository.
3. on: [push, fork] will run a workflow when a push is made to any branch in the repository or when someone forks the repository.

`jobs:`

- jobs are the building blocks of the workflows. It represents a set of executable steps. Each job consists:

1. a name
2. a runner
3. set of step,

- The name should correspond with your objective. In the code snippet below, we define a job named build-test.

```ts
jobs: build - test;
```

`runs-on`
The runs-on represents a runner. A runner is a virtual server hosted by GitHub that runs your workflows when they are triggered by an event. You can set up your job to run on Ubuntu Linux, Microsoft Windows, and macOS virtual machines.

- In this example, the code runs on the latest version of the Ubuntu Linux virtual machine.

```ts
runs-on: ubuntu-latest
```

`steps:`

- The steps: contains all the processes that will run the job. In each step, you can run an action or script. Use the uses and run keyword to specify an action or script to run respectively.

`uses:`

1. Specify the uses keywords when there is an action to run. An action is a custom application for the GitHub Actions platform that performs a complex but frequently repeated task.
2. For instance, uses: actions/checkout@v3 will run version 3 (v3) of the actions/checkout application. This checks out your repository onto the specified runner (virtual machine).
3. Assuming you want to install Node.js on the runner, you will the action: uses: actions/setup-node@v3

`run:`

- The run keyword executes a command on the runner. In the code snippet below, we are running npm i to install dependencies defined in our package.json on the runner.

You can run npm run build and npm run test to build and test the app on the virtual machine.

- run: npm i
- run: npm run build
- run: npm run test

### Complete Example : The workflow for the build is as below:

```ts
name: DevOps-GitHibActions
on: push
jobs:
  # Build Job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3
      - name: Install Node
        uses: actions/setup-node@v3
        with:
          node-version: 18.x
      - name: Install Dependencies
        run: npm install
      - name: Build Project
        run: npm run build
      - name: Upload artifact to enable deployment
        uses: actions/upload-artifact@v3
        with:
          name: production-files
          path: ./dist
```

`Let's examine the stages:`

1. First, we specify the name of the workflow as DevOps-GitHibActions (you can use any name)
2. The on:push event will trigger the workflow whenever we push code to the repository
3. We specify the job to run as build
4. runs-on: the job will run on Ubuntu virtual machine hosted by GitHub
5. steps : This details how to run the job :
   `A.` To begin, we check out the source code on the virtual machine using the actions/checkout@v3
   `B.` Next, we installed Node on the virtual machine using actions/setup-node@v3 , and specify which version of node to install using with: node-version: 18.x
   `C.` We installed our NPM dependencies located in the package.json file on the virtual machine using the command run: npm install
   `D.` We build our artifact using the command run: npm run build
   `E.` Next, we upload the artifact to the runner using the command uses: actions/upload-artifact@v3
   `F.` Finally, we specify the path to the build using path: ./dist ( dist is the default build output location for apps built with Vite)

### The next job is to deploy the app to GitHub pages.

- The workflow is captured below:

```ts
// initial code of build (above put here at top) remains the same, just add the following
 # Deploy Job
  deploy:
    # Add a dependency to the build job
    needs: build
    # Specify runner + deployment step
    runs-on: ubuntu-latest
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v3
        with:
          name: production-files
          path: ./dist
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.CI_CD_TOKEN }}
          publish_dir: ./dist

```

`Let's examine the stages:`

1. deploy: signifies the name of the job
2. Before deploying we will need the build artifacts. This is achieved by adding needs: build
3. Next, we specify the virtual machine to run on using runs-on: ubuntu-latest
4. steps to deploy the app :
   `A.`First, we download the build artifact using uses: actions/download-artifact@v3.
   `B.`We also specify the path to the build using path: ./dist
   `C.`To deploy the app to GitHub pages, we will use peaceiris/actions-gh-pages@v3
   `D.`Now, at the github_token section, we will need the personal access token to enable GitHub pages to deploy our app from the repository. We will indicate the secret name we set up earlier. (My secret was named CI_CD_TOKEN, yours will be different). The format is : github_token: ${{ secrets.YOUR_SECRET_NAME }}
   `E. `Finally, we specify the directory to publish the app using publish_dir: ./dist

- NOW

### Updating the package.json and vite.config.js

- Anytime you push code to your repository, the workflow will run, and the app will be built and deployed. However, if you visit your app on GitHub pages, it will display a blank page.

- To fix this issue, go to your local repository:

1. Add the homepage of the website to the package.json file
2. Add the base URL to the vite.config.js file.

By default, a build is produced assuming your app is hosted at the server root. Because our app is located in a sub-directory of our GitHub domain, we specify the homepage in the package.json file

```ts
Add the snippet below to the package.json file
  "homepage": "https://{YOURNAME}.github.io/ci-cd-testing/"
// You can get the URL from your GitHub pages section
```

Next, locate the vite.config.js file in your local repository. Add the base section to the file

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/ci-cd-testing/", // Add only this section
});
```

# Summary

1. CI is a practice where developers merge all their code changes into a central repository early and often
2. Continuous delivery (CD) is a practice where code changes are automatically built, tested, and released to the production environment. It ensures that software can be released frequently with little resistance.
3. Setting up a CI/CD tool helps the team to focus on writing code and committing to the shared repository.
4. GitHub Actions is a CI/CD tool that handles the automatic building, testing, and deploying of code
5. This can save your team time and reduce the risk of errors in your software.

### ALL CODE TOGETHER

```ts
name: DevOps-GitHibActions
on: push
jobs:
  # Build Job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3
      - name: Install Node
        uses: actions/setup-node@v3
        with:
          node-version: 18.x
      - name: Install Dependencies
        run: npm install
      - name: Build Project
        run: npm run build
      - name: Upload artifact to enable deployment
        uses: actions/upload-artifact@v3
        with:
          name: production-files
          path: ./dist
  # Deploy Job
  deploy:
    # Add a dependency to the build job
    needs: build
    # Specify runner + deployment step
    runs-on: ubuntu-latest
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v3
        with:
          name: production-files
          path: ./dist
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.CI_CD_TOKEN }}
          publish_dir: ./dist
```

# Explain the concept of “staging” and “production” environments ?

Staging and production environments are crucial in CI/CD. `Staging` is a replica of your production environment where you test changes before deploying to production. It helps catch issues early. The `production`environment is where your live app resides and is accessible to users.

### Artifact

- An artifact is a file or collection of files produced during a workflow run. For example, you can use artifacts to save your build and test output after a workflow run has ended. All actions and workflows called within a run have write access to that run's artifacts.

### Issue ChunkLoadError: Loading chunk src_HomePage_HomePage js failed.

`SOLUTION :`

When you use code splitting with React.lazy, sometimes a 'chunk load error loading chunk 4 failed in react' error will occur. If you refresh the page, the error will go away.You don't need to manual refresh if you follow the following steps.

This error does not occur if you use the following code in app.js to import pages

```js
const lazyRetry = function (componentImport) {
  return new Promise((resolve, reject) => {
    const hasRefreshed = JSON.parse(window.sessionStorage.getItem("retry-lazy-refreshed") || "false");

    componentImport()
      .then((component) => {
        window.sessionStorage.setItem("retry-lazy-refreshed", "false");
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          window.sessionStorage.setItem("retry-lazy-refreshed", "true");
          return window.location.reload(); // refresh the page
        }
        reject(error);
      });
  });
};


- import pages as
const YourPage = React.lazy(()=> lazyRetry(() => import('./pages/YourPage')))
```
