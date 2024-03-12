// News.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './News.css'; // Make sure to create and import News.css

const News = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiKey = 'b43bedb60d304631a24f7a80e4a0bb9c'; // Replace with your actual News API key
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    axios.get(apiUrl)
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        setError('Unable to load news at the moment. Please try again later.');
        console.error('Error fetching data: ', error);
      });
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="news-grid-container">
      {articles.length > 0 ? (
        articles.slice(0, 100).map((article, index) => (
          <div className="news-card" key={index}>
            <img src={article.urlToImage} alt={article.title} className="news-image"/>
            <div className="news-text-content">
              <div className="news-source">{article.source.name}</div>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-title">
                {article.title}
              </a>
              <div className="news-info">
                <div className="news-description">{article.description || 'No description available.'}</div>
                <div className="news-date">{new Date(article.publishedAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
};

export default News;
