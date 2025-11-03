import { Request, Response } from "express";

interface Trainer {
  id: number;
  name: string;
  level: number;
  experience: number;
  pokemons: string[]; 
}

let trainers: Trainer[] = [];
let nextTrainerId = 1;

// --------------------
// GET /trainer
// --------------------
export function getAllTrainers(req: Request, res: Response): void {
  res.status(200).json(trainers);
}

// --------------------
// GET /trainer/:id
// --------------------
export function getTrainerById(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  for (let i = 0; i < trainers.length; i++) {
    const current = trainers[i];
    if (current.id === id) {
      res.status(200).json(current);
      return;
    }
  }

  res.status(404).json({ message: "Trainer not found" });
}

// --------------------
// POST /trainer
// --------------------
export function createTrainer(req: Request, res: Response): void {
  const { name } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    res.status(400).json({ message: "Name is required" });
    return;
  }

  const newTrainer: Trainer = {
    id: nextTrainerId++,
    name: name.trim(),
    level: 1,
    experience: 0,
    pokemons: []
  };

  trainers.push(newTrainer);
  res.status(201).json(newTrainer);
}

// --------------------
// PUT /trainer/:id
// --------------------
export function updateTrainer(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  const { name, level, experience } = req.body;

  for (let i = 0; i < trainers.length; i++) {
    const current = trainers[i];

    if (current.id === id) {
      if (name !== undefined) current.name = name.trim();
      if (level !== undefined) current.level = Number(level);
      if (experience !== undefined) current.experience = Number(experience);
      res.status(200).json(current);
      return;
    }
  }

  res.status(404).json({ message: "Trainer not found" });
}

// --------------------
// DELETE /trainer/:id
// --------------------
export function deleteTrainer(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  for (let i = 0; i < trainers.length; i++) {
    const current = trainers[i];
    if (current.id === id) {
      const removed = trainers.splice(i, 1)[0];
      res.status(200).json({
        message: `${removed.name} deleted successfully`,
        deleted: removed
      });
      return;
    }
  }

  res.status(404).json({ message: "Trainer not found" });
}

// --------------------
// POST /trainer/:id/pokemon
// --------------------
export function addPokemonToTrainer(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const { pokemonName } = req.body;

  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  if (typeof pokemonName !== "string" || pokemonName.trim() === "") {
    res.status(400).json({ message: "Pokemon name required" });
    return;
  }

  for (let i = 0; i < trainers.length; i++) {
    const current = trainers[i];
    if (current.id === id) {
      if (current.pokemons.length >= 6) {
        res.status(400).json({ message: "Trainer already has 6 Pokémon" });
        return;
      }

      current.pokemons.push(pokemonName.trim());
      res.status(200).json(current);
      return;
    }
  }

  res.status(404).json({ message: "Trainer not found" });
}
