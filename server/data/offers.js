const OFFERS = [
  {
    id: 1,
    title: 'First booking discount',
    description: 'Get 10% off your first flight when you book with SkyBook. Apply at checkout.',
    code: 'SKY10',
    valid: 'Valid for new users only.',
  },
  {
    id: 2,
    title: 'Weekend getaway',
    description: 'Special fares on select weekend routes. Delhi–Mumbai, Bangalore–Goa, and more.',
    code: null,
    valid: 'Fri–Sun travel. Subject to availability.',
  },
  {
    id: 3,
    title: 'No hidden fees',
    description: 'We show the full price upfront. No surprise charges at checkout.',
    code: null,
    valid: 'Always.',
  },
];

function getOffers() {
  return OFFERS;
}

module.exports = { getOffers, OFFERS };
