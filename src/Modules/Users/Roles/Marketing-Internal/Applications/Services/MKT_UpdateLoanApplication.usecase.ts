// import { Injectable, NotFoundException } from '@nestjs/common';
// import { DataSource, Repository } from 'typeorm';
// import { ClientInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/client-internal.orm-entity';
// import { AddressInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/address-internal.orm-entity';
// import { FamilyInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/family-internal.orm-entity';
// import { JobInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/job-internal.orm-entity';
// import { LoanApplicationInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/loan-application-internal.orm-entity';
// import { CollateralInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/collateral-internal.orm-entity';
// import { RelativeInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/relative-internal.orm-entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { AddressInternalService } from 'src/internal/address/address.service';
// import { FamilyService } from 'src/internal/family/family.service';
// import { JobService } from 'src/internal/job/job.service';
// import { UpdateClientInternalDto } from 'src/Modules/LoanAppInternal/Application/DTOS/dto-ClientInternal/update-client-internal.dto';

// @Injectable()
// export class MKT_UpdateLoanApplicationByIdUseCase {
//   constructor(
//     @InjectRepository(ClientInternal)
//     private clientRepo: Repository<ClientInternal>,

//     private readonly addressService: AddressInternalService,
//     private readonly familyService: FamilyService,
//     private readonly jobService: JobService,
//   ) {}

//   async execute(id: number, dto: UpdateClientInternalDto) {
//     // 1. Cari client by id
//     const client = await this.clientRepo.findOne({
//       where: { id },
//       relations: [
//         'addressInternal',
//         'familyInternal',
//         'jobInternal',
//         'collateralInternal',
//         'relativeInternal',
//         'applicationInfoInternal',
//       ],
//     });

//     if (!client) {
//       throw new NotFoundException(`Client with id ${id} not found`);
//     }

//     // 2. Update data client
//     Object.assign(client, dto); // cuma yang ada di dto aja

//     await this.clientRepo.save(client);

//     // 3. Update relasi kalau ada di dto
//     if (dto.address) {
//       await this.addressService.updateByClientId(client.id, dto.address);
//     }

//     else if (dto.family) {
//       await this.familyService.updateByClientId(client.id, dto.family);
//     }

//     else if (dto.job) {
//       await this.jobService.updateByClientId(client.id, dto.job);
//     }

//     else if (dto.collateral) {
//       await this.jobService.updateByClientId(client.id, dto.collateral);
//     }

//     else if (dto.relative) {
//       await this.jobService.updateByClientId(client.id, dto.relative);
//     }
    

//     // 4. Return data yang sudah diupdate
//     return this.clientRepo.findOne({
//       where: { id: client.id },
//       relations: [
//         'addressInternal',
//         'familyInternal',
//         'jobInternal',
//         'collateralInternal',
//         'relativeInternal',
//         'applicationInfoInternal',
//       ],
//     });
//   }
// }
