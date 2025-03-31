import { Level } from './level.enum';
import { Specialization } from './specialization.enum';
import { Duration } from './duration.enum';
export interface Questionnaire {
  specialization: Specialization[];
  duration: Duration;
  level: Level;
  caloriesLose: number;
  caloriesWaste: number;
  isReadyToTrain: boolean;
}
