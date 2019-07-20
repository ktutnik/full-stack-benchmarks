# Full Stack TypeScript Framework Benchmarks


## Framework Cost

## Setup

| Framework  | Router     | Body Parser | Validator |
| ---------- | ---------- | ----------- | --------- |
| Koa        | koa-router | koa-body    | joi       |
| Express    | Built-in   | body-parser | joi       |
| Plumier    | Built-in   | Built-in    | Built-in  |
| Loopback 4 | Built-in   | Built-in    | Built-in  |
| Nest       | Built-in   | Built-in    | Built-in  |


## Result

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
