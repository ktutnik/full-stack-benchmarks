import { Body, Controller, Get, Post } from "@nestjs/common"
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber } from "class-validator"

export class Test {
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

@Controller()
export class TestController {

  @Get("/test")
  get() {
    return { messages: "Hello world!" }
  }

  @Post("/test")
  save(@Body() data: Test) {
    return data
  }
}
