# jsBus
[![Build Status](https://travis-ci.org/tafax/js-bus.svg?branch=master)](https://travis-ci.org/tafax/js-bus)
[![Coverage Status](https://coveralls.io/repos/github/tafax/js-bus/badge.svg?branch=master)](https://coveralls.io/github/tafax/js-bus?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/tafax/js-bus/badge.svg?targetFile=package.json)](https://snyk.io/test/github/tafax/js-bus?targetFile=package.json)

This is an experimental library inspired by [MessageBus](https://github.com/SimpleBus/MessageBus) for PHP.

## Motivations

This is just an experimental library to decoupling UI/UX code and the business logic. It is intended to be used with Angular2 projects.
Anyway, it is written in TypeScript and it can be used with any TypeScript application without limitations.

## Install

### NPM
```
npm install js-bus
```

### Yarn
```
yarn add js-bus
```

## Development

We use **NodeJS** and **NVM** to handle the node versions. So, first of all:

* Git clone this repo.
* Install `nvm` if you don't have it already: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash`.
This installs version `v0.32.1`, but any other should be the same.
* Install the version of node we use in the project. In the project root perform `cat .nvmrc` to see this version.
Let's say it is `v6.5.0`. Afterwards, run `nvm install v6.5.0`.
* Install **yarn** dependency manager. `npm install -g yarn`.
* Type `yarn install` to install all dependencies.
* Type `npm run typings install` to install all the standalone typings.
* Good to go!

### Link for development (optional)

If you want to link the library to an existing project before pushing your changes.
You can go to the library root and type:
```
yarn link
```
then in the project root:
```
yarn link js-bus
```
If you want to remove the dependency, just type the same command using `unlink` instead of `link`.

## Contributing

We use conventional commit so install `commitizen`.
```
npm install -g commitizen
```
Afterwards, add the conventional changelog adapter. Go in the library root and type:
```
npm run cz:init
```

You are set! Each time you want to commit something use `git cz` instead of
`git commit` and follow the wizard to create the commit message.
