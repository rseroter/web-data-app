var express = require('express');
var router = express.Router();

// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

const { v4: uuidv4 } = require('uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Employee Entry Form' });
});

router.post('/', async function(req, res, next) {
    console.log('called post - creating row')

    const row = [
        {empid: uuidv4(), fullname: req.body.inputname}
      ];

    // Insert data into a table
    await bigquery
    .dataset('employees_us')
    .table('names')
    .insert(row);
    console.log(`Inserted 1 rows`);


    res.render('index', { title: 'Express' });
  });

module.exports = router;
