// Radkevich Pavel
// Домашнее задание к лекции 1.1 «EcmaScript 2015 в Node.js»
// Pokemon.js

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

module.exports = Pokemon;
