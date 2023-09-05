const express = require('express');
const router = express.Router();
const axios = require('axios');
const DUMMY_LOANS = require('../../dummy-data');

// GET all loans
router.get("/", async (req, res) => {
  try {
    const responseData = await axios.get('https://ltk-loans-project-default-rtdb.firebaseio.com/loans.json');
    const loanData = responseData.data;

    res.json({
      message: loanData ? loanData : 'No loans found.',
    });
  } catch (error) {
    res.json({
      message: 'Something went wrong...',
    });
  };
});

// GET single loan
router.get('/:id', async (req, res) => {
  try {
    const loanId = req.params.id;
    const responseData = await axios.get(`https://ltk-loans-project-default-rtdb.firebaseio.com/loans/${loanId}.json`);
    const loanData = responseData.data;

    res.json({
      message: loanData ? loanData : 'No loan found',
    });
  } catch (error) {
    res.json({
      message: 'Something went wrong...',
    });
  };
});

// POST new loan (using PUT for axios because of how firebase handles POST requests)
// using dummy data to simplify demonstration with postman, but could collect incoming data
router.post('/new', async (req, res) => {
  const fakeDataIndex = Math.floor(Math.random() * 5 + 1);
  const loan = DUMMY_LOANS[fakeDataIndex];
  const loanId = loan.loanId;

  try {
    await axios.put(`https://ltk-loans-project-default-rtdb.firebaseio.com/loans/${loanId}.json`, loan);
    res.redirect('/loans');
  } catch (error) {
    res.json({
      message: 'Something went wrong...',
    });
  };
});

// PATCH update borrower
router.patch('/:id/:pairId', async (req, res) => {
  const loanId = req.params.id;
  const pairId = req.params.pairId;

  try {
    const loan = await axios.get(`https://ltk-loans-project-default-rtdb.firebaseio.com/loans/${loanId}.json`);
    const loanData = loan.data;

    const borrowerIndex = loanData.borrowers.findIndex(b => b.pairId.toString() === pairId);
    const borrowerInfo = loanData.borrowers[borrowerIndex];

    if (req.body.firstName) {
      borrowerInfo.firstName = req.body.firstName;
    };
    if (req.body.lastName) {
      borrowerInfo.lastName = req.body.lastName;
    };
    if (req.body.phone) {
      borrowerInfo.phone = req.body.phone;
    };

    await axios.put(`https://ltk-loans-project-default-rtdb.firebaseio.com/loans/${loanId}/borrowers/${borrowerIndex}.json`, borrowerInfo);

    res.redirect(`/loans/${loanId}`);
  } catch (error) {
    res.json({
      message: 'Something went wrong...',
    });
  };
});

// DELETE borrower
router.delete('/:id/:pairId', async (req, res) => {
  const loanId = req.params.id;
  const pairId = req.params.pairId;

  try {
    const loan = await axios.get(`https://ltk-loans-project-default-rtdb.firebaseio.com/loans/${loanId}.json`);
    const loanData = loan.data;

    const newBorrowers = loanData.borrowers.filter(b => b.pairId.toString() !== pairId);

    await axios.put(`https://ltk-loans-project-default-rtdb.firebaseio.com/loans/${loanId}/borrowers.json`, newBorrowers);

    res.redirect(`/loans/${loanId}`);
  } catch (error) {
    res.json({
      message: 'Something went wrong...',
    });
  };
});

// DELETE loan 
router.delete('/:id', async (req, res) => {
  const loanId = req.params.id;

  try {
    await axios.delete(`https://ltk-loans-project-default-rtdb.firebaseio.com/loans/${loanId}.json`);
    res.redirect('/loans');
  } catch (error) {
    res.json({
      message: 'Something went wrong...',
    });
  };
});

module.exports = router;