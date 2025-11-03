import { Request, Response } from "express"

interface Pokemon {
  id: number
  name: string
  lifePoints: number
}

// notre mini base de données
let pokemons: Pokemon[] = []
let nextId = 1

// --------------------
// GET /pokemons
// --------------------
export function getAll(req: Request, res: Response): void {
  res.status(200).json(pokemons)
}

// --------------------
// GET /pokemons/:id
// --------------------
export function getById(req: Request, res: Response): void {
  const idStr = req.params.id
  const id = Number(idStr)

  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" })
    return
  }

  for (let i = 0; i < pokemons.length; i++) {
    const current = pokemons[i]
    if (current.id === id) {
      res.status(200).json(current)
      return
    }
  }

  res.status(404).json({ message: "Pokemon not found" })
}

// --------------------
// POST /pokemons
// --------------------
export function create(req: Request, res: Response): void {
  const { name } = req.body

  if (typeof name !== "string" || name.trim() === "") {
    res.status(400).json({ message: "Invalid name" })
    return
  }

  const newPokemon: Pokemon = {
    id: nextId++,
    name: name.trim(),
    lifePoints: 100,
  }

  pokemons.push(newPokemon)
  res.status(201).json(newPokemon)
}

// --------------------
// DELETE /pokemons/:id
// --------------------
export function deletePokemon(req: Request, res: Response) {
  const idStr = req.params.id
  const id = Number(idStr)

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" })
  }

  for (let i = 0; i < pokemons.length; i++) {
    const current = pokemons[i]

    if (current.id === id) {
      const removed = pokemons.splice(i, 1)[0]
      return res.status(200).json({
        message: `${removed.name} has been deleted.`,
        deleted: removed
      })
    }
  }

  return res.status(404).json({ message: "Pokemon not found" })
}


// --------------------
// UPDATE /pokemons/:id
// --------------------
export function update(req: Request, res: Response) {
  const idStr = req.params.id
  const id = Number(idStr)

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" })
  }

  const { name, lifePoints } = req.body

  for (let i = 0; i < pokemons.length; i++) {
    const current = pokemons[i]

    if (current.id === id) {
      if (name !== undefined) {
        current.name = name
      }
      if (lifePoints !== undefined) {
        current.lifePoints = lifePoints
      }

      return res.status(200).json(current)
    }
  }

  return res.status(404).json({ message: "Pokemon not found" })
}
