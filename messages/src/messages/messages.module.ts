import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessageRepository } from './messages.repository';
import { MessageService } from './message.service';

@Module({
  controllers: [MessagesController],
  providers: [MessageRepository, MessageService]
})
export class MessagesModule { }
