import express from "express";
import path from "path";
import pokemonAPIRouter from "./routes/pokemon.routes";

const app = express();

app.use(express.json());

app.use(express.static(path.resolve("public")));

app.use("/pokemons", pokemonAPIRouter);

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
