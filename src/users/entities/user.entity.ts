import { CoreEntity } from 'src/common/entities/core.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity()
export class User extends CoreEntity {

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
