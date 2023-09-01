import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Role extends CoreEntity {
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
