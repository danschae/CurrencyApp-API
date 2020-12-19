require('dotenv').config();
const router = require('express').Router();
const NewsAPI = require('newsapi');
console.log(process.env.DB_HOST)

const today = new Date()
const yesterday = new Date(today)
const lastWeek = new Date(today)

yesterday.setDate(yesterday.getDate() - 1)
lastWeek.setDate(lastWeek.setDate() - 7)

const now = today.toDateString()
const previousDay = yesterday.toDateString();
const previousWeek = lastWeek.toDateString();


const newsapi = new NewsAPI(`b2e12bf8b8c042418009597a5371cfa2`);

const showNews = newsapi.v2.everything({
    q: 'finance' || 'obama',
    sources: ['bbc-news', 'techcrunch'],
    domains: 'bbc.co.uk, techcrunch.com',
    from: previousWeek,
    to: now,
    language: 'en',
    sortBy: 'relevancy',
    page: 2
  }).then(response => {
      console.log(response.totalResults);
  })
    .catch(err => console.log(err));

console.log(showNews)