import cannon, { CannonResult, CannonOption } from "autocannon"
import { basename } from "path";
import { fork } from "child_process";
import axios, { AxiosRequestConfig } from "axios"

export type BenchmarkOption = CannonOption & { baseFramework: string, path: string, silent?: boolean, env?: any, response: any }

function delay(ms: number = 5000) {
    return new Promise(resolve => setTimeout(resolve, 2000))
}

function cannonAsync(opts: CannonOption) {
    return new Promise<CannonResult>((resolve, reject) => {
        cannon({ ...opts }, (err, result) => {
            if (err) reject(err)
            else resolve(result)
        })
    })
}

export async function benchmark(opt: BenchmarkOption) {
    const { path, silent, env, ...opts } = opt
    const process = fork(path, [], { silent, env })
    await delay()
    const result = await cannonAsync(opts)
    process.kill('SIGINT')
    return {
        title: result.title,
        requests: result.requests.average,
        latency: result.latency.average,
        throughput: result.throughput.average,
        errors: result.errors,
        timeouts: result.timeouts,
        duration: result.duration,
        connections: result.connections,
        pipelines: result.pipelining,
        stats: {
            err: result.errors + result.timeouts,
            "1xx": (result as any)["1xx"],
            "2xx": (result as any)["2xx"],
            "3xx": (result as any)["3xx"],
            "4xx": (result as any)["4xx"],
            "5xx": (result as any)["5xx"],
        },
        server: basename(path)
    }
}