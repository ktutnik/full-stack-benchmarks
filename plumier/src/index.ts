import { createApp } from "./app";
import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT || 3000;
createApp()
    .then(x => x.listen(port))
    .then(x => console.log(`Server running http://localhost:${port}/`))
    .catch(e => console.error(e))