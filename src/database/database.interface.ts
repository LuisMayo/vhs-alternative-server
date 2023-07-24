import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IDatabase {
  getUserByEpicId(epicId: string, displayName: string): User;
}
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  ownId!: string;
  @Column({ nullable: false })
  epicId!: string;
  @Column({nullable: false})
  displayName!: string;
}
