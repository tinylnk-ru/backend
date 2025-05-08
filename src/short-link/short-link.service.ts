import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortLink } from './short-link.entity';
import { DeleteResult, Like, Repository } from 'typeorm';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { nanoid } from 'nanoid';
import { SearchShortLinkDto } from './dto/search-short-link.dto';

@Injectable()
export class ShortLinkService {
    private readonly SHORT_CODE_SIZE: number = 6;

    constructor(
        @InjectRepository(ShortLink)
        private readonly shortLinkRepository: Repository<ShortLink>,
    ) {}

    async getShortLinkByCode(shortCode: string): Promise<ShortLink | null> {
        return this.shortLinkRepository.findOne({ where: { shortCode } });
    }

    async searchShortLinks(
        searchParams: SearchShortLinkDto,
    ): Promise<ShortLink[]> {
        const {
            id,
            shortCode,
            originalUrl,
            limit = 10,
            offset = 0,
        } = searchParams;

        const searchConditions: any = {};

        if (id !== undefined) {
            searchConditions.id = id;
        }
        if (shortCode) {
            searchConditions.shortCode = shortCode;
        }
        if (originalUrl) {
            searchConditions.originalUrl = Like(`%${originalUrl}%`);
        }

        const [data] = await this.shortLinkRepository.findAndCount({
            where: searchConditions,
            take: limit,
            skip: offset,
            order: { createdAt: 'DESC' },
        });

        return data;
    }
    async createShortLink(
        createShortLinkDto: CreateShortLinkDto,
    ): Promise<ShortLink> {
        const shortCode = nanoid(this.SHORT_CODE_SIZE);

        const newShortLink = this.shortLinkRepository.create({
            originalUrl: createShortLinkDto.originalUrl,
            shortCode,
        });

        return this.shortLinkRepository.save(newShortLink);
    }
    async deleteShortLink(shortLinkId: number): Promise<DeleteResult> {
        const deleteResult = await this.shortLinkRepository.delete(shortLinkId);

        if (deleteResult.affected === 0) {
            throw new BadRequestException(
                `ShortLink not found by id ${shortLinkId}`,
            );
        }

        return deleteResult;
    }
}
