const shell = require('shelljs');

const args = process.argv.slice(2);
const db = args[0];
const totalProducts = args[1];
const shards = args[2];
const productsPerShard = Math.floor(totalProducts / shards);

for (let i = 0; i < shards; i++) {
  shell.echo(`Shard ${i}/${shards} started......`);
  if (db === 'postgre') {
    if (shell.exec(`node ${__dirname}/${db}/loader.js ${productsPerShard} ${i}`).code !== 0) {
      shell.echo(`Error: loader script failed for shard ${i}!`);
      shell.exit(1);
    }
  } else if (db === 'cassandra') {
    if (shell.exec(`node ${__dirname}/${db}/csvWrapper.js ${productsPerShard} ${i}`).code !== 0) {
      shell.echo(`Error: csv writer script failed for shard ${i}!`);
      shell.exit(1);
    }
  } else {
    shell.echo(`Unknown db type ${db}!`);
    shell.exit(1);
  }
}

shell.echo('Done!');
