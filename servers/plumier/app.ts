import Koa from "koa";
import Plumier, { Configuration, WebApiFacility } from "plumier";
import { TestController } from "./test-controller";

export function createApp(): Promise<Koa> {
    return new Plumier()
        .set(new WebApiFacility({ controller: TestController }))
        .initialize()
}
