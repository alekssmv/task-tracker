import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configDb from './config/config.db';
import { User } from './users/user.entity';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configDb().host,
      port: configDb().port,
      username: configDb().username,
      password: configDb().password,
      database: configDb().database,
      entities: [User, Task],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: RolesGuard
  }],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
