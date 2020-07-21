import * as mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
  paymentStatus: {
    type: String,
    enum: ['pending', 'success', 'failed'],
  },
  amount: Number,
});

export type PaymentStatusType = 'success' | 'failed';

export interface Payment extends mongoose.Document {
  id: string;
  paymentStatus: PaymentStatusType;
  amount: number;
}
