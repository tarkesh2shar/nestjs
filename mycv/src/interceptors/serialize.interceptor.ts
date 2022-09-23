import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";


interface ClassConstructor{
    new (...args:any[]):{};
}
export function Serialize(dto:ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto:any){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        //Run something before the request is handled by the request handler 
        // console.log("Before Handle Request",context);

        return next.handle().pipe(
            map((data:any)=>{
                //Run  something before the response is set out
                // console.log("Before  Request is sent out",data);

                return plainToClass(this.dto,data,{
                    excludeExtraneousValues:true
                })
            })
        )
        
    }
}