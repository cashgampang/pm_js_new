// import { Injectable, NotFoundException } from '@nestjs/common';
// import { DataSource } from 'typeorm';
// import { ClientInternal } from 'src/Modules/LoanAppInternal/Infrastructure/Entities/client-internal.orm-entity';

// @Injectable()
// export class SPV_GetLoanApplicationByTeamsUseCase {
//   constructor(private readonly dataSource: DataSource) {}

//   async execute(spv_id: number) {
//     const customerRepo = this.dataSource.getRepository(ClientInternal);

//     const customers = await customerRepo
//       .createQueryBuilder('client')
//       .leftJoinAndSelect('client.marketing', 'marketing')
//       .leftJoinAndSelect('client.applicationInfoInternal', 'loan')
//       .where('marketing.spv_id = :spv_id', { spv_id })
//       .andWhere('loan.status = :status', { status: 'pending' })
//       .getMany();

//     if (!customers.length) {
//       throw new NotFoundException('Tidak ada data pengajuan untuk tim ini');
//     }

//     // mapping hanya field yg diperlukan
//     return customers.map((c) => ({
//       id: c.id,
//       nama: c.nama_lengkap,
//       marketing: {
//         id: c.marketing.id,
//         name: c.marketing.nama,
//       },
//       // tambahin field lain sesuai LoanApplicationData
//     }));
//   }
// }
