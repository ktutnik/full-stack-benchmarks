import Koa from "koa";
import Plumier, { Configuration, WebApiFacility } from "plumier";

export function createApp(config?:Partial<Configuration>): Promise<Koa> {
    return new Plumier()
        .set(config || {})
        .set(new WebApiFacility())
        .initialize()
}
