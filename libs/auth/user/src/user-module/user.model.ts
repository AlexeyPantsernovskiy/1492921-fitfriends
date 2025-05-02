import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import {
  SEX,
  Sex,
  UserRole,
  DURATIONS,
  LEVELS,
  SPECIALIZATIONS,
  Duration,
  Specialization,
  Level,
  UserAuthBase,
} from '@project/shared-core';

@Schema({ _id: false, discriminatorKey: 'kind' })
export class BaseQuestionnaireSchema {
  @Prop({
    type: [String],
    enum: SPECIALIZATIONS,
    required: true,
  })
  specialization: Specialization[];

  @Prop({ type: String, enum: LEVELS, required: true })
  level: Level;

  @Prop({
    type: Boolean,
    default: false,
    required: true,
  })
  isReadyToTrain: boolean;
}

Schema({ _id: false });
export class UserQuestionnaireSchema extends BaseQuestionnaireSchema {
  @Prop({ type: String, enum: DURATIONS, required: true })
  duration: Duration;

  @Prop({ type: Number, required: true })
  caloriesLose: number;

  @Prop({ type: Number, required: true })
  caloriesWaste: number;
}

@Schema({ _id: false })
export class CoachQuestionnaireSchema extends BaseQuestionnaireSchema {
  @Prop({
    type: String,
    required: true,
  })
  certificates: string[];

  @Prop({
    type: String,
    required: false,
  })
  achievements?: string;
}

@Schema({
  collection: 'users',
  timestamps: { createdAt: 'registerDate', updatedAt: false },
})
export class UserModel extends Document implements UserAuthBase {
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

  @Prop({
    type: SchemaTypes.Mixed,
    required: false,
    validate: {
      validator: function (value) {
        if (!value) return true;

        // Получаем роль из разных возможных мест
        let role = this.role;
        if (!role && this._update?.$set?.role) {
          role = this._update.$set.role;
        }
        if (!role && this.getUpdate?.()?.$set?.role) {
          role = this.getUpdate().$set.role;
        }
        if (role === UserRole.Sportsman) {
          return (
            value.duration &&
            value.caloriesLose !== undefined &&
            value.caloriesWaste !== undefined
          );
        }
        if (role === UserRole.Coach) {
          return value.certificates;
        }
        return false;
      },
      message: 'Опросник не соответствует роли пользователя',
    },
  })
  public questionnaire?: UserQuestionnaireSchema | CoachQuestionnaireSchema;

  @Prop({
    required: true,
  })
  public passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
