import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    price: number
    @Column()
    make: string;
    @Column({ default: false })
    approved: boolean;
    @Column()
    model: string;
    @Column()
    year: number;
    @Column()
    lng: number
    @Column()
    lat: number
    @Column()
    milage: number
    @ManyToOne(() => User, (user) => {
        user.reports
    })
    user: User;
}