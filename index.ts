import { BenchmarkOption, benchmark } from "./helper"
import { readdirSync } from "fs";
import { join, basename } from "path";
import numeral from "numeral"

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

interface BenchResult { name: string, base:string, method: string, requests: number, cost: number }

function getDirs(root: string) {
    return readdirSync(root, { withFileTypes: true })
        .filter(x => x.isDirectory())
        .map(x => join(root, x.name))
}

function getCost(base: { requests: number }, current: { requests: number }) {
    return ((base.requests - current.requests) / base.requests) * 100
}

async function benchGroup(path: string, option: BenchmarkOption) {
    const baseResult = await benchmark({ ...option, path })
    const baseName = basename(path)
    //console.log(baseName.padEnd(15), baseResult.requests.toString().padEnd(9), baseResult.stats)
    const servers = getDirs(path)
    const results: BenchResult[] = [{
        name: baseName, cost: 0,
        requests: baseResult.requests, 
        method: option.method, base: ""
    }]
    for (const server of servers) {
        const result = await benchmark({ ...option, path: server })
        const name = basename(server)
        results.push(<BenchResult>{
            name, method: option.method,
            requests: result.requests,
            cost: getCost(baseResult, result),
            base:baseName
        })
        //console.log(name.padEnd(15), result.requests.toString().padEnd(9), result.stats)
    }
    return results
}


async function print(option:BenchmarkOption){
    const serverBase = getDirs(join(__dirname, "servers"))
    const result :BenchResult[] =[]
    for (const path of serverBase) {
        result.push(...await benchGroup(path, option))
    }
    console.log()
    console.log(
        "Server".padEnd(12),
        "Base".padEnd(12),
        "Method".padEnd(10),
        "Req/s".padStart(9),
        "Cost (%)".padStart(9))
    const ordered = result.sort((a, b) => b.requests - a.requests)
    for (const opt of ordered) {
        console.log(
            opt.name.padEnd(12),
            opt.base.padEnd(12),
            opt.method.padEnd(10),
            numeral(opt.requests).format("0.00").padStart(9),
            numeral(opt.cost).format("0.00").padStart(9))
    }
}

(async () => {
    for (const opt of [defaultGetOption, defaultPostOption]) {
        console.log()
        console.log(`Benchmark ${opt.method} method`)
        await print(opt)
    }
})()