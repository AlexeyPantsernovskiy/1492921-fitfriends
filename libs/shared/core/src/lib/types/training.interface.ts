import { Duration } from './duration.enum';
import { Level } from './level.enum';
import { Sex } from './sex.enum';
import { Specialization } from './specialization.enum';

export interface Training {
  id: number;
  name: string;
  image: string;
  level: Level;
  specialization: Specialization;
  duration: Duration;
  price: number;
  calories: number;
  description: string;
  sex: Sex;
  video: string;
  rating: number;
  coachId: string;
  isSpecialOffer: boolean;
  createDate?: Date;
}
