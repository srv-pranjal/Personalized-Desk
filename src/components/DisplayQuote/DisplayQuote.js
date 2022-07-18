import axios from "axios";
import { useState, useEffect } from "react";
import "./DisplayQuote.css";

export const DisplayQuote = () => {
  const [quote, setQuote] = useState({
    text: "",
    author: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("https://type.fit/api/quotes");
        setQuote(res.data[Math.floor(Math.random() * res.data.length)]);
      } catch (error) {
        setQuote({
          text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
          author: "Thomas Edison",
        });
      }
    })();
  },[]);
  return (
    <div className="quote">
      <q className="quote__text">{quote.text}</q>
      <p className="quote__author">{quote.author ?? "Unknown"}</p>
    </div>
  );
};
