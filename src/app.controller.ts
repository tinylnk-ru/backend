import {
    Controller,
    Get,
    Inject,
    Logger,
    NotFoundException,
    Param,
    Redirect,
} from '@nestjs/common';
import { ShortLinkService } from './short-link/short-link.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
    private readonly logger = new Logger(AppController.name);

    constructor(
        private readonly shortLinkService: ShortLinkService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    @Get('l/:shortCode')
    @Redirect()
    async redirectFromShortLing(@Param('shortCode') shortCode: string) {
        const cacheKey = `l:${shortCode}`;
        this.logger.log(`Checking cache for key: ${cacheKey}`);

        const cachedUrl = await this.cacheManager.get(cacheKey);

        if (cachedUrl) {
            this.logger.log(`Cache hit for key: ${cacheKey}`);
            return { url: cachedUrl };
        }

        this.logger.log(
            `Cache miss for key: ${cacheKey}. Fetching from database.`,
        );
        const shortLink =
            await this.shortLinkService.getShortLinkByCode(shortCode);

        if (!shortLink) {
            this.logger.warn(`Short link not found for code: ${shortCode}`);
            throw new NotFoundException('Short link not found');
        }

        await this.cacheManager.set(cacheKey, shortLink.originalUrl);
        this.logger.log(`Cache updated for key: ${cacheKey}`);

        return { url: shortLink?.originalUrl };
    }
}
