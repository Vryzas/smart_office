import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClickModule } from './click/click.module';
import { ProducerModule } from './producer/producer.module';
import { ConsumerModule } from './consumer.module.ts/consumer.module';

@Module({
  imports: [
    AuthModule,
    ClickModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      // address should contain the mongo database container name for the network to identify it
      'mongodb://mongoadmin:pass@localhost:27017?authsource=admin',
      // `mongodb://mongoadmin:pass@mongodb:27017?authsource=admin`,
    ),
    ProducerModule,
    ConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
