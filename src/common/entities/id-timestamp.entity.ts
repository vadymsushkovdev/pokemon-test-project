import { PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from './timestamp.entity';

export class IdTimestampEntity extends TimestampEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;
}
