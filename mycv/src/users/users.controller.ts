import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Inject, NotFoundException, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { Serialize, SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '../gurads/auth.guard';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService,
    private authService: AuthService
  ) { }
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password)
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password)
    session.userId = user.id;
    return user
  }
  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }
  // @Get('/whoami')
  // getUser(@Session() session:any){
  //   return this.userService.findOne(session.userId)
  // }


  @Get('/whoami')
  @UseGuards(AuthGuard)
  //@ts-ignore
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }
  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color
  }
  @Get('/:id')
  async   findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found love')
    }
    return user;
  }
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email)
  }
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id))
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body)
  }
} 
