import React from 'react';

import './search.css';

function Search() {
  return (
    // <form onSubmit={this.onSubmit}>
    <form>
        <input
          type="Text"
          className="input"
          placeholder="Type to search"
          // onChange={(e) => this.onLabelChange(e)}
          // value={this.state.label}
        />
      </form>
  );
}

export default Search;