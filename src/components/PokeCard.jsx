import { useEffect, useState } from "react";
import {
  first151Pokemon,
  getFullPokedexNumber,
  getPokedexNumber,
} from "../utils";
import TypeCard from "./TypeCard";

export default function PokeCard(props) {
  const { selectedPokemon } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { name, height, abilities, stats, types, moves, sprites } = data || {};

  useEffect(() => {
    // if loading or no access to localStorage, exit logic
    if (loading || !localStorage) {
      return;
    }

    // check if the selected pokemon info in available in cache
    // 1. define the cache
    let cache = {};
    if (localStorage.getItem("pokedex")) {
      cache = JSON.parse(localStorage.getItem("pokedex"));
    }

    // 2. check if the selected pokemon is in cache, else fetch from API
    if (selectedPokemon in cache) {
      // read from cache
      setData(cache[selectedPokemon]);
      return;
    }

    // passed all cache stuff to no avail, must fetch data from API

    async function fetchPokemonData() {
      try {
        // calling and awaiting API response
        setLoading(true);
        const baseUrl = "https://pokeapi.co/api/v2/";
        const suffix = "pokemon/" + getPokedexNumber(selectedPokemon);
        const finalUrl = baseUrl + suffix;
        console.log(finalUrl);
        const response = await fetch(finalUrl);
        const pokemonData = await response.json();
        console.log(pokemonData);
        setData(pokemonData);

        cache[selectedPokemon] = pokemonData;
        localStorage.setItem("pokedex", JSON.stringify(cache));
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();

    // if we fetch from API, make sure to save to cache
  }, [selectedPokemon]);

  if (loading || !data) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="poke-card">
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h2>{name}</h2>
      </div>
      <div className="type-container">
        {types.map((typeObject, typeIndex) => {
          return <TypeCard key={typeIndex} type={typeObject?.type?.name} />;
        })}
      </div>
      <img
        className="default-img"
        src={"/pokemon/" + getFullPokedexNumber(selectedPokemon) + ".png"}
        alt={`${name}-large-img`}
      />
    </div>
  );
}
