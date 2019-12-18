import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Body, Controller, Get, Post, Module } from "@nestjs/common"
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber } from "class-validator"

// --------------------------------------------------------------------- //
// ------------------------------- DOMAIN ------------------------------ //
// --------------------------------------------------------------------- //

class Test {
    @IsBoolean()
    @IsNotEmpty()
    boolean: boolean

    @IsNumber()
    @IsNotEmpty()
    number: number

    @IsNotEmpty()
    string: string

    @IsDateString()
    @IsNotEmpty()
    date: Date
}

// --------------------------------------------------------------------- //
// ----------------------------- CONTROLLER ---------------------------- //
// --------------------------------------------------------------------- //

@Controller()
class TestController {

    @Get("/test")
    get() {
        return { messages: "Hello world!" }
    }

    @Post("/test")
    save(@Body() data: Test) {
        return data
    }
}

// --------------------------------------------------------------------- //
// ------------------------------- MODULE ------------------------------ //
// --------------------------------------------------------------------- //

@Module({
    imports: [],
    controllers: [TestController],
})
class TestModule { }

// --------------------------------------------------------------------- //
// ---------------------------- ENTRY POINT ---------------------------- //
// --------------------------------------------------------------------- //

async function bootstrap() {
    const app = await NestFactory.create(TestModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))
    await app.listen(3000);
}

bootstrap().catch(e => console.log(e));
