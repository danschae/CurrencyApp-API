require('dotenv').config();
const router = require('express').Router();
const NewsAPI = require('newsapi');

// dates to choose from
const today = new Date()
const yesterday = new Date()
const lastWeek = new Date(today)
const lastMonth = new Date()

yesterday.setDate(yesterday.getDate() - 1)
lastWeek.setDate(lastWeek.getDate() - 7)
lastMonth.setDate(lastMonth.getDate() - 30)

const now = today.toDateString()
const previousDay = yesterday.toDateString();
const previousWeek = lastWeek.toDateString();
const previousMonth = lastMonth.toDateString();

const selectTime = (time) => {
  switch(time) {
    case 'day':
      return previousDay;
    case 'week':
      return previousWeek;
    case 'month':
      return previousMonth;
  }
};

const newsapi = new NewsAPI(`b2e12bf8b8c042418009597a5371cfa2`);

const showNews = (time) => { newsapi.v2.everything({
    q: 'finance' || 'obama',
    sources: ['bbc-news', 'techcrunch'],
    domains: 'bbc.co.uk, techcrunch.com',
    from: selectTime(time),
    to: now,
    language: 'en',
    sortBy: 'relevancy',
    page: 1
  }).then(response => {
    console.log(response.articles)
      return response.articles
  })
    .catch(err => console.log(err));
}
showNews('day')
module.exports = (dbHelpers) => {

  router.post("/articles", (req, res) => {
    showNews(req.body.time)
      .then(newsData => res.json(newsData))
      .catch(err => console.log(err))
  });
  return router
}
