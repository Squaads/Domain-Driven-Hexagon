import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, Max, Min } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class Create<%= classify(name) %>Dto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(5)
    stars: number;

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    projectImages: string[];

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    minimumInvest: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    projectCost: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    totalInvest: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    operator: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    company: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isPublished: boolean;
}
