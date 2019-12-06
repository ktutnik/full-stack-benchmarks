import Plumier, { domain, route, WebApiFacility, val } from "plumier"

// --------------------------------------------------------------------- //
// ------------------------------- DOMAIN ------------------------------ //
// --------------------------------------------------------------------- //

@domain()
export class Test {
    constructor(
        @val.required()
        public boolean: boolean,
        @val.required()
        public number: number,
        @val.required()
        public string: string,
        @val.required()
        public date: Date
    ) { }
}

// --------------------------------------------------------------------- //
// ----------------------------- CONTROLLER ---------------------------- //
// --------------------------------------------------------------------- //

export class TestController {
    @route.get("")
    get() {
        return { messages: "Hello world!" }
    }

    @route.post("")
    save(data: Test) {
        return data;
    }
}

// --------------------------------------------------------------------- //
// ---------------------------- ENTRY POINT ---------------------------- //
// --------------------------------------------------------------------- //

new Plumier()
    .set(new WebApiFacility({ controller: TestController }))
    .initialize()
    .then(x => {
        x.listen(3000)
    })
    .catch(e => console.error(e))