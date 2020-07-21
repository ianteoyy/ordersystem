import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Payment } from './payments.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel('Payment') private readonly paymentModel: Model<Payment>,
  ) {}

  async getPayments(): Promise<Payment[]> {
    const payments = await this.paymentModel.find().exec();

    return payments.map(payment => ({
      id: payment.id,
      paymentStatus: payment.paymentStatus,
      amount: payment.amount,
    })) as Payment[];
  }

  async insertPayment(amount: number): Promise<string> {
    const newPayment = new this.paymentModel({
      paymentStatus: 'pending',
      amount,
    });
    const result = await newPayment.save();
    return result.id as string;
  }

  async verifyPayment(id: string): Promise<string> {
    const updatedPayment = await this.findPayment(id);

    const result = new Promise(resolve => {
      setTimeout(() => {
        const isSuccessful = Math.random() > 0.5;
        resolve(isSuccessful);
      }, 1500);
    });

    await result.then(res => {
      if (res < 0.5) {
        updatedPayment.paymentStatus = 'failed';
      } else {
        updatedPayment.paymentStatus = 'success';
      }
      updatedPayment.save();
    });

    return updatedPayment.paymentStatus;
  }

  private async findPayment(id: string): Promise<Payment> {
    let payment;
    try {
      payment = await this.paymentModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Payment record not found!');
    }
    if (!payment) {
      throw new NotFoundException('Payment record not found!');
    }

    return payment;
  }
}
