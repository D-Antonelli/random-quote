import React from 'react';

const Navigation = (props) => {
    return (
      <nav>
        <button data-keyword="love" onClick={props.onClick} className="nav-btn">
          #love
        </button>
        <button
          data-keyword="happiness"
          onClick={props.onClick}
          className="nav-btn"
        >
          #happiness
        </button>
        <button data-keyword="life" onClick={props.onClick} className="nav-btn">
          #life
        </button>
        <button
          data-keyword="success"
          onClick={props.onClick}
          className="nav-btn"
        >
          #success
        </button>
        <button data-keyword="wisdom" onClick={props.onClick} className="nav-btn">
          #wisdom
        </button>
        <button
          data-keyword="kindness"
          onClick={props.onClick}
          className="nav-btn"
        >
          #kindness
        </button>
      </nav>
    );
  };

  export default Navigation;