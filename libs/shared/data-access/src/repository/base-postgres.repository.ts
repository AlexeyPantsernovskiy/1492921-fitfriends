import { PrismaClientService } from '@project/training-models';
import { PgEntity, StorableEntity, EntityFactory } from '@project/shared-core';

import { Repository } from './repository.interface';

export abstract class BasePostgresRepository<
  T extends PgEntity & StorableEntity<ReturnType<T['toPOJO']>>,
  DocumentType = ReturnType<T['toPOJO']>,
> implements Repository<T>
{
  constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly client: PrismaClientService
  ) {}

  protected createEntityFromDocument(document: DocumentType): T | null {
    if (!document) {
      return null;
    }

    return this.entityFactory.create(document as ReturnType<T['toPOJO']>);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async findById(id: T['id']): Promise<T> {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async save(entity: T): Promise<T> {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async update(entity: T): Promise<T> {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async deleteById(id: T['id']): Promise<void> {
    throw new Error('Not implemented');
  }
}
