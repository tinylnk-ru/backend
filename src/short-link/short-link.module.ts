import { Module } from '@nestjs/common';
import { ShortLinkController } from './short-link.controller';
import { ShortLinkService } from './short-link.service';
import { ShortLink } from './short-link.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([ShortLink])],
    controllers: [ShortLinkController],
    providers: [ShortLinkService],
    exports: [ShortLinkService],
})
export class ShortLinkModule {}
