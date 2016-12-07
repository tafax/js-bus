# jsBus

This is an experimental library inspired by [MessageBus](https://github.com/SimpleBus/MessageBus) for PHP.

## Motivations

In the client side, in many enterprise situations, decoupling the UI/UX from the business logic is hard to accomplish. 
We usually move a lot of code in the controllers, we inject a lot of services and we create *evil smart controllers*.
Someone add business logic in these controllers and nobody often tests it since the controllers are very hard to test
as unit. Anyway, just the integrations test are not enough to grant maintainability of what you're building.
When you want to refactor your code to update the UI/UX, if you coded fast to sell fast :), 
you likely will need to add complexity and you'll trigger the breaking point of your app very soon. 
Boom! Everything can't be maintained anymore.
This library can help you to organize your code, decoupling what happens in the UI layer with what you need to do
with your data behind the hood.

## Install

### Internal (to remove if published)
After followed the steps to development. Go to the project root.
```
yarn link
```
then in the project root
```
yarn link js-bus
```
If you want to remove the dependency, just type the same command using `unlink` instead of `link`.

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
