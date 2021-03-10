import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitterSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const defaultQuote = {
  text:
    "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible",
  author: "Francis of Assisi",
};

const iconStyle = {
  color: "white",
  fontSize: "3vw",
};

const Logo = () => {
  return (
    <div id="logo">
        <span id="logo-capital">I</span>nspired | your random inspiration
    </div>
  );
};

const Footer = () => {
  return (
    <footer>
      <p>
        Made with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by Derya A.
      </p>
    </footer>
  );
};

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

class App extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: "https://source.unsplash.com/collection/365/1100x600/?",
      items: [defaultQuote],
      filteredItems: [],
    };
    this.changeBackgroundImage = this.changeBackgroundImage.bind(this);
  }

  filter = function (e) {
    this.setState((prevState, props) => {
      return {
        filteredItems: prevState.items.filter((item) =>
          item.text.includes(e.target.dataset.keyword)
        ),
      };
    });
  };

  fetchQuotes = async () => {
    const response = await axios.get("https://type.fit/api/quotes");
    this.setState({
      items: response.data,
    });
  };

  componentDidMount() {
    this.fetchQuotes();
  }

  changeBackgroundImage = async () => {
    const numImagesAvailable = 121;
    let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);

    const response = await axios.get(
      `https://source.unsplash.com/collection/365/1100x600/?sig=${randomImageIndex}`
    );

    this.setState({
      backgroundImage: response.config.url,
    });
  };

  render() {
    let items =
      this.state.filteredItems.length > 0
        ? this.state.filteredItems
        : this.state.items;
    let random = Math.floor(Math.random() * items.length);
    let randomQuote = items[random].text;
    let randomAuthor = items[random].author;
    let tweet = "https://twitter.com/intent/tweet?hashtags=motivation&text="+randomQuote + " -" + randomAuthor;
    let linkedin = "https://www.linkedin.com/shareArticle?mini=true&url=https://d-antonelli.github.io/random-quote/";

    return (
      <div id="content-wrapper">
        <header id="header">
          <Logo />
          <Navigation onClick={(e) => this.filter(e)} />
        </header>
        <main>
          <div
            id="quote-box"
            style={{ backgroundImage: `url(${this.state.backgroundImage})` }}
          >
            <div id="text-box">
              <FontAwesomeIcon icon={faQuoteLeft} />
              <span id="text">{randomQuote}</span>
            </div>
            <p id="author">
              -<span id="author-name">{randomAuthor}</span>
            </p>
            <div id="buttons">
              <div id="icons">
                <a
                  href={tweet}
                  id="tweet-quote"
                  title="Tweet this quote!"
                  target="_top"
                >
                  <FontAwesomeIcon icon={faTwitterSquare} style={iconStyle} />
                </a>
                <a
                  href={linkedin}
                  id="linkedin-quote"
                  target="_blank"
                  title="Share this website!"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} style={iconStyle} />
                </a>
              </div>
              <button id="new-quote" onClick={this.changeBackgroundImage}>
                new quote
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
