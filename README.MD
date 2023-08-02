# Catalog App

REST API to manage catalog of products.

There is a insomnia json file on the root directory for import the requests to use insomnia.

## How to start?

1. `docker run --name mongo -p 27017:27017 -d mongo`
1. `npm install`
1. Change the values on .env with real values
1. `npm run start:dev`

**On app running you can access swagger documentation on localhost:${PORT}/documentation**

## How to run tests?

- `npm run test`

## How queues was create?

- The queue was created using Standard option because the order of messages received doesn't matter
- Standard option is a good option when the throughput is important

## Sqs configuration on application

- The messages are being processed in batch because I think it's better when you have several requests
