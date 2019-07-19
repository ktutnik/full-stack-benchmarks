import Plumier, { domain, route, WebApiFacility } from "plumier"

// --------------------------------------------------------------------- //
// ------------------------------- DOMAIN ------------------------------ //
// --------------------------------------------------------------------- //

@domain()
export class Test {
    constructor(
        public boolean: boolean,
        public number: number,
        public string: string,
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
    .then(x => x.listen(3000))
    .catch(e => console.error(e))