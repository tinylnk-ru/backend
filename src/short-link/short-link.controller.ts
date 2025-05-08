import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
} from '@nestjs/common';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { ShortLink } from './short-link.entity';
import { ShortLinkService } from './short-link.service';
import { SearchShortLinkDto } from './dto/search-short-link.dto';
import { DeleteResult } from 'typeorm';

@Controller({ path: 'short-links', version: '1' })
export class ShortLinkController {
    constructor(
        @Inject() private readonly shortLinkService: ShortLinkService,
    ) {}

    @Get()
    async getShortLinks(
        @Body() searchShortLinkDto: SearchShortLinkDto,
    ): Promise<ShortLink[]> {
        return await this.shortLinkService.searchShortLinks(searchShortLinkDto);
    }

    @Post()
    async create(
        @Body() createShortLinkDto: CreateShortLinkDto,
    ): Promise<ShortLink> {
        return await this.shortLinkService.createShortLink(createShortLinkDto);
    }

    @Delete(':id')
    async deleteShortLink(@Param('id') id: number): Promise<DeleteResult> {
        return await this.shortLinkService.deleteShortLink(id);
    }
}
