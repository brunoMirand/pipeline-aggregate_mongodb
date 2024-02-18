export const pipeline = (sliceDocuments, skip) => {
  return [
    {
      $lookup: {
        from: 'users',
        localField: 'id_detail',
        foreignField: 'id_detail',
        as: 'result'
      }
    },
    {
      $match: {
        result: {
          $eq: []
        }
      }
    },
    {
      $project: {
        id_detail: 1,
        _id: 0,
      }
    },
    {
      $skip: skip
    },
    {
      $limit: sliceDocuments
    }
  ];
}