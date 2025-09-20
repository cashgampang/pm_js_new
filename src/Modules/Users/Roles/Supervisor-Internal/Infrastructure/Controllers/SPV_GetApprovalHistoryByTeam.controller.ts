// import { Controller, Get, Req } from '@nestjs/common';
// import { Request } from 'express';
// import { Public } from 'src/Shared/Modules/Authentication/public.decorator';
// import { SPV_GetApprovalHistoryByTeamsUseCase } from 'src/use-case/Supervisor-Internal/SPV_GetApprovalHistoryByTeam.usecase';

// @Controller('supervisor/int/loan-application')
// export class SPV_ApprovalHistoryByTeamsController {
//   constructor(
//     private readonly getApprovalHistoryByTeam: SPV_GetApprovalHistoryByTeamsUseCase,
//   ) {}

//   @Public() //TODO: Remove this decorator in production
//   @Get('teams/history')
//   async getByTeams(@Req() req: Request) {
//     try {
//       console.log('Cookies:', req.cookies);
//       const spv_id = Number(req.cookies['spv_id']);
//       console.log('cookieSPV: ', spv_id);
//       return await this.getApprovalHistoryByTeam.execute(spv_id);
//     } catch (error) {
//         console.log(error)
//     }
//   }
// }
