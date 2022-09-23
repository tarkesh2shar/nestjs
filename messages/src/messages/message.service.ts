import { MessageRepository } from "./messages.repository"
import { Injectable } from "@nestjs/common";

@Injectable()
export class MessageService {
    constructor(public messageRepo: MessageRepository) {
    }
    async findOne(id: string) {
        return this.messageRepo.findOne(id)
    }
    async findAll() {
        return this.messageRepo.findAll();
    }
    create(content: string) {
        return this.messageRepo.create(content)
    }
}