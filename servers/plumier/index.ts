import { createApp } from "./app";

createApp()
    .then(x => x.listen(3000))
    .catch(e => console.error(e))