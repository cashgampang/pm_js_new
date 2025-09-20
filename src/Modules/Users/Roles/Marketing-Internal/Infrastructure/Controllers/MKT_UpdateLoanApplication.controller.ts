//   import { Body, Controller, Patch, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
//   import { MKT_UpdateLoanApplicationByIdUseCase } from 'src/Marketing-Internal/usecases/MKT_UpdateLoanApplication.usecase';
//   import { UpdateLoanAplicationInternalDto } from 'src/internal/loan-application/dto/update-loan-application.dto';
//   import { Public } from 'src/Shared/Modules/Authentication/public.decorator';
// import { UpdateClientInternalDto } from 'src/Modules/LoanAppInternal/Application/DTOS/dto-ClientInternal/update-client-internal.dto';

// @Controller('marketing/int/loan-application')
// export class MKT_LoanApplicationController {
//   constructor(
//     private readonly updateByIdUseCase: MKT_UpdateLoanApplicationByIdUseCase,
//   ) {}

//     @Public()
//     @Patch('update/:id')
//     @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
//     async update(
//       @Param('id', ParseIntPipe) id: number,
//       @Body() body: UpdateClientInternalDto,
//     ) {
//       return await this.updateByIdUseCase.execute(id, body);
//     }
//   }

// //! BUG - GABISA PATCH UPDATE
