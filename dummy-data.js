const idGenerator = () => {
  const newId = Math.floor(Math.random() * 5000 + 1);
  return newId;
};

const DUMMY_LOANS = [
  {
    loanId: idGenerator(),
    borrowers: [
      {
        pairId: idGenerator(),
        firstName: 'Kevin',
        lastName: 'Malone',
        phone: '1234567896'
      },
    ],
  },
  {
    loanId: idGenerator(),
    borrowers: [
      {
        pairId: idGenerator(),
        firstName: 'Pamela',
        lastName: 'Halpert',
        phone: '1234567896'
      },
      {
        pairId: idGenerator(),
        firstName: 'Jim',
        lastName: 'Halpert',
        phone: '1234567896'
      },
    ],
  },
  {
    loanId: idGenerator(),
    borrowers: [
      {
        pairId: idGenerator(),
        firstName: 'Dwight',
        lastName: 'Schrute',
        phone: '1234567896'
      },
      {
        pairId: idGenerator(),
        firstName: 'Angela',
        lastName: 'Martin',
        phone: '1234567896'
      },
    ],
  },
  {
    loanId: idGenerator(),
    borrowers: [
      {
        pairId: idGenerator(),
        firstName: 'Michael',
        lastName: 'Scott',
        phone: '1234567896'
      },
    ],
  },
  {
    loanId: idGenerator(),
    borrowers: [
      {
        pairId: idGenerator(),
        firstName: 'Andrew',
        lastName: 'Bernard',
        phone: '1234567896'
      },
    ],
  },
];

module.exports = DUMMY_LOANS;