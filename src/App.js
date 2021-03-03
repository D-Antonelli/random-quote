import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const quoteUrl = "https://type.fit/api/quotes";
const  defaultQuote = {
    text:
      "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible",
    author: "Francis of Assisi",
  };
const imageUrl = "https://source.unsplash.com/1600x900/?nature,yoga,meditation,wisdom";

class App extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: imageUrl,
      items: [defaultQuote],
      random: 0,
    };
    this.changeQuote = this.changeQuote.bind(this);
  }

  componentDidMount() {
    this.changeQuote();
  }


  changeQuote = async () => {
    const response = await axios.get(quoteUrl);

    this.setState({
      items: response.data,
      random: Math.floor(Math.random() * response.data.length)
    });
  };


  render() {
    const items = this.state.items,
      random = this.state.random;
    return (
      <div id="content-wrapper">
        <div id="quote-box" style={{ backgroundImage: `url(${this.state.backgroundImage})` }}>
          <div id="text-box">
            <FontAwesomeIcon icon={faQuoteLeft} />
            <span id="text">{items[random].text}</span>
          </div>
          <p id="author">
            -<span id="author-name">{items[random].author}</span>
          </p>
          <div id="buttons">
            <a href="twitter.com/intent/tweet" id="tweet-quote" target="_blank">
              <FontAwesomeIcon
                icon={faTwitterSquare}
                style={{ color: "black", fontSize: "1.4em" }}
              />
            </a>
            <button id="new-quote" onClick={this.changeQuote}>
              new quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
