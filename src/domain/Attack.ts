export default class Attack {
  private name: string
  private damage: number
  private usageLimit: number
  private usageCount: number

  constructor(name: string, damage: number, usageLimit: number) {
    this.name = name

    if (damage < 0){
        this.damage = 0 
    } else {
        this.damage = damage
    }

    if (usageLimit < 1 ){
        this.usageLimit = 1
    } else {
        this.usageLimit = usageLimit
    }

    this.usageCount = 0
  }

  canUse(): boolean {
    return this.usageCount < this.usageLimit
  }

  use(): void {
    if (!this.canUse()) {
      throw new Error("usage limit reached")
    }
    this.usageCount += 1
  }

  reset(): void {
    this.usageCount = 0
  }

  info(): string {
    return `${this.name} — dmg:${this.damage} uses:${this.usageCount}/${this.usageLimit}`
  }

  getName() {return this.name}
  getDamage() {return this.damage}
  getUsageCount() {return this.usageCount}
  getUsageLimit() {return this.usageLimit}
}
