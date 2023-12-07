const data = require('../server/data/users.test.json');

const displayedData = [
  [
    `${data[0].first_name} ${data[0].last_name}`,
    data[0].email,
    data[0].date,
    data[0].city,
    data[0].country,
  ],
  [
    `${data[1].first_name} ${data[1].last_name}`,
    data[1].email,
    data[1].date,
    data[1].city,
    data[1].country,
  ],
  [
    `${data[2].first_name} ${data[2].last_name}`,
    data[2].email,
    data[2].date,
    data[2].city,
    data[2].country,
  ]
];

const testsAsc = [
  {
    orderBy: 'email',
    expectations: [
      displayedData[1],
      displayedData[2],
      displayedData[0]
    ]
  },
  {
    orderBy: 'date',
    expectations: [
      displayedData[1],
      displayedData[0],
      displayedData[2]
    ]
  },
  {
    orderBy: 'city',
    expectations: [
      displayedData[2],
      displayedData[0],
      displayedData[1]
    ]
  },
  {
    orderBy: 'country',
    expectations: [
      displayedData[0],
      displayedData[1],
      displayedData[2]
    ]
  },
  {
    orderBy: 'name',
    expectations: [
      displayedData[1],
      displayedData[2],
      displayedData[0]
    ]
  }
];

const testsDesc = [
  {
    orderBy: 'email',
    expectations: [
      displayedData[0],
      displayedData[2],
      displayedData[1]
    ]
  },
  {
    orderBy: 'date',
    expectations: [
      displayedData[2],
      displayedData[0],
      displayedData[1]
    ]
  },
  {
    orderBy: 'city',
    expectations: [
      displayedData[1],
      displayedData[0],
      displayedData[2]
    ]
  },
  {
    orderBy: 'country',
    expectations: [
      displayedData[2],
      displayedData[1],
      displayedData[0]
    ]
  },
  {
    orderBy: 'name',
    expectations: [
      displayedData[0],
      displayedData[2],
      displayedData[1]
    ]
  }
];

module.exports = {
  testsDesc,
  testsAsc,
  data: displayedData
};