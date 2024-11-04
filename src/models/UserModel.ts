import {
  Entity,
  Column,
  ManyToMany,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { Gender } from "@/dtos";
import { Role } from "./RoleModel";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  /*
  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.MALE,
  })
*/

  @Column()
  gender: string;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column({
    unique: true,
  })
  contact: string;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @CreateDateColumn({ type: "datetime" })
  public created_at: Date;
}
