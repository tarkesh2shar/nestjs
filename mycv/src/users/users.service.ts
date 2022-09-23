import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    // InjectRepository --> to handle generics ok ???
    constructor(@InjectRepository(User) private repo: Repository<User>) {  
    }
    create(email:string,password:string){
        const user= this.repo.create({email,password})
        return this.repo.save(user); 
    }

    findOne(id:number){ 
        if(!id)
        return null;
        return this.repo.findOne({where:{id}})
        // return this.repo.findOne({})
    }
    find(email:string){
        return this.repo.find({where:{email}}) 
    }
    async update(id:number, attrs: Partial<User>){
      const user=  await this.findOne(id);
        if(!user){
            throw new NotFoundException('User Not Found');
        }
        Object.assign(user,attrs);
        return this.repo.save(user);
    }
   async remove(id:number){
        const user=  await this.findOne(id);
        console.log("user",user);
        if(!user){
            throw new NotFoundException('User Not Found');
        }
        return this.repo.remove(user);
    }
}  
