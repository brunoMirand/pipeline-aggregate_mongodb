import { QuoteDetails } from './schema';

export const deleteMissingQuoteDetails = async (ids) => {
  try {
    const result = await QuoteDetails.deleteMany({
      idDetalhamento: {
        $in: ids
      }
    });
    console.log(`${result.deletedCount} removed documents`);
  } catch (error) {
    console.error('Error:', error);
  }
}
