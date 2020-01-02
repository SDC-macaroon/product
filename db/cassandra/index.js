const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'kc1',
  pooling: {
    maxRequestsPerConnection: 32768,
  },
});

client.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Cassandra connected');
  }
});

module.exports = client;
