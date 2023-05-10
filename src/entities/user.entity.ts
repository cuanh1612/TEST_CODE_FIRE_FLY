import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: "first_name" })
  firstname: string;

  @Column({ name: "last_name" })
  lastname: string;

  @Column()
  age: number;

  @Column()
  coordinate: string;
}
