import Attack from "./Attack";
import Pokemon from "./Pokemon";
import Trainer from "./Trainer";


const tackle = new Attack("Tackle", 10, 5);
const ember = new Attack("Ember", 8, 5);

const pikachu = new Pokemon("Pikachu");
const charmander = new Pokemon("Charmander");

pikachu.learn(tackle);
charmander.learn(ember);

const ash = new Trainer("Ash");
const misty = new Trainer("Misty");

ash.addPokemon(pikachu);
misty.addPokemon(charmander);

ash.fightRandom(misty);
