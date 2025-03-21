import { Level } from './level.enum';
import { Specialization } from './specialization.enum';
import { Time } from './time.enum';
export interface Questionnaire {
  specialization: Specialization[];
  time: Time;
  level: Level;
  caloriesLose: number;
  caloriesWaste: number;
  isReadyToTrain: boolean;
}
