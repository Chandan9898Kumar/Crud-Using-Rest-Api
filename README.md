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
