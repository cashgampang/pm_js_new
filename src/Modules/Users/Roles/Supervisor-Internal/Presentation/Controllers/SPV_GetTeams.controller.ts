// import { Controller, Get, Req } from '@nestjs/common';
// import { Request } from 'express';
// import { Public } from 'src/Shared/Modules/Authentication/public.decorator';
// import { SPV_GetTeamsUseCase } from 'src/use-case/Supervisor-Internal/SPV_GetTeams.usecase';

// @Controller('supervisor/int')
// export class SPV_GetTeamsController {
//   constructor(
//     private readonly getTeams: SPV_GetTeamsUseCase,
//   ) {}

//   @Public() //TODO: Remove this decorator in production
//   @Get('teams')
//   async getByTeams(@Req() req: Request) {
//     try {
//       console.log('Cookies:', req.cookies);
//       const spv_id = Number(req.cookies['spv_id']);
//       console.log('cookieSPV: ', spv_id);
//       return await this.getTeams.execute(spv_id);
//     } catch (error) {
//         console.log(error)
//     }
//   }
// }
