## Class N° 2
Review previous class concepts.
MVC
Schema model
Router

Install tig
1. brew install tig, how to use it.
2. Unit test
3. validations

### Tig
instalation
```
    brew install tig
```
* how to use it?
* what is tig used for?
  
## Unit test

### Instalation:
```
    npm install --save-dev jest supertest
```
### Configuration:
1. add the following lines to your package.json

```
    "scripts": {
        "start": "node app.js",
        "test": "jest"
    },
```
2. export yor app.js to be able to call it from test file
```
    module.exports = app; // add this line at the end of your app.js file
```
3. Create a test directory in the project root


Jest expects
https://jestjs.io/docs/expect

Mongoose validations
https://mongoosejs.com/docs/2.7.x/docs/model-definition.html

Joi validations:
https://joi.dev/api/?v=17.12.3

Test:
npm install --save-dev jest supertest
Use the supertest module to test Express routes/controllers.