import React, { Component } from 'react';
import './App.css';
import PokemonRow from './PokemonRow.js'
import $ from 'jquery';
import Loader from './Loader.js';


var Pokedex = require('pokedex-promise-v2');
var options = {
  protocol: 'https',
  hostName: 'localhost:443',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000 // 5s
}
var P = new Pokedex(options);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      value: "",
      name: "",
      submitted: false,
      numPokemon: 0
    };

    this.searchTypeChangeHandler = this.searchTypeChangeHandler.bind(this);
    this.handleTypeSubmit = this.handleTypeSubmit.bind(this);
    this.searchPokemonChangeHandler = this.searchPokemonChangeHandler.bind(this);
    this.handlePokemonSubmit = this.handlePokemonSubmit.bind(this);

    // const testPokemon = [
    //   {
    //     id: 2,
    //     name: "Charizard",
    //     sprites: {
    //       front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
    //     },
    //     height: 17,
    //     weight: 990,
    //     base_experience: 260
    //   },
    //   {
    //     id: 2,
    //     name: "Charizard",
    //     sprites: {
    //       front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
    //     },
    //     height: 17,
    //     weight: 990,
    //     base_experience: 260
    //   },
    //   {
    //     id: 2,
    //     name: "Charizard",
    //     sprites: {
    //       front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
    //     },
    //     height: 17,
    //     weight: 990,
    //     base_experience: 260
    //   },
    //   {
    //     id: 2,
    //     name: "Charizard",
    //     sprites: {
    //       front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
    //     },
    //     height: 17,
    //     weight: 990,
    //     base_experience: 260
    //   }
    // ];
    //
    // var testRows = [];
    // testPokemon.forEach(pokemon => {
    //   testRows.push(<PokemonRow id={pokemon.id} pokemon={pokemon} />);
    // })
    //
    //
    // this.state = {rows: testRows}
  }


  performSearch(searchTerm) {
    var pokemonRows = [];
    const urlString = "http://pokeapi.salestock.net/api/v2/type/" + searchTerm + "/";
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched Data Succesfully");
        console.log(searchResults);

        const pokemonOfType = searchResults.pokemon;
        this.setState({numPokemon: pokemonOfType.length})

        pokemonOfType.forEach(pokemon => {
          //console.log(pokemon.pokemon.name);
          const pokemonURL = pokemon.pokemon.url;
          $.ajax({
            url: pokemonURL,
            success: (pokemonFromArray) => {
              console.log(pokemonFromArray);
              let lowerCaseName = pokemonFromArray.name;
              let firstLetUpper = lowerCaseName.charAt(0).toUpperCase() + lowerCaseName.substr(1);
              let pokemonObject = <PokemonRow key={pokemonFromArray.id} pokemon={pokemonFromArray} name={firstLetUpper}/>;
              //console.log(pokemonObject);
              pokemonRows.push(pokemonObject);
              console.log("pokemonRows.length: " + pokemonRows.length);
              this.setState({
                rows: pokemonRows
              })
              console.log("this.state.rows.length: " + this.state.rows.length);
            },
            error: (xhr, status, err) => {
              console.error("Failed to fetch individual pokemon data");
              alert("Failed to fetch individual pokemon data");
            }
          })

        })
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
        alert("Failed to fetch data, urlString: " + urlString);
      }
    });
  }

  searchTypeChangeHandler(event) {
    this.setState(
        {
          value: event.target.value,
          submitted: false
        }
      );
    console.log("type: " + event.target.value);
  }

  handleTypeSubmit(event) {
    let emptyArray = [];
    this.setState(
      {
        rows: emptyArray,
        submitted: true
      }
    )
    console.log(this.state.value);
    this.performSearch(this.state.value.toLowerCase());
    event.preventDefault();
  }

  searchPokemonChangeHandler(event) {
    this.setState({name: event.target.value});
    console.log("name: " + event.target.value);
  }


  handlePokemonSubmit(event) {
    console.log(this.state.name);
    P.getPokemonByName(this.state.name) // with Promise
      .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });
    event.preventDefault();
  }

  render() {
    const test = <h1>LOADING</h1>;
    return (
      <div className="App">
        <table className = "titleBar">
          <tb>
            <tr>
              <td>
                <img width="200" src="pokemon.png" alt="Pokemon logo"/>
              </td>
              <td>
                <h1 className="titleText">Pokemon By Type</h1>
              </td>
            </tr>
          </tb>
        </table>

        <form onSubmit={this.handleTypeSubmit}>
          <input type="submit" value="Submit" className="submit" />
          <div className="searchBarTest">
            <input value={this.state.value} onChange={this.searchTypeChangeHandler} className = "searchBarWidth" placeholder="Enter Pokemon Type (EX. fire, water, electric...)" />
          </div>​
          {/*
          <label>
            <input value={this.state.value} onChange={this.searchTypeChangeHandler} className = "searchBar" placeholder="Enter Pokemon Type (EX. fire, water, electric...)" />
          </label>
          */}


        </form>

        {/*
        <form onSubmit={this.handlePokemonSubmit}>
          <label>
            <input value={this.state.name} onChange={this.searchPokemonChangeHandler} className = "searchBar" placeholder="Enter Pokemon Name" />
          </label>
           <input type="submit" value="Submit" />
        </form>
        */}

        {/*<arePokemonLoading rows={this.state.rows} />*/}

        {/*
        {this.state.rows.map(function(row) {
          return row
        })}
        */}
        {
          this.state.rows.length !== 0 &&
          this.state.rows.map(function(row) {
            return row
          })
        }
        {
          this.state.rows.length === 0 && this.state.submitted &&
          <Loader type={this.state.value} length={this.state.numPokemon}/>
        }
        {
          !this.state.submitted &&
          <h1>Types: normal, fighting, flying, poison, ground, rock, bug, ghost, steel, fire, water, grass, electric, psychic, ice, dragon, dark, fairy, unknown, shadow</h1>
        }





      </div>
    );
  }
}

export default App;
