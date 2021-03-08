import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export default class Appointment {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column() 
  provider: string;

  @Column('time with time zone')
  date: Date
  
}