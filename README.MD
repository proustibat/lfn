# LFN CHLLNG

## Demo

Follow this link to see it working: [http://lfn.surge.sh/](http://lfn.surge.sh/).

Please, note that the api is not in https, so be sure to open your browser not in http.

The electron part with the watcher is only available on a desktop. Read further to know more information about installation 

## Screenshots

### Watching a directory

<img src="https://user-images.githubusercontent.com/1054387/42737931-993626a8-887b-11e8-9c85-302fa5b10651.gif"/>

### Dropping files

<img src="https://user-images.githubusercontent.com/1054387/42737964-207433b2-887c-11e8-9d7b-92cf01ffa986.gif"/>

## Main libraries used

- [React](https://reactjs.org/) & [Redux](https://redux.js.org/) with [create-react-app](https://github.com/facebook/create-react-app)
- [Redux-thunk](https://github.com/reduxjs/redux-thunk): Thunk middleware for Redux
- [Material-ui](https://material-ui.com/): React components that implement Google's Material Design.
- [React-dropzone](https://react-dropzone.netlify.com/): Simple HTML5-compliant drag'n'drop zone for files built with React.js.
- [Numeral.js](http://numeraljs.com/): A javascript library for formatting and manipulating numbers.
- [Moment.js](https://momentjs.com/): Parse, validate, manipulate, and display dates and times in JavaScript.
- [FHIR (Fast Healthcare Interoperability Resources) API](https://www.hl7.org/fhir/overview.html): FHIR is a platform specification that defines a set of capabilities use across the healthcare process, in all jurisdictions, and in lots of different context
- [Electron](https://electronjs.org/): A tool to build cross platform desktop apps with JavaScript, HTML, and CSS
- [Eslint](https://eslint.org/): The pluggable linting utility for JavaScript and JSX
- [Prettier](https://prettier.io/): Prettier is an opinionated code formatter. 

## Features

This is a small webapp connected to a backend, that will upload a document and give some reporting to the user.

## Installing

Be sure you installed [yarn](https://yarnpkg.com/lang/en/) or [npm](https://www.npmjs.com/).

```
git clone git@github.com:proustibat/lfn.git && cd lfn/app
yarn install
```
## Watching

```
yarn electron-dev
```

This should open your browser and the electron app.

## Building

```
yarn electron
```

This command build the react app in the 'build' directory. You could serve it in an electron app by running `yarn electron`.


## Linting
Both Eslint and Prettier are available. You can run these commands to check your code: 

```
yarn lint:js // eslint
yarn format  // prettier
```

## Testing

```
yarn test
```


----------------------------


**TODO**

- Add tooltip on buttons
- Get server errors to add information for users
- Delete button: check if it's possible to delete from server
- Rerun getServerInfo when retrying to upload works
- Check the upload size limit on the server
- Some TODO's in code!
