// Radkevich Pavel
// Домашнее задание к лекции 1.1 «EcmaScript 2015 в Node.js»

"use strict";

class Pokemon {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }

  show() {
    console.log(`"${this.name}", ${this.level} lvl`);
  }

  valueOf() {
    return this.level;
  }
}

class PokemonList extends Array {
  add(name, level) {
    this.push(new Pokemon(name, level));
  }

  show() {
    console.log('Count of pokemons in this list: ' + this.length);
    this.forEach(pokemon => pokemon.show());
  }

  max() {
    let max_pokemon = -1;
    this.forEach(curr_pokemon => {
      if (max_pokemon < curr_pokemon) {
        max_pokemon = curr_pokemon;
      }
    });

    return max_pokemon;
  }

  removeByName(name) {
    let index = this.findIndex(pokemon => pokemon.name === name);
    if (index === -1) {
      return null;
    }

    return this.splice(index, 1).pop();
  }
}

const pokemons = [
  new Pokemon('Chaos Space Marine', 21),
  new Pokemon('Bloodletter', 13),
  new Pokemon('Horror of Tzeentch', 2),
  new Pokemon('Chaos Defiler', 65),
  new Pokemon('Hellbrut', 32),
  new Pokemon('Ahzek Ahriman', 48),
  new Pokemon('Plague Lord of Nurgle', 16),
  new Pokemon('Aspiring Sorcerer', 39),
  new Pokemon('Chaos Cultist', 10),
  new Pokemon('Herald of Slaanesh', 69),
];

const lost = new PokemonList(...pokemons.slice(0, 8));
const found = new PokemonList(...pokemons.slice(8, 10));

let someFound = lost.removeByName('Chaos Defiler');
found.add(someFound.name, someFound.level);

console.log('---Lost PokemonList---');
lost.show();
console.log('---Found PokemonList---');
found.show();

console.log('---Found max level Pokemon---');
found.max().show();
