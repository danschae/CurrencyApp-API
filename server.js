require('dotenv').config();
const PORT = process.env.PORT || 8001;
const bodyParser = require('body-parser');
const app = require('express')();

const db = require('./lib/pool.js');
const dbHelpers = require('./db/dbHelpers.js')(db);

app.use(bodyParser.json());

const apiUsers = require("./routes/apiUsers");
app.use("/api/users", apiUsers(dbHelpers));

const apiNews = require("./routes/apiNews");
app.use("/api/news", apiNews(dbHelpers));

app.listen(PORT, () => {
  console.log('listening on ', PORT);
});


