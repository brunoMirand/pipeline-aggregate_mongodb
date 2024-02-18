import { performance } from 'node:perf_hooks';
import { connection, disconnect } from './connection.js';
import { pipeline } from './pipeline-cursor.js';
import { UserDetails } from './schema.js';

(async () => {
  const start = performance.now();
  const isConnected = await connection();
  if (!isConnected) {
    process.exit(1);
  }

  const sliceSize = 1000;
  let doc = [];

  try {
    const cursor = UserDetails.aggregate(pipeline()).cursor({ batchSize: sliceSize });
    let result;
    while ((result = await cursor.next())) {
      doc.push(result);
    }
  } catch (error) {
    console.error(error);
    await disconnect();
    process.exit(1);
  }

  console.log(doc);
  console.log(doc.length);

  const end = performance.now();
  console.log(`Timing: ${end - start} milliseconds`);

  await disconnect();
  process.exit(1);
})();
