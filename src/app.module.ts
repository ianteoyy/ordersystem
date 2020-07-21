import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    OrdersModule,
    PaymentsModule,
    MongooseModule.forRoot(
      `mongodb+srv://test2:${process.env.MONGODB_PASSWORD}@orders.dxs0h.mongodb.net/order-system?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
