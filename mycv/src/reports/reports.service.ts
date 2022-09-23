import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDTO } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {

    }
    logger() {
        console.log("this is a logger ok ")
    }
    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto)
        report.user = user;
        return this.repo.save(report)
    }
    async changeApproval(id: number, approvalStatus: boolean) {
        const report = await this.repo.findOne({ where: { id: id } });
        if (!report) {
            throw new NotFoundException('Report Not Found')
        }
        report.approved = approvalStatus;
        return this.repo.save(report);

    }

    createEstimate({ make, model, lng, lat, year, milage }: GetEstimateDTO) {
        return this.repo.createQueryBuilder()
            .select('*')
            // .where('make= :make', { make })
            .andWhere('model= :model', { model })
            .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
            .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
            .andWhere('year - :year BETWEEN -3 AND 3', { year })
            .orderBy('ABS(milage - :milage)', 'DESC')
            .setParameters({ milage })
            .limit(3)
            .getRawMany()
    }
}
