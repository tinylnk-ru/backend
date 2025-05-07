import { IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShortLinkDto {
  @ApiProperty({
    description: 'Long url to be shortened',
    example: 'https://example.com',
  })
  @IsUrl({}, { message: 'originalUrl must be a valid URL' })
  originalUrl: string
}