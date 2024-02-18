# Pipeline aggregate in MongoDB

The objective of this project is to list the ids of the **daughter** ***userDetails*** collection that have no relationship or reference in the **parent** ***user*** collection.

For this purpose, we will use Mongodb's aggregates to retrieve this data and use two different ways of executing this query, to understand how it would be the most performant when dealing with high numbers of documents.

**Two strategy**:

1. Skip and limit strategy, to bring the sliced result
2. Batch query, using the cursor to generate an iterable over the documents and the batch size to control the batches.

## Prerequisites
- nodejs - v18+
- npm - v10.2.3
- docker-compose - v2.23.3

## Technologies used

- MongoDB
- Mongoose lib

## Setup initial

1. Clone the project

```sh
git clone git@github.com:brunoMirand/pipeline-aggregate_mongodb.git && cd pipeline-aggregate_mongodb
```

2. Generate .env file
```sh
copy .env.example .env
```

3. Install dependencies of the project
```sh
npm install
```


## Execute scripts
1. Generate test dough
```sh
npm run create-test-dough
```

2. Execute a search for documents in the collection using the skip and limit query strategy:
```sh
npm run list:ids:skip
```

3. Execute a search for documents in the collection using the cursor query strategy:
```sh
npm run list:ids:cursor
```


## Script test results

#### Mass of data used 4k

- **Skip and limit:** Timing: 386.37961599975824 milliseconds
- **Cursor next:** Timing: 156.02137899398804 milliseconds
---

#### Mass of data used 12k

- **Skip and limit:** Timing: 2133.87826000154 milliseconds
- **Cursor next:** Timing: 322.67700599879026 milliseconds
---

#### Mass of data used 300K

- **Skip and limit:** Timing: 5953.284037999809 milliseconds
- **Cursor next:** Timing: 497.56467800587416 milliseconds
---