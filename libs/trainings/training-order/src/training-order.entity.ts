import {
  TrainingOrder,
  OrderType,
  PaymentType,
  PgEntity,
  StorableEntity,
} from '@project/shared-core';

export class TrainingOrderEntity
  extends PgEntity
  implements StorableEntity<TrainingOrder>
{
  public type: OrderType;
  public trainingId: number;
  public userId: string;
  public price: number;
  public quantity: number;
  public amount: number;
  public paymentType: PaymentType;
  public isStarted: boolean;
  public doneCount: number;
  public isDone: boolean;
  public createDate: Date;

  constructor(order?: TrainingOrder) {
    super();
    this.populate(order);
  }

  public populate(order?: TrainingOrder): void {
    if (!order) {
      return;
    }

    this.id = order.id ?? undefined;
    this.type = order.type;
    this.trainingId = order.trainingId;
    this.userId = order.userId;
    this.price = order.price;
    this.quantity = order.quantity;
    this.amount = order.amount;
    this.paymentType = order.paymentType;
    this.isStarted = order.isStarted;
    this.doneCount = order.doneCount;
    this.isDone = order.isDone;
    this.createDate = order.createDate;
  }

  public toPOJO(): TrainingOrder {
    return {
      id: this.id,
      type: this.type,
      trainingId: this.trainingId,
      userId: this.userId,
      price: this.price,
      amount: this.amount,
      quantity: this.quantity,
      paymentType: this.paymentType,
      isStarted: this.isStarted,
      doneCount: this.doneCount,
      isDone: this.isDone,
      createDate: this.createDate,
    };
  }
}
