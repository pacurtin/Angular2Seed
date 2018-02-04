const express = require('express');
const router = express.Router();
const sampleData = require('./sample-data');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get sales data
router.get( '/sales', (req, res) => {
    res.status(200).json(sampleData.salesData);
  }
);

// Get line chart data
router.get( '/line', (req, res) => {
    res.status(200).json(sampleData.lineData);
  }
);

// Get bar chart data
router.get( '/bar', (req, res) => {
  res.status(200).json(sampleData.barData);
}
);

// Get pie chart data
router.get( '/pie', (req, res) => {
  res.status(200).json(sampleData.pieData);
}
);

// Get login data
router.get( '/login', (req, res) => {
  res.status(200).json(sampleData.token);
}
);

module.exports = router;
