import {
    Default,
    Format,
    Required
  } from "@tsed/schema";
  import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
  
    @Entity()
  export class MyTodoList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Required()
    name: string;

    @Column({ nullable: true, default: null})
    checked: string;

    @Column()
    @Format("date-time")
    @Default(Date.now)
    dateCreation: Date = new Date()
  }