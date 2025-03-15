import { Level } from './level.enum';
import { Specialisation } from './specialisation.enum';
import { Time } from './time.enum';
export interface Questionnaire {
  specialisation: Specialisation[];
  time: Time;
  level: Level;
  caloriesLose: number;
  caloriesWaste: number;
  isReadyToTrain: boolean;
}
