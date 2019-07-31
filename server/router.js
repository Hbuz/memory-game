const { Router } = require("express");

const router = new Router();

router.get(`/cards/:number`, function(req, res) {
  // const number = req.query.number;
  console.log("param: " + req.params);
  const number = req.params.number;

  console.log("ssssssssssssssssssssssssss   " + number);

  let num;
  let arr = [];
  for (let i = 0; i < number; i++) {
    do {
      num = Math.floor(Math.random() * 100);
      console.log("random: " + num + "     " + arr.includes(num));
    } while (arr.includes(num));

    arr[i] = num;
    console.log("Arrr: " + arr);
  }
  console.log("****************************    " + arr);
  res.json({ cards: arr });
});

module.exports = router;
