const express = require(`express`);
const cors = require("cors");
const cardRouter = require(`./router`);

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());

app
  .use(cardRouter)
  .listen(port, () => console.log(`Express API listening on port ${port}`));
