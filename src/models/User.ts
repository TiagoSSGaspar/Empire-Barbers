import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity()
export default class User {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column() 
  name: string;

  @Column('time with time zone')
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date  
  
}