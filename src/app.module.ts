import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MatchModule } from './match/match.module';
import { News } from './news/entities/news.entity';
import { Match } from './match/entities/match.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [UserEntity, News, Match],
      synchronize: true,
    }),
    // Configuration globale pour les variables d'environnement
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    NewsModule,
    AuthModule,
    MatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
