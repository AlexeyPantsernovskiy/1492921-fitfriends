import { TrainingOrder } from './training-order.interface';
import { Training } from './training.interface';

export type TrainingOrderWithTraining = TrainingOrder & { training?: Training };
