import { BenchmarkOption, benchmark as cannon } from "./helper"
import { readdirSync } from "fs";
import { join, basename } from "path";

// --------------------------------------------------------------------- //
// ------------------------- BENCHMARK OPTIONS ------------------------- //
// --------------------------------------------------------------------- //

const defaultOption = <BenchmarkOption>{
    url: "http://localhost:3000/test",
    pipelining: 10,
    silent: true,
    env: { NODE_ENV: "production" }
}
const defaultGetOption = <BenchmarkOption>{ ...defaultOption, method: "GET" }
const defaultPostOption = <BenchmarkOption>{
    ...defaultOption, method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        boolean: true,
        number: 1234567,
        string: "Hello world!",
        date: '2019-07-19T19:51:45Z'
    })
}

interface BenchResult { name: string, method: string, requests: number, cost: number }

function getDirs(root: string) {
    return readdirSync(root, { withFileTypes: true })
        .filter(x => x.isDirectory())
        .map(x => join(root, x.name))
}

function getCost(base: { requests: number }, current: { requests: number }) {
    return ((base.requests - current.requests) / base.requests) * 100
}

async function benchGroup(path: string, option: BenchmarkOption) {
    const baseResult = await cannon({ ...option, path })
    console.log(basename(path).padEnd(15), baseResult.requests.toString().padEnd(9), baseResult.stats)
    const servers = getDirs(path)
    const results: BenchResult[] = []
    for (const server of servers) {
        const result = await cannon({ ...option, path: server })
        const name = basename(server)
        results.push(<BenchResult>{
            name, method: option.method,
            requests: result.requests,
            cost: getCost(baseResult, result)
        })
        console.log(name.padEnd(15), result.requests.toString().padEnd(9), result.stats)
    }
    return results
}


(async () => {
    const serverBase = getDirs(join(__dirname, "servers"))
    const result: BenchResult[] = []
    for (const base of serverBase) {
        result.push(...await benchGroup(base, defaultGetOption))
        result.push(...await benchGroup(base, defaultPostOption))
    }
    console.log()
    console.log(
        "Server".padEnd(12),
        "Method".padEnd(10),
        "Req/s".padEnd(9),
        "Cost (%)".padEnd(9))
    for (const opt of result) {
        console.log(
            opt.name.padEnd(12),
            opt.method.padEnd(10),
            opt.requests.toString().padEnd(9),
            opt.cost.toString().padEnd(9))
    }
})()