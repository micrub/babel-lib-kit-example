# Babel compiler based Javascript application starter kit, with build process for Node.js and browser environments.

![Travis `develop` branch build](https://travis-ci.org/micrub/babel-lib-kit.svg?branch=develop "Travis `develop` branch build")

Starter kit using based on `yarn`, `babel-presets-env`, `webpack` and `browserify`.

# Getting started

1. [ Install `yarn` ](https://yarnpkg.com/en/docs/install)
1. Run `yarn` in repository directory.
2. Edit `package.json` default values like : name and version.
2. Change `README.md`.
3. Add and edit content in `src/` and `resources/` directories.
4. Write tests in `test/` directory.

## Run tests

`npm test`

## Creating module build

1. Inspect name and version in `package.json`, edit if necessary.
2. Run `npm run build`
3. Output will be placed in `dist/` directory, which can be published as NPM module.

# Build options

Build can be done using `browserify` or `webpack`:

## Webpack

```
npm run build
```

## Browserify

```
npm run browserify-build
```

**TODO** Tune to be equal to webpack build process.

