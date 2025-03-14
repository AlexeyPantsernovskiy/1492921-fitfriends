import { compare, genSalt, hash } from 'bcrypt';

import { Entity, Questionnaire, Sex, UserRole } from '@project/shared-core';
import { StorableEntity, UserAuth } from '@project/shared-core';

import { SALT_ROUNDS } from './user.constant';

export class UserEntity extends Entity implements StorableEntity<UserAuth> {
  public email: string;
  public name: string;
  public avatar?: string;
  public sex: Sex;
  public birthDate?: Date;
  public description?: string;
  public location: string;
  public photo1: string;
  public photo2: string;
  public registerDate?: Date;
  public role: UserRole;
  public questionnaire?: Questionnaire;
  public passwordHash: string;

  constructor(user?: UserAuth) {
    super();
    this.populate(user);
  }

  public populate(user?: UserAuth): void {
    if (!user) {
      return;
    }
    this.id = user.id ?? '';
    this.email = user.email;
    this.name = user.name;
    this.avatar = user.avatar;
    this.sex = user.sex;
    this.birthDate = user.birthDate;
    this.description = user.description;
    this.location = user.location;
    this.photo1 = user.photo1;
    this.photo2 = user.photo2;
    this.registerDate = user.registerDate;
    this.role = user.role;
    this.questionnaire = user.questionnaire;
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): UserAuth {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      sex: this.sex,
      birthDate: this.birthDate,
      description: this.description,
      location: this.location,
      photo1: this.photo1,
      photo2: this.photo2,
      registerDate: this.registerDate,
      role: this.role,
      questionnaire: this.questionnaire,
      passwordHash: this.passwordHash,
    };
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
