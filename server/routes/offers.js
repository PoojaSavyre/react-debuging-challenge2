const { getOffers } = require('../data/offers');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.json(getOffers());
});

module.exports = router;
