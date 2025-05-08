import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('short_links')
export class ShortLink {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    shortCode: string;

    @Column()
    originalUrl: string;

    @CreateDateColumn()
    createdAt: Date;
}
