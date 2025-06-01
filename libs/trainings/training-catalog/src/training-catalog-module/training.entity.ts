import {
  Duration,
  Level,
  PgEntity,
  Sex,
  Specialization,
  StorableEntity,
  Training,
} from '@project/shared-core';

export class TrainingEntity
  extends PgEntity
  implements StorableEntity<Training>
{
  public name: string;
  public image: string;
  public level: Level;
  public specialization: Specialization;
  public duration: Duration;
  public price: number;
  public calories: number;
  public description: string;
  public sex: Sex;
  public video: string;
  public rating: number;
  public coachId: string;
  public isSpecialOffer: boolean;
  public createDate: Date;

  constructor(training?: Training) {
    super();
    this.populate(training);
  }

  public populate(training?: Training): void {
    if (!training) {
      return;
    }

    this.id = training.id;
    this.name = training.name;
    this.image = training.image;
    this.level = training.level;
    this.specialization = training.specialization;
    this.duration = training.duration;
    this.price = training.price;
    this.calories = training.calories;
    this.description = training.description;
    this.sex = training.sex;
    this.video = training.video;
    this.rating = training.rating;
    this.coachId = training.coachId;
    this.isSpecialOffer = training.isSpecialOffer;
    this.createDate = training.createDate ?? new Date();
  }

  toPOJO(): Training {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
      level: this.level,
      specialization: this.specialization,
      duration: this.duration,
      price: this.price,
      calories: this.calories,
      description: this.description,
      sex: this.sex,
      video: this.video,
      rating: this.rating,
      coachId: this.coachId,
      isSpecialOffer: this.isSpecialOffer,
      createDate: this.createDate,
    };
  }
}
