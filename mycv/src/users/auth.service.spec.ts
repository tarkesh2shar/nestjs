import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { User } from "./user.entity";
import { UsersService } from "./users.service";
describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;
    beforeEach(async () => {
        const users: User[] = [];
        //create a Fake copy of the users service 
        fakeUsersService = {
            // find: () => Promise.resolve([]),
            find: (email: string) => {
                const filteredUser = users.filter(user => user.email === email);
                return Promise.resolve(filteredUser)
            },
            create: (email: string, password: string) => {
                const user = { email, password, id: Math.floor(Math.random() * 9999999) } as User
                users.push(user);
                return Promise.resolve(user)
            }
        }
        const module = await Test.createTestingModule({
            providers: [AuthService, {
                provide: UsersService,
                useValue: fakeUsersService
            }]
        }).compile();
        service = module.get(AuthService);
    })

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    })
    it('creates a new user with salted and hashed password ', async () => {
        const user = await service.signup('abcd@adk.com', "abcd")
        expect(user.password).not.toEqual('abcd')
        const [salt, hash] = user.password.split('.')
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })

    it('throws an error if user signs up with email that is in use', (done) => {
        fakeUsersService.find = () => Promise.resolve([{ id: 1, email: "das", password: "asdd" } as User])
        service.signup('asda@asd.com', "asd").then(() => {
        }).catch(e => {
            done();
        })
    })
    it('throws error if signin is called with unused email', (done) => {
        service.signin("sada@adl.com", "asdasd").then().catch(() => {
            done();
        })
    })
    it('thows if an invalid password is provided', (done) => {
        fakeUsersService.find = () => Promise.resolve([{ id: 1, email: "das", password: "asdd" } as User])
        service.signin("asd", "#23232").then().catch(() => {
            done();
        })
    })

    it('returns a user if correct password in provided', async () => {
        await service.signup('asdf@asdf.com', 'mypassword')
        const user = await service.signin("asdf@asdf.com", "mypassword")
        expect(user).toBeDefined();
    })

    // it('returns a user if correct password in provided', async () => {
    //     fakeUsersService.find = () => Promise.resolve([{ id: 1, email: "das", password: "1b4b040bfa2de2e0.96831c40bcc0fc5687bcb94c7a02230759f608cfb5c20c1b173cd1da24ab8aab" } as User])
    //     const user = await service.signin("asd", "mypassword")
    //     expect(user).toBeDefined();
    // })


})
