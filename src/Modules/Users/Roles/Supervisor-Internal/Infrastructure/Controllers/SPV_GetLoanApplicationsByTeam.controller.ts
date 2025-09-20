// import { Controller, Get, Req } from '@nestjs/common';
// import { Request } from 'express';
// import { Public } from 'src/Shared/Modules/Authentication/public.decorator';
// import { SPV_GetLoanApplicationByTeamsUseCase } from 'src/use-case/Supervisor-Internal/SPV_GetLoanApplicationsByTeam.usecase';

// @Controller('supervisor/int/loan-application')
// export class SPV_GetLoanApplicationByTeamsController {
//   constructor(
//     private readonly getLoanAppByTeam: SPV_GetLoanApplicationByTeamsUseCase,
//   ) {}

//   @Public() //TODO: Remove this decorator in production
//   @Get('teams')
//   async getByTeams(@Req() req: Request) {
//     try {
//       console.log('Cookies:', req.cookies);
//       const spv_id = Number(req.cookies['spv_id']);
//       console.log('cookieSPV: ', spv_id);
//       return await this.getLoanAppByTeam.execute(spv_id);
//     } catch (error) {
//         console.log(error)
//     }
//   }
// }
