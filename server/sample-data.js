const salesData = {
  results: [
    {
      date: '01/02/12',
      salesPerson: 'Larry',
      amount: 100,
      location: 'Dublin'
    },
    {
      date: '01/04/12',
      salesPerson: 'Larry',
      amount: 1000,
      location: 'Dublin'
    },
    {
      date: '01/04/12',
      salesPerson: 'Larry',
      amount: 300,
      location: 'Dublin'
    },
    {
      date: '01/01/12',
      salesPerson: 'Jim',
      amount: 100,
      location: 'London'
    },
    {
      date: '01/04/12',
      salesPerson: 'Jim',
      amount: 100,
      location: 'London'
    },
    {
      date: '01/04/12',
      salesPerson: 'Sarah',
      amount: 500,
      location: 'Dublin'
    },
    {
      date: '01/07/12',
      salesPerson: 'Sarah',
      amount: 700,
      location: 'Dublin'
    },
    {
      date: '02/04/12',
      salesPerson: 'Sarah',
      amount: 500,
      location: 'Dublin'
    },

    {
      date: '01/20/12',
      salesPerson: 'Jim',
      amount: 700,
      location: 'Cork'
    },
    {
      date: '02/01/12',
      salesPerson: 'Sarah',
      amount: 500,
      location: 'Cork'
    }
  ]
};

const lineData = {
  "results": [
    {"name": "2017-02-05", "value": 5},
    {"name": "2017-02-06", "value": 4},
    {"name": "2017-02-07", "value": 4},
    {"name": "2017-02-08", "value": 7},
    {"name": "2017-02-09", "value": 3},
    {"name": "2017-02-10", "value": 6},
    {"name": "2017-02-11", "value": 6},
    {"name": "2017-02-12", "value": 9},
    {"name": "2017-02-13", "value": 4},
    {"name": "2017-02-14", "value": 5}
  ]
};

const barData = {
  "results": [
    {"name": "Dublin", "value": 10},
    {"name": "London", "value": 6},
    {"name": "Cork", "value": 16}
  ]
};

const pieData = {
  "results": [
    {"name": "Jim", "value": 5},
    {"name": "Mary", "value": 8},
    {"name": "Dave", "value": 4},
    {"name": "Susan", "value": 7},
  ]
};

const token = {
  "token": 'ojg890jngjsnflvjer87y0eutj4jgjj59vjtipwecmaojvinjejn'
};

// needed for node require
module.exports.salesData = salesData;
module.exports.lineData = lineData;
module.exports.barData = barData;
module.exports.pieData = pieData;
module.exports.token = token;
