// npm install nodemon --save-dev // it is automatically restarts npm when we change code
// Development dependencies are intended as development-only packages, that are unneeded in production
// I've updated the scrips line in package.json to

//npm run start
// npm start is enough to trigger nodemon

// in package.json "nodemon": "^2.0.16", ^ symbol means we accept all of the updates from the package
// "~2.0.16",  ~ symbol means we accept the minor updates such as 2.0.18, not 2.1.3
// "*2.0.16",  * symbol means accept all updates immediately
// node outdated
// ctrl + c to exit current batch
// npm i express - npm uninstall express
// npm install - download dependencies

// TODO
// FIXME

let slugify = require('slugify');

console.log(slugify('Hello world!',{
    replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: false,      // convert to lower case, defaults to `false`
    strict: false,     // strip special characters except replacement, defaults to `false`
    locale: 'vi',       // language code of the locale to use
    trim: true         // trim leading and trailing replacement chars, defaults to `true`
}))
