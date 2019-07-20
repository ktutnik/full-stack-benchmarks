import { get, post, requestBody } from "@loopback/rest";
import { model, property } from "@loopback/repository";

@model()
export class Test {
    @property({ type: Boolean })
    boolean: boolean
    @property({ type: Number })
    number: number
    @property({ type: String })
    string: string
    @property({ type: Date })
    date: Date
}


export class TestController {
    constructor() { }

    @get("/test")
    get() {
        return { messages: "Hello world!" }
    }

    @post("/test")
    save(@requestBody(Test) data: Test) {
        return data
    }
}
