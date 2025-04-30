import { IsUrl } from 'class-validator';

export class CreateShortLinkDto {
  @IsUrl({}, { message: 'originalUrl must be a valid URL' })
  originalUrl: string
}