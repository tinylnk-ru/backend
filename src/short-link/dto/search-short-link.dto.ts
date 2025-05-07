import {
    IsInt,
    IsOptional,
    IsString,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SearchShortLinkDto {
    @ApiProperty({
        description: 'Identifier of the short link',
        example: 1,
        required: false,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id?: number;

    @ApiProperty({
        description: 'Short link code',
        example: 'abc123',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(6)
    @MinLength(6)
    shortCode?: string;

    @ApiProperty({
        description: 'Original URL associated with the short link',
        example: 'https://example.com',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(1024)
    originalUrl?: string;

    @ApiProperty({
        description: 'Number of records to return',
        example: 10,
        required: false,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;

    @ApiProperty({
        description: 'Offset for pagination',
        example: 0,
        required: false,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    offset?: number;
}