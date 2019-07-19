import { route, domain } from "plumier"

@domain()
export class Test {
    constructor(
        public boolean: boolean,
        public number: number,
        public string: string,
        public date: Date
    ) { }
}

export class TestController {
    @route.get()
    get() {
        return { messages: "Hello world!" }
    }

    @route.post("")
    save(data:Test){
        return data;
    }
}