import { LoopbackApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export { LoopbackApplication };

export async function main() {
    const app = new LoopbackApplication({ rest: { port: 3000 } });
    await app.boot();
    await app.start();
}
main().catch(e => console.log(e))
