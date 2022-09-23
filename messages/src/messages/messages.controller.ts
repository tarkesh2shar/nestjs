import { Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessageService } from './message.service';

@Controller('messages')
export class MessagesController {
    constructor(public messageService: MessageService) {
    }
    @Get("/")
    listMrssages() {
        return this.messageService.findAll();
    }
    @Post("/")
    postMessage(
        @Body(
        ) body: CreateMessageDto
    ) {
        return this.messageService.create(body.content)
    }
    @Get("/:id")
    async getMessage(@Param('id') id) {
        const message = await this.messageService.findOne(id)
        if (!message) {
            throw new NotFoundException("message Not Found")
        }
        return message
    }
}
