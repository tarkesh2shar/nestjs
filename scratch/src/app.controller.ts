import { Controller, Get } from "@nestjs/common";

@Controller("/api")
export class AppController {
    @Get("/hello")
    getRootRoute(){
        return 'Hi there ok ok ok ok ok ok ok ok ??? '
    }
    
    @Get("/bye")
    getByeRoute(){
        return 'Bye bYe'
    }
}