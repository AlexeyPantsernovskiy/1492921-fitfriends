import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import {
  UserAuth,
  Questionnaire,
  SEX,
  Sex,
  UserRole,
  TIMES,
  LEVELS,
  SPECIALIZATIONS,
} from '@project/shared-core';

@Schema({ _id: false })
export class QuestionnaireSchema {
  @Prop({
    type: [String],
    enum: SPECIALIZATIONS,
    required: true,
  })
  specialization: string[];

  @Prop({ type: String, enum: TIMES, required: true })
  time: string;

  @Prop({ type: String, enum: LEVELS, required: true })
  level: string;

  @Prop({ type: Number, required: true })
  caloriesLose: number;

  @Prop({ type: Number, required: true })
  caloriesWaste: number;

  @Prop({
    type: Boolean,
    default: false,
    required: true,
  })
  isReadyToTrain: boolean;
}

@Schema({
  collection: 'users',
  timestamps: { createdAt: 'registerDate', updatedAt: false },
})
export class UserModel extends Document implements UserAuth {
  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop()
  public avatar?: string;

  @Prop({
    type: String,
    enum: SEX,
    required: true,
  })
  public sex: Sex;

  @Prop()
  public birthday?: Date;

  @Prop()
  public description?: string;

  @Prop({
    required: true,
  })
  public location: string;

  @Prop()
  public photo1: string;

  @Prop()
  public photo2: string;

  @Prop()
  public registerDate?: Date;

  @Prop({
    type: String,
    enum: Object.values(UserRole),
    required: true,
  })
  public role: UserRole;

  @Prop({ type: QuestionnaireSchema })
  public questionnaire: Questionnaire;

  @Prop({
    required: true,
  })
  public passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
