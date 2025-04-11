import { first151Pokemon, getFullPokedexNumber } from "../utils";
import { useState } from "react";

export default function SideNav(props) {
  const { selectedPokemon, setSelectedPokemon, handleCloseMenu, showSideMenu } =
    props;

  const [searchValue, setSearchValue] = useState("");
  const filteredPokemon = first151Pokemon.filter((pokemon, pokemonIndex) => {
    //if full pokedex number includes current search value return true
    if (getFullPokedexNumber(pokemonIndex).includes(searchValue)) {
      return true;
    }
    // if pokemon name includes the ucrrent search value return true
    if (pokemon.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    // otherwise exclude it from the list
    return false;
  });

  return (
    <nav className={" " + (!showSideMenu ? "open" : "")}>
      <div className={"header " + (!showSideMenu ? "open" : "")}>
        <button onClick={handleCloseMenu} className="open-nav-button">
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <h1 className="text-gradient">Pokedex</h1>
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        placeholder="Search by number or name"
      />
      {filteredPokemon.map((pokemon, pokemonIndex) => {
        return (
          <button
            key={pokemonIndex}
            className={
              "nav-card" +
              (pokemonIndex === selectedPokemon ? " nav-card-selected" : "")
            }
            onClick={() => {
              setSelectedPokemon(first151Pokemon.indexOf(pokemon));
              handleCloseMenu();
            }}
          >
            <p>{getFullPokedexNumber(first151Pokemon.indexOf(pokemon))}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
}
