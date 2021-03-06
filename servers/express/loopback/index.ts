import { BootMixin } from "@loopback/boot"
import { ApplicationConfig } from "@loopback/core"
import { RepositoryMixin } from "@loopback/repository"
import { RestApplication } from "@loopback/rest"
import { ServiceMixin } from "@loopback/service-proxy"

export class LoopbackApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
    constructor(options: ApplicationConfig = {}) {
        super(options);
        this.projectRoot = __dirname;
        this.bootOptions = {
            controllers: {
                dirs: ['controllers'],
                extensions: ['.controller.ts'],
                nested: true,
            },
        };
    }
}

export async function main() {
    const app = new LoopbackApplication({ rest: { port: 3000 } });
    await app.boot();
    await app.start();
}
main().catch(e => console.log(e))
