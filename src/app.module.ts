import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MongooseModule.forRoot(
    //   'mongodb://localhost:27017',
    //   // `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@127.0.0.1:27017/${process.env.MONGO_DB}`,
    // ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
