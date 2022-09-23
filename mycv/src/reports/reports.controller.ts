import { Controller, Post, Body, UseGuards, Patch, Param, Get, Query } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/gurads/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApprovedReportDTO } from './dtos/approved-report.dto';
import { AdminGuard } from 'src/gurads/admin.guard';
import { GetEstimateDTO } from './dtos/get-estimate.dto';


@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService) {
    }
    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }
    @Patch("/:id")
    @UseGuards(AdminGuard)
    approveReport(@Param("id") id: string, @Body() body: ApprovedReportDTO) {
        return this.reportService.changeApproval(parseInt(id), body.approved)
    }
    @Get()
    getEstimate(@Query() query: GetEstimateDTO) {
        return this.reportService.createEstimate(query)

    }
}
