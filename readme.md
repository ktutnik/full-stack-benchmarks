# Full Stack TypeScript Framework Benchmarks
This benchmark intended to test full stack functionalities of a framework. This benchmark tests framework efficiency on routing request, parsing request body, validating data or converting data into expected type. 

## Framework Cost
Most TypeScript framework uses other framework as its core http server such as Loopback uses Express as its core http server, Nest has an ability to dynamically change the core framework etc, thats make req/s of frameworks vary based on its core http server speed.  

Since frameworks uses vary core http server, the req/s score can't be use as a indicator of an efficient framework.

**Framework Cost** is score of framework inefficiency (the lower the better). It is percentage of req/sec lost from its core http server. 

## Setup
To get a proper framework cost calculation, Koa and Express included in this benchmark also prepared with router, body parser and validator like below:

| Framework  | Router     | Body Parser | Validator |
| ---------- | ---------- | ----------- | --------- |
| Koa        | koa-router | koa-body    | joi       |
| Express    | Built-in   | body-parser | joi       |
| Plumier    | Built-in   | Built-in    | Built-in  |
| Loopback 4 | Built-in   | Built-in    | Built-in  |
| Nest       | Built-in   | Built-in    | Built-in  |

## Running the Benchmark
To run the benchmark make sure you have Git and Node.js installed in your machine. 

* Git clone this project.
* Install dependencies `npm install`
* Start the project `npm start`

## Result
This benchmark result ran using Macbook Pro 15 with Node.js 10

```
$ ts-node .

GET method benchmark starting...

Server       Base         Method         Req/s  Cost (%)
plumier      koa          GET         33624.00     -0.06
koa                       GET         33602.19      0.00
express                   GET         17688.37      0.00
nest         express      GET         16932.91      4.27
loopback     express      GET          5174.61     70.75

POST method benchmark starting...

Server       Base         Method         Req/s  Cost (%)
koa                       POST        12218.37      0.00
plumier      koa          POST        11196.55      8.36
express                   POST         9543.46      0.00
nest         express      POST         6814.64     28.59
loopback     express      POST         3108.91     67.42
```
