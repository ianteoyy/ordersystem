import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  orderedBy: { type: String, required: true }, // should change to userId if i ever make a user schema
  orderStatus: {
    type: String,
    enum: ['created', 'confirmed', 'delivered', 'cancelled'],
    required: true,
  },
  productCode: String,
  price: Number,
});

export type OrderStatusType =
  | 'created'
  | 'confirmed'
  | 'delivered'
  | 'cancelled';

export interface Order extends mongoose.Document {
  id: string;
  orderedBy: string; // string for now instead of user id
  orderStatus: OrderStatusType;
  productCode: string; // array of product names for now instead of product ids
  price: number;
}
