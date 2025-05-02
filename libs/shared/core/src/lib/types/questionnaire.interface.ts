import { Level } from './level.enum';
import { Specialization } from './specialization.enum';
import { Duration } from './duration.enum';
export interface BaseQuestionnaire {
  specialization: Specialization[];
  level: Level;
  isReadyToTrain: boolean;
}
export interface UserQuestionnaire extends BaseQuestionnaire {
  duration: Duration;
  caloriesLose: number;
  caloriesWaste: number;
}

export interface CoachQuestionnaire extends BaseQuestionnaire {
  certificates: string[];
  achievements?: string;
}

export type Questionnaire = UserQuestionnaire | CoachQuestionnaire;
