// Radkevich Pavel
// Äîìàøíåå çàäàíèå ê ëåêöèè 1.1 «EcmaScript 2015 â Node.js»
// PokemonList.js

"use strict";

const Pokemon = require('./Pokemon');

class PokemonList extends Array {
  constructor(...args) {
    super(...args.filter(arg => 
        arg instanceof Pokemon
    ));
  }

  add(name, level) {
    this.push(new Pokemon(name, level));
  }
    
  addPokemon(pokemon) {
    this.push(pokemon);
  }

  show() {
    console.log('Count of pokemons in this list: ' + this.length);
    this.forEach(pokemon => pokemon.show());
  }

  max() {
    let maxlevel = Math.max(...this);
    return this.find(pokemon => pokemon.level === maxlevel);
  }

  removeByName(name) {
    let index = this.findIndex(pokemon => pokemon.name === name);
    if (index === -1) {
      return null;
    }

    return this.splice(index, 1).pop();
  }
}

module.exports = PokemonList;
