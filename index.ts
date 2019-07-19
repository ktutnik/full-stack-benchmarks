import { BenchmarkOption, benchmark } from "./helper"
import { readdirSync } from "fs";
import { join } from "path";

// --------------------------------------------------------------------- //
// ------------------------- BENCHMARK OPTIONS ------------------------- //
// --------------------------------------------------------------------- //

const defaultOption = <BenchmarkOption>{
    url: "http://localhost:3000/test",
    pipelining: 10,
    silent: true,
    env: { NODE_ENV: "production" }
}

const servers = readdirSync(join(__dirname, "servers"), { withFileTypes: true })
    .filter(x => x.isDirectory())
    .map(x => join(__dirname, "servers", x.name))

const getOptions = servers.map(x => <BenchmarkOption>{ ...defaultOption, method: "GET", path: x })

const postOptions = servers.map(x => <BenchmarkOption>{
    ...defaultOption, method: "POST",
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify({
        boolean: true,
        number: 1234567,
        string: "Hello world!",
        date: '2019-07-19T19:51:45Z'
    }),
    path: x
});


(async () => {
    const options = getOptions.concat(postOptions)
    console.log(
        "Server".padEnd(12),
        "Req/s".padEnd(9),
        "Method".padEnd(6),
        "Request Stats")
    for (const opt of options) {
        const result = await benchmark(opt)
        console.log(
            result.server.padEnd(12),
            result.requests.toString().padEnd(9),
            opt.method!.padEnd(6),
            result.stats)
    }
})()