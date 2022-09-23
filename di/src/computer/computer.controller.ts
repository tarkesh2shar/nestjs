import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiscService } from 'src/disc/disc.service';

@Controller('computer')
export class ComputerController {
    constructor(public cpu:CpuService,public disc:DiscService){}

    @Get()
    run(){
        return [
            this.cpu.compute(1,3),
            this.disc.getData()

        ]
    }
    
}
