// import { Injectable } from '@nestjs/common';
// import { stat } from 'fs';
// import { DataSource } from 'typeorm';

// @Injectable()
// export class CA_GetAllApprovalHistoryUseCase {
//   constructor(private readonly dataSource: DataSource) {}

//   async execute(
//     page = 1,          // default page 1
//     pageSize = 10,     // default pageSize 10
//     searchQuery = '',  // optional pencarian
//   ) {
//     // Panggil stored procedure dengan parameter untuk mengambil data yang sudah dipaginasi
//     const result = await this.dataSource.query(
//       `CALL CA_GetAllApprovalHistory_Internal(?, ?);`,
//       [page, pageSize],
//     );

//     if (!result || result.length === 0) {
//       throw new Error('No data returned from stored procedure');
//     }

//     // Mapping data dari SP
//     let data =
//       result[0]?.map((item) => ({
//         nama_nasabah: item.nama_nasabah,
//         keperluan: item.keperluan,
//         nominal_pinjaman: item.nominal_pinjaman,
//         status: item.ca_status,
//         nama_marketing: item.nama_marketing,
//         nama_supervisor: item.nama_supervisor,
//       })) || [];

//     // Jika ada searchQuery, filter hasilnya
//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       data = data.filter(
//         (item) =>
//           item.nama_nasabah.toLowerCase().includes(q) ||
//           item.nama_marketing.toLowerCase().includes(q) ||
//           (item.nama_supervisor &&
//             item.nama_supervisor.toLowerCase().includes(q)),
//       );
//     }

//     // Ambil total data (tanpa pagination) → panggil SP dengan pageSize besar
//     const totalResult = await this.dataSource.query(
//       `CALL CA_GetAllApprovalHistory_Internal(?, ?);`,
//       [1, 9999999], // semua data di page 1
//     );

//     const resultData = totalResult[0] || [];
//     const total = resultData.length > 0 ? resultData.length : 0;

//     // Return hasil + pagination
//     return {
//       data,
//       total,
//       page,
//       pageSize,
//     };
//   }
// }
