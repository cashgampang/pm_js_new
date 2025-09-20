// import { Injectable, NotFoundException } from '@nestjs/common';
// import { DataSource } from 'typeorm';
// import { User } from 'src/Modules/Users/Domain/Entities/user.entity';

// @Injectable()
// export class SPV_GetTeamsUseCase {
//   constructor(private readonly dataSource: DataSource) {}

//   async execute(spv_id: number) {
//     const teamRepo = this.dataSource.getRepository(User);

//     const teams = await teamRepo.find({
//       where: {
//         spv: { id: spv_id }, // cukup id, karena relasi ManyToOne
//       },
//       select: ['id', 'nama', 'email', 'usertype', 'is_active'], // ambil field yg diperlukan aja
//     });

//     if (!teams.length) {
//       throw new NotFoundException('Tidak ada data tim di bawah supervisor ini');
//     }

//     return {
//       teams: teams.map((team) => ({
//         id: team.id,
//         name: team.nama,
//         email: team.email,
//         role: team.usertype,
//         status_akun: team.is_active === 1 ? 'AKTIF' : 'TIDAK AKTIF',
//       })),
//     };
//   }
// }
