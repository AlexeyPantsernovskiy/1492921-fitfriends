import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { BaseMongoRepository } from '@project/data-access';

import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(
    entityFactory: UserFactory,
    @InjectModel(UserModel.name) userModel: Model<UserModel>
  ) {
    super(entityFactory, userModel);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    if (!email) {
      return null;
    }
    const document = await this.model
      .findOne({ email: { $regex: new RegExp(email, 'i') } })
      .exec();
    return this.createEntityFromDocument(document);
  }
}
