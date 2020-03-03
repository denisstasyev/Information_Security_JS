# Information_Security_JS

[![Build Status](https://travis-ci.com/denisstasyev/Information_Security_JS.svg?branch=master)](https://travis-ci.com/denisstasyev/Information_Security_JS)

> Visit out [Information_Security_JS website](https://denisstasyev.github.io/Information_Security_JS/) to see the result.

In this repository you will find the implementation of encryption and decryption (as well as a checksums and much more) by the main most popular methods (created as part of the Information Security course by Vladimirov at MIPT).

**_This repository includes only frontend (client) part of encryption and decryption system._**

You can find the implementation of methods for the backend part in [this repository](https://github.com/GRISHNOV/Information_Security_Web_Service).

## Available Ciphers

> All implemented ciphers can work with Unicode characters.

The following encryption and decryption methods are now available:

- Cesar
- Monoalphabetic
- Polyalphabetic (Vigenère)
- Bigram (Porta's with an additional shift)

More information about encryption and decryption methods are available in [`src/libmethods/encryption` folder](https://github.com/denisstasyev/Information_Security_JS/tree/master/src/libmethods/encryption).

## Available Checksums

The following checksum methods are now available:

- CRC16
- CRC24
- CRC32
- Fletcher16

More information about checksum methods are available in [`src/libmethods/checksum` folder](https://github.com/denisstasyev/Information_Security_JS/tree/master/src/libmethods/checksum).

## Available Scripts

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br />
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run predeploy`

Builds project.

#### `npm run deploy`

Deploys project with GitHub Pages to our [Information_Security_JS website](https://denisstasyev.github.io/Information_Security_JS/).
Also, the project is configured to automatically deploy using Travis CI when push into `master` Git branch is used.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Creators

This project was created by MIPT students: [Denis Stasyev](https://github.com/denisstasyev) and [Mikhail Pakhomov](https://github.com/mikhan333).
