import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>
  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id, email: 'asdf@aasdf.com', password: "asdja"
        } as User)
      },
      find: (email: string) => {
        return Promise.resolve([{
          id: 1, email, password: "asdja"
        } as User])
      }
      // remove: () => {
      // }
      // update: () => {
      // }
    }

    fakeAuthService = {
      // signup: () => { },
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User)
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  })
  it('findAllUsers returns a list of users with the given email ', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual("asdf@asdf.com")
  })
  it('findUser returns a single user with the given Id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  })

  it('findUser throws an error if user with the given id is not found', (done) => {
    fakeUsersService.findOne = () => null;
    const user = controller.findUser('1').then().catch(() => {
      done();
    })

  })
  it('signin updates session object and return users', async () => {
    const session = { userId: null, };
    const user = await controller.signin({ email: "asdf@asdf.com", password: "2323" }, session)
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1)
  })
});