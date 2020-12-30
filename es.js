const elasticsearch = require('elasticsearch');
require('dotenv').config();

const esUri = process.env.ES_URI || '';
const esUser = process.env.ES_USER || '';
const esPassword = process.env.ES_PASSWORD || '';

const client = new elasticsearch.Client({
  hosts: [
    `https://${esUser}:${esPassword}@${esUri}`
  ]
});

// module.exports = client;

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error(`elasticsearch cluster is down! ${error}`);
  } else {
    console.log('All is well');
  }
});
