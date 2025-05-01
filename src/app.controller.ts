import { Controller, Get, NotFoundException, Param, Redirect } from '@nestjs/common';
import { ShortLinkService } from './short-link/short-link.service';

@Controller()
export class AppController {
  constructor(private readonly shortLinkService: ShortLinkService) {}

  @Get('l/:shortCode')
  @Redirect()
  async redirectFromShortLing(@Param('shortCode') shortCode: string) {
    const shortLink = await this.shortLinkService.getShortLinkByCode(shortCode);

    if (!shortLink) {
      throw new NotFoundException('Short link not found');
    }

    return { url: shortLink?.originalUrl }
  }
}
