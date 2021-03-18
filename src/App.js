import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Navigation from "./components/navigation"
import Logo from "./components/logo"
import Footer from "./components/footer"
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


function App() {
  const [backgroundImage, setBackgroundImage] = useState("https://source.unsplash.com/collection/365/1100x600/?");
  const [quotes, setQuotes] = useState([defaultQuote]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState([]);


  const filter = function (e) {
    setFilteredQuotes(quotes.filter(quote => quote.text.includes(e.target.dataset.keyword)));
  };

  const fetchQuotes = async () => {
    const response = await axios.get("https://type.fit/api/quotes");
    setQuotes(response.data);
  };

  useEffect(() => {
    fetchQuotes();
    generateRandomItem();
    changeBackgroundImage();
  },[filteredQuotes]); 


  const changeBackgroundImage = async () => {
    const numImagesAvailable = 121;
    let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);

    const response = await axios.get(
      `https://source.unsplash.com/collection/365/1100x600/?sig=${randomImageIndex}`
    );

    setBackgroundImage(response.config.url);
  };

  
  const generateRandomItem = function() {
    let result =
    filteredQuotes.length > 0
      ? filteredQuotes
      : quotes;
    let random = Math.floor(Math.random() * result.length);
    setRandomQuote(result[random]);
  }


    return (
      <div id="content-wrapper">
        <header id="header">
          <Logo />
          <Navigation onClick={e => filter(e)} />
        </header>
        <main>
          <div
            id="quote-box"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div id="text-box">
              <FontAwesomeIcon icon={faQuoteLeft} />
              <span id="text">{randomQuote.text}</span>
            </div>
            <p id="author">
              -<span id="author-name">{randomQuote.author}</span>
            </p>
            <div id="buttons">
              <div id="icons">
                <a
                  href={"https://twitter.com/intent/tweet?hashtags=motivation&text="+randomQuote.text + " -" + randomQuote.author}
                  id="tweet-quote"
                  title="Tweet this quote!"
                  target="_top"
                >
                  <FontAwesomeIcon icon={faTwitterSquare} style={iconStyle} />
                </a>
                <a
                  href={"https://www.linkedin.com/shareArticle?mini=true&url=https://d-antonelli.github.io/random-quote/"}
                  id="linkedin-quote"
                  target="_blank"
                  title="Share this website!"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} style={iconStyle} />
                </a>
              </div>
              <button id="new-quote" onClick={() => {
                changeBackgroundImage();
                generateRandomItem();}}>
                new quote
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  
}

export default App;
