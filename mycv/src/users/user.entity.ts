import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Report } from "src/reports/report.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    email: string
    @Column()
    password: string
    @OneToMany(() => Report, (report) => report.user)
    reports: Report[]

    @Column({ default: true })
    admin: boolean
    @AfterInsert()
    logInsert() {
        console.log(`Inserted user with User Id ${this.id}`);
    }
    @AfterRemove()
    logRemove() {
        console.log(`Removed user with User Id ${this.id}`);
    }
    @AfterUpdate()
    logUpdate() {
        console.log(`Updated  user with User Id ${this.id}`);
    }

}