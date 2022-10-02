import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class TimestampEntity {
  @UpdateDateColumn()
  public updated: Date;

  @CreateDateColumn()
  public created: Date;
}
