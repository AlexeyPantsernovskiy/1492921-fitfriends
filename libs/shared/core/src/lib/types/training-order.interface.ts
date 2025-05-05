import { OrderType } from './order-type.enum';
import { PaymentType } from './payment-type.enum';

export interface TrainingOrder {
  id: number;
  type: OrderType;
  trainingId: number;
  userId: string;
  price: number;
  quantity: number;
  amount: number;
  paymentType: PaymentType;
  isStarted: boolean;
  doneCount: number;
  isDone: boolean;
  createDate: Date;
}
