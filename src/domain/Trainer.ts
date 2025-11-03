import Pokemon from "./Pokemon"

export default class Trainer {
    private name: string
    private level: number
    private experience: number
    private pokemons: Pokemon[]

    constructor (name: string){
        this.name = name
        this.level = 1
        this.experience = 0
        this.pokemons = []
    }
    addPokemon(pokemon: Pokemon): void {
        if (this.pokemons.length >= 6){
            console.log(`${this.name} ne peut plus prendre de Pokemon.`)
            return   
        }

        for (let i = 0; i < this.pokemons.length; i++){
            if (this.pokemons[i].getName() === pokemon.getName()){
                console.log(`${this.name} a deja ce ${pokemon.getName}`)
                return
            }
        }
        this.pokemons.push(pokemon)
        console.log(`${this.name} ajoute ${pokemon.getName()} à son équipe.`)
    }

    healAll(): void {
        if (this.pokemons.length === 0) {
            console.log(`${this.name} n’a aucun Pokémon à soigner.`)
            return
        }
        for (let i = 0; i < this.pokemons.length; i++){
            this.pokemons[i].heal()
        }
        console.log(`${this.name} a soigné tous ses Pokémon.`);
    }

    gainExperience(exp: number): void {
        if (this.pokemons.length === 0){
            console.log(`${this.name} n’a aucun Pokémon pour gagner de l’expérience.`)
            return
        }

        this.experience += exp

        if (this.experience >= 10){
            this.level ++
            this.experience = 0
            console.log(`${this.name} passe au niveau ${this.level}`)
        } else {
            console.log(`${this.name} a maintenant ${this.experience} XP.`)
        }

    }

fightRandom(opponent: Trainer): void {
  this.healAll();
  opponent.healAll();

  const randomIndex = Math.floor(Math.random() * this.pokemons.length);
  const myPokemon = this.pokemons[randomIndex];

  const opponentIndex = Math.floor(Math.random() * opponent.pokemons.length);
  const theirPokemon = opponent.pokemons[opponentIndex];

  console.log(`${this.name} a choisi ${myPokemon.getName()}!`);
  console.log(`${opponent.getName()} a choisi ${theirPokemon.getName()}!`);
  console.log("⚔️ Le combat commence !");

  // boucle de combat
  while (myPokemon.getLifePoints() > 0 && theirPokemon.getLifePoints() > 0) {
    const myAttack = myPokemon.randomAttack();
    const oppAttack = theirPokemon.randomAttack();

    if (!myAttack && !oppAttack) {
      console.log("Aucun des deux Pokémon n’a d’attaques disponibles. Match nul !");
      return;
    }

    if (myAttack) {
      myPokemon.attack(theirPokemon);
      if (theirPokemon.getLifePoints() <= 0) {
        console.log(`${theirPokemon.getName()} est K.O.!`);
        console.log(`${this.name} remporte la victoire !`);
        this.gainExperience(10);
        return;
      }
    }

    if (oppAttack) {
      theirPokemon.attack(myPokemon);
      if (myPokemon.getLifePoints() <= 0) {
        console.log(`${myPokemon.getName()} est K.O.!`);
        console.log(`${opponent.getName()} remporte la victoire !`);
        opponent.gainExperience(10);
        return;
      }
    }
  }
}


    getName() {return this.name}

}
