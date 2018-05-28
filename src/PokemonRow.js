import React from 'react'
import './PokemonRow.css';

class PokemonRow extends React.Component {
  render() {
    return (
      <div>
        {/*
        <table key={this.props.pokemon.id}>
          <tbody className = "rowTitle">
            <h2 >{this.props.pokemon.name}</h2>
            <tr>
              <td>
                <img alt="pokemon_image" width="120" src={this.props.pokemon.sprites.front_default} />
              </td>
              <td>
                <h3>Stats</h3>
                <p>Height: {this.props.pokemon.height} ft</p>
                <p>Weight: {this.props.pokemon.weight} lbs</p>
                <p>Base Experience: {this.props.pokemon.base_experience} XP</p>
              </td>
            </tr>
          </tbody>
        </table>
        */}

        <div className="promos">
          {/*
          <div className="promo">
            <div className="deal">
              <span>Premium</span>
              <span>This is really a good deal!</span>
            </div>
            <span className="price">$79</span>
            <ul className="features">
              <li>Some great feature</li>
              <li>Another super feature</li>
              <li>And more...</li>
            </ul>
            <button>Sign up</button>
          </div>
          */}
          <div className="promo scale">
            <div className="deal">
              <img className="myImage" alt="pokemon_image" width="120" src={this.props.pokemon.sprites.front_default} />
            </div>
            <span className="price">{this.props.name}</span>
            <ul className="features">
              <li>Height: {this.props.pokemon.height} ft</li>
              <li>Weight: {this.props.pokemon.weight} lbs</li>
              <li>Base Experience: {this.props.pokemon.base_experience} XP</li>
            </ul>
            {/*<button>Sign up</button>*/}
          </div>
          {/*
          <div className="promo">
            <div className="deal">
              <span>Basic</span>
              <span>Basic membership</span>
            </div>
            <span className="price">$69</span>
            <ul className="features">
              <li>Choose the one on the left</li>
              <li>We need moneyy</li>
              <li>And more...</li>
            </ul>
            <button>Sign up</button>
          </div>
          */}

        </div>
      </div>


    );

  }
}

export default PokemonRow;
