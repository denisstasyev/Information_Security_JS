<p align="center">
  <img alt="Information_Security_JS logo" src="src/assets/logo.png" width="100px" />
  <h1 align="center">Information_Security_JS</h1>
</p>

[![Build Status](https://travis-ci.com/denisstasyev/Information_Security_JS.svg?branch=master)](https://travis-ci.com/denisstasyev/Information_Security_JS)

> Visit out [Information_Security_JS website](https://denisstasyev.github.io/Information_Security_JS/) to see the result.

In this repository you will find the implementation of encryption and decryption (as well as a checksums and much more) by the main most popular methods (created as part of the Information Security course by Vladimirov at MIPT).

**_This repository includes only frontend (client) part of encryption and decryption system._**

You can find the implementation of methods for the backend part in [this repository](https://github.com/GRISHNOV/Information_Security_Web_Service).

## Ciphers

> All implemented ciphers can work with Unicode characters.

The following encryption and decryption methods are now available:

- Basic methods

  - Cesar
  - Monoalphabetic
  - Polyalphabetic (Vigenère)
  - Bigram (Porta's with an additional shift)

- Block methods
  - AES
  - ~~GOST~~

More information about encryption and decryption methods are available in [`src/libmethods/encryption` folder](https://github.com/denisstasyev/Information_Security_JS/tree/master/src/libmethods/encryption).

## Checksums

The following checksum methods are now available:

- CRC-16
- CRC-24
- CRC-32
- Fletcher-16

More information about checksum methods are available in [`src/libmethods/checksum` folder](https://github.com/denisstasyev/Information_Security_JS/tree/master/src/libmethods/checksum).

## Hash functions

The following hash functions are now available:

- SHA-256
- SHA-512
- SHA-3

More information about checksum methods are available in [`src/libmethods/hashing` folder](https://github.com/denisstasyev/Information_Security_JS/tree/master/src/libmethods/hashing).

## Scripts

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder. The build is minified and the filenames include the hashes.

#### `npm run predeploy`

Builds project.

#### `npm run deploy`

Deploys project with GitHub Pages to our [Information_Security_JS website](https://denisstasyev.github.io/Information_Security_JS/).
Also, the project is configured to automatically deploy using Travis CI when push into `master` Git branch is used.

#### `npm run eject`

This command will remove the single build dependency from your project, but _this is a one-way operation_.

#### `npm run storybook`

Runs local [Storybook](https://storybook.js.org/) server with all available components.

#### `npm run build-storybook`

Builds [Storybook](https://storybook.js.org/) project with all available components.

## Creators

This project was created by MIPT students: [Denis Stasyev](https://github.com/denisstasyev) and [Mikhail Pakhomov](https://github.com/mikhan333).
