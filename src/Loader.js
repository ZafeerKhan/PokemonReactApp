import React from 'react';

const Loader = props => (
  <div>
    <img
      className = "loading"
      alt = "Loader Icon"
      src = "loading.gif" />
      <h1>Loading {props.length} {props.type} Pokemon</h1>
  </div>

);

export default Loader;
