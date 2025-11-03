import Attack from "./Attack"

export default class Pokemon {

private name: string
private lifePoints: number
private attacks: Attack[]


  constructor(name: string) {
    this.name = name
    this.lifePoints = 100   // valeur par défaut simple
    this.attacks = []      // pas d’attaques au début
  }

  learn(attack: Attack): void {
    if (this.attacks.length >= 4){
       console.log(`${this.name} ne peut pas apprendre plus d'attaques.`)
       return 
    }

    for (let i = 0; i < this.attacks.length ;i++) {
        if (this.attacks[i].getName() === attack.getName()) {
        console.log(`${this.name} connaît déjà ${attack.getName()}.`)
        return
        } 
    }
    this.attacks.push(attack)
  }

  receiveDamage(amount: number): void {
    this.lifePoints = this.lifePoints - amount

    if (this.lifePoints < 0){
        this.lifePoints = 0
    } 
    console.log(`${this.name} perd ${amount} PV, il reste ${this.lifePoints}.`)
    console.log(``)

  }

  heal(): void {
    this.lifePoints = 100
    for (let i = 0; i < this.attacks.length ;i++){
        this.attacks[i].reset()
    }
  }

  randomAttack(): Attack | null { 
    const usableAttacks: Attack [] = []
    for (let i = 0; i < this.attacks.length ;i++){

        if (this.attacks[i].canUse() === true){
            usableAttacks.push(this.attacks[i])
        } 
    }

    if (usableAttacks.length === 0){
        return null 
    } 

    const randomIndex = Math.floor(Math.random() * usableAttacks.length)
    return usableAttacks[randomIndex]  

  } 

  attack(target: Pokemon): void {
    const attack = this.randomAttack()

    if (!attack){
      console.log(`${this.name} n'a plus d'attaques!`)
      return
    }
    attack.use()
    target.receiveDamage(attack.getDamage())
    console.log(`${this.name} utilises ${attack.getName()} sur ${target.getName()} pour ${attack.getDamage()} dommages!`);
    
    if (target.getLifePoints() === 0) {
      console.log(`${target.getName()} est mort!`);
    }    

  }
  getName() {return this.name}
  getLifePoints() {return this.lifePoints}
}
