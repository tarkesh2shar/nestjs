import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiscService {
    constructor(public powerService:PowerService){
    }
     getData(){
        console.log("sdasda");
        this.powerService.supplyPower(20);
        return 'data';
        
    }
}
