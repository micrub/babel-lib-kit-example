# Babel lib kit for Node.js - starter kit

Starter kit using based on `yarn`, `babel-presets-env` and `Webpack`.

# Getting started

1. [ Install `yarn` ](https://yarnpkg.com/en/docs/install)
1. Run `yarn` in repository directory.
2. Edit `package.json` default values like : name and version.
2. Change `README.md`
3. Add and edit content in `src/` and `resources/` directories.
4. Write tests in `test/` directory.

## Run tests

`npm test`

## Creating module build

1. Inspect name and version in `package.json`, edit if necessary.
2. Run `npm run build`
3. Output will be placed in `dist/` directory, which can be published as NPM module.

# Convention

Build can be done using browserify and webpack:

## Webpack

```
npm run build
```

## Browserify

```
npm run browserify-build
```

**TODO** Tune to be equal to webpack build process.

