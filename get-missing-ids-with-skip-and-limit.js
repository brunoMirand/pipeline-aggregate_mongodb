import { performance } from 'node:perf_hooks';
import { connection, disconnect } from './connection.js';
import { pipeline } from './pipeline.js';
import { UserDetails } from './schema.js';

(async () => {
  const start = performance.now();
  const isConnected = await connection();
  if (!isConnected) {
    process.exit(1);
  }

  async function getMissingUserDetailsIds(sliceDocuments, skip) {
    try {
      const results = await UserDetails.aggregate(pipeline(sliceDocuments, skip)).exec();
      return results;
    } catch (error) {
      throw new Error('Error getting documents', error.message);
    }
  }

  const totalDocuments = 45000;
  const sliceDocuments = 1000;
  const documents = [];
  let skip = 0;
  while (skip < totalDocuments) {
    try {
      const userDetailsIds = await getMissingUserDetailsIds(sliceDocuments, skip);
      if (!userDetailsIds || userDetailsIds.length === 0) {
        break;
      }
      skip += sliceDocuments;
      documents.push(userDetailsIds);
    } catch (error) {
      console.error(error);
      await disconnect();
      process.exit(1);
    }
  }
  console.log(documents);
  const end = performance.now();
  console.log(`Timing: ${end - start} milliseconds`);
  await disconnect();
  process.exit(1);
})();
