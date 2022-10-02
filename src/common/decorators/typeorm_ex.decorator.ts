import { SetMetadata } from '@nestjs/common';

import { TYPEORM_EX_CUSTOM_REPOSITORY } from '../consts/typeorm-ex-custom-repository.const';

export function CustomRepository<Entity>(entity: Entity): ClassDecorator {
  return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);
}
