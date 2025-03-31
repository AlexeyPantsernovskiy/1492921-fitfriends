import { MongoEntity, PgEntity } from '@project/shared-core';

export interface Repository<T extends MongoEntity | PgEntity> {
  findById(id: T['id']): Promise<T | null>;
  save(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  deleteById(id: T['id']): Promise<void>;
}
