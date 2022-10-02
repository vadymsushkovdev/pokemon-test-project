import { Column, Entity, Index } from 'typeorm';

import { IdTimestampEntity } from '../../common/entities/id-timestamp.entity';
import { PokemonType } from '../enums/pokemon-type.enum';

@Entity()
@Index([
  'name',
  'pokedexNumber',
  'imgName',
  'generation',
  'familyId',
  'legendary',
])
export class PokemonEntity extends IdTimestampEntity {
  @Column({ name: 'name', type: 'varchar', unique: true })
  name: string;

  @Column({ name: 'pokedex_number', type: 'int' })
  pokedexNumber: number;

  @Column({ name: 'img_name', type: 'varchar' })
  imgName: string;

  @Column({ name: 'generation', type: 'int' })
  generation: number;

  @Column({ name: 'evolution_stage', type: 'varchar', nullable: true })
  evolutionStage: string;

  @Column({ name: 'evolved', type: 'boolean' })
  evolved: boolean;

  @Column({ name: 'family_id', type: 'int', nullable: true })
  familyId: number;

  @Column({ name: 'cross_gen', type: 'boolean' })
  crossGen: boolean;

  @Column({ name: 'type_1', type: 'enum', enum: PokemonType })
  type1: PokemonType;

  @Column({ name: 'type_2', type: 'enum', enum: PokemonType, nullable: true })
  type2?: PokemonType;

  @Column({ name: 'weather_1', type: 'varchar' })
  weather1: string;

  @Column({ name: 'weather_2', type: 'varchar', nullable: true })
  weather2?: string;

  @Column({ name: 'stat_total', type: 'int' })
  statTotal: number;

  @Column({ name: 'atk', type: 'int' })
  atk: number;

  @Column({ name: 'def', type: 'int' })
  def: number;

  @Column({ name: 'sta', type: 'int' })
  sta: number;

  @Column({ name: 'legendary', type: 'int' })
  legendary: number;

  @Column({ name: 'acquirable', type: 'boolean' })
  acquirable: boolean;

  @Column({ name: 'spawns', type: 'boolean' })
  spawns: boolean;

  @Column({ name: 'regional', type: 'boolean' })
  regional: boolean;

  @Column({ name: 'raidable', type: 'int' })
  raidable: number;

  @Column({ name: 'hatchable', type: 'int' })
  hatchable: number;

  @Column({ name: 'shiny', type: 'int' })
  shiny: number;

  @Column({ name: 'nest', type: 'boolean' })
  nest: boolean;

  @Column({ name: 'new', type: 'boolean' })
  new: boolean;

  @Column({ name: 'not_gettable', type: 'boolean' })
  notGettable: boolean;

  @Column({ name: 'future_evolve', type: 'boolean' })
  futureEvolve: boolean;

  @Column({ name: 'full_cp_40', type: 'int' })
  fullCP40: number;

  @Column({ name: 'full_cp_39', type: 'int' })
  fullCP39: number;
}
