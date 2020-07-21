import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './orders.model';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async addOrder(
    @Body('user') user: string,
    @Body('product') productCode: string,
    @Body('price') price: number,
  ): Promise<{ id: string }> {
    const generatedId = await this.ordersService.insertOrder(
      user,
      productCode,
      price,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    const orders = await this.ordersService.getOrders();
    return orders;
  }

  @Get(':id')
  async getOrder(@Param('id') orderId: string) {
    return this.ordersService.getOrderById(orderId);
  }

  @Get('status/:id')
  async getOrderStatus(@Param('id') orderId: string) {
    const { orderStatus } = await this.ordersService.getOrderById(orderId);
    return { orderStatus: orderStatus };
  }

  @Patch('cancel/:id')
  async cancelOrder(@Param('id') orderId: string): Promise<null> {
    await this.ordersService.cancelOrder(orderId);
    return null;
  }

  @Patch('complete')
  async completeOrder(
    @Body('orderId') orderId: string,
    @Body('result') result: string,
  ): Promise<void> {
    await this.ordersService.onCompletedPayment(orderId, result);
  }
}
