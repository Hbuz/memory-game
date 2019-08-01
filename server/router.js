const { Router } = require("express");

const router = new Router();

router.get(`/cards`, function(req, res) {
  const number = req.query.number;

  let num;
  let arr = [];
  for (let i = 0; i < number; i++) {
    do {
      num = Math.floor(Math.random() * 100);
    } while (arr.includes(num));

    arr[i] = num;
  }
  res.json({ cards: arr });
});

module.exports = router;
