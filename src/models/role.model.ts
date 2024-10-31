
import { 
  Entity, 
  Column,
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  JoinTable, 
  ManyToMany 
} from 'typeorm';
import { User } from "./user.model";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  scope: string;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable()
  users: User[];  


  @CreateDateColumn({ type: "datetime" })
  public created_at: Date;

  @UpdateDateColumn({ type: "datetime" })
  public updated_at: Date;
}
