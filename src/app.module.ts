import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ModuleLoanApplicationInternal } from './Modules/LoanAppInternal/ModuleLoanApplicationInternal.module';
import { ModuleLoanApplicationExternal } from './Modules/LoanAppExternal/ModuleLoanApplicationExternal.module';
import { UsersModule } from './Modules/Users/ModuleUsers.module';
import { AuthModule } from './Shared/Modules/Authentication/ModuleAuth.module';
import { ModuleDrafts } from './Shared/Modules/Drafts/ModuleDrafts.module';
import { ModuleNotifications } from './Shared/Modules/Notifications/ModuleNotification.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketingInternalUseCaseModule } from './Modules/Users/Roles/Marketing-Internal/marketing-internal.module';
import { PersistenceLoanAppModule } from './Modules/LoanAppInternal/PersistenceLoanAppModule.module';

@Module({
  imports: [
    //? --- MySQL Connection ---
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: process.env.DB_DEV || 'pengajuan_marketing_new',
      autoLoadEntities: true,
      synchronize: true,
      // logging: true, // ini buat lihat query yg dijalankan
    }),

    //? --- MongoDB Connection ---
    MongooseModule.forRoot('mongodb://localhost:27017/pm_js', {
      connectionName: 'mongoConnection', // kasih nama juga
    }),

    //? --- Static Files ---
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // path fisik folder
      serveRoot: '/uploads', // URL prefix
    }),
    ModuleLoanApplicationInternal,
    ModuleLoanApplicationExternal,
    UsersModule,
    AuthModule,
    ModuleDrafts,
    ModuleNotifications,
    
    MarketingInternalUseCaseModule,
    PersistenceLoanAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
