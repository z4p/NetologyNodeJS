"use strict";

const Pokemon = require('./Pokemon');
const PokemonList = require('./PokemonList');

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
  2.71828459045,
  "hello world",
  null,
];

const lost = new PokemonList(...pokemons.slice(0, 8));
const found = new PokemonList(...pokemons.slice(8, 13));

let someFound = lost.removeByName('Chaos Defiler');
found.addPokemon(someFound);


console.log('---Lost PokemonList---');
lost.show();

console.log('---Found PokemonList---');
found.show();

console.log('---Found max level Pokemon---');
found.max().show();
