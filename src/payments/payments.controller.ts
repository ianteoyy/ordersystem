import { Controller, Post, Body, Get, Patch } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './payments.model';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  async getAllPayments(): Promise<Payment[]> {
    const payments = await this.paymentsService.getPayments();
    return payments;
  }

  @Post()
  async newPayment(@Body('amount') amount: number): Promise<{ id: string }> {
    const generatedId = await this.paymentsService.insertPayment(amount);
    return { id: generatedId };
  }

  @Patch('confirm')
  async confirmPayment(@Body('paymentId') paymentId: string): Promise<{ paymentResult: string }> {
    const paymentResult = await this.paymentsService.verifyPayment(paymentId);
    return { paymentResult: paymentResult };
  }
}
