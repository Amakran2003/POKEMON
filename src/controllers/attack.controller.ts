import { Request, Response } from "express"

interface AttackData {
    id: number
    name: string
    damage: number
    usageLimit: number
}

let attacks: AttackData[] = []
let nextAttackId = 1

// --------------------
// GET /attack/:id
// --------------------
export function getAllAttacks(_req: Request, res: Response): void {
    res.status(200).json(attacks)
}

// --------------------
// POST /attack
// --------------------
export function createAttack(req: Request, res: Response): void {
    const { name, damage, usageLimit } = req.body

    if (!name || typeof name !== "string") {
        res.status(400).json({ message: "Nom de l'attaque requis" })
        return
    }

    const newAttack: AttackData = {
        id: nextAttackId++,
        name,
        damage: Number(damage) || 0,
        usageLimit: Number(usageLimit) || 1
    }

    attacks.push(newAttack)
    res.status(201).json(newAttack)
}

// --------------------
// DELETE /attack/:id
// --------------------
export function deleteAttack(req: Request, res: Response): void {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) {
        res.status(400).json({ message: "Identifiant invalide" })
        return
    }

    for (let i = 0; i < attacks.length; i++) {
        const current = attacks[i]
        if (current.id === id) {
            const removed = attacks.splice(i, 1)[0]
            res.status(200).json({ message: `Attaque ${removed.name} supprimée`, removed })
            return
        }
    }

    res.status(404).json({ message: "Attaque introuvable" })
}
