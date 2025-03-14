import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import {
  UserAuth,
  Questionnaire,
  Role,
  SEX,
  Sex,
  UserRole,
} from '@project/shared-core';

@Schema({ _id: false }) // Отключаем _id для вложенной схемы
export class QuestionnaireSchema {
  @Prop({ type: [String], default: [] })
  specialisation: string[];

  @Prop({ type: String, required: true })
  time: string;

  @Prop({ type: String, required: true })
  level: string;

  @Prop({ type: Number, required: true })
  caloriesLose: number;

  @Prop({ type: Number, required: true })
  caloriesWaste: number;
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
  public birthDate?: Date;

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
    enum: Role,
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
