import {
  Controller,
  Patch,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MKT_UpdateLoanApplicationUseCase } from '../../Applications/Services/MKT_UpdateLoanApplication.usecase';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/Shared/Modules/Authentication/Infrastructure/Decorators/user.decorator';
import { Public } from 'src/Shared/Modules/Authentication/Infrastructure/Decorators/public.decorator';

@Controller('mkt/int/loan-apps')
export class MKT_UpdateLoanApplicationController {
  constructor(
    private readonly updateLoanApplication: MKT_UpdateLoanApplicationUseCase,
  ) {}
  @Patch('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'foto_ktp', maxCount: 1 },
      { name: 'foto_kk', maxCount: 1 },
      { name: 'foto_id_card_penjamin', maxCount: 1 },
      { name: 'foto_ktp_penjamin', maxCount: 1 },
      { name: 'foto_id_card', maxCount: 1 },
      { name: 'bukti_absensi', maxCount: 1 },
      { name: 'foto_rekening', maxCount: 1 },
    ]),
  )
  async update(
    @Param('id') clientId: number,
    @CurrentUser('id') marketingId: number,
    @Body() dto: any,
    @UploadedFiles()
    files: {
      foto_ktp?: Express.Multer.File[];
      foto_kk?: Express.Multer.File[];
      foto_id_card_penjamin?: Express.Multer.File[];
      foto_ktp_penjamin?: Express.Multer.File[];
      foto_id_card?: Express.Multer.File[];
      bukti_absensi?: Express.Multer.File[];
      foto_rekening?: Express.Multer.File[];
    },
  ) {
    console.log('Request body:', dto);
    console.log('Uploaded files:', files);
    console.log('Client ID:', clientId);

    try {
      // parse payload kalau masih string
      const payload =
        typeof dto.payload === 'string' ? JSON.parse(dto.payload) : dto.payload;

      return await this.updateLoanApplication.execute(
        payload,
        files,
        clientId, // untuk update
      );
    } catch (error) {
      console.log('Error occurred:', error);

      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid request data or files');
      } else {
        throw new InternalServerErrorException(
          'An error occurred while processing your request',
        );
      }
    }
  }
}
