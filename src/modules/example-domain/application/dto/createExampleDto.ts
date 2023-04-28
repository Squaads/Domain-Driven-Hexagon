import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, Max, Min } from '@nestjs/class-validator';
import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GraphQLString } from 'graphql';

@InputType()
export class CreateExampleDto {
    @Field()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @Field()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    location: string;

    @Field()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @Field(() => Int)
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(5)
    stars: number;

    @Field(() => GraphQLISODateTime)
    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @Field(() => GraphQLISODateTime)
    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @Field(() => [GraphQLString])
    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    projectImages: string[];

    @Field()
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    minimumInvest: number;

    @Field(() => Int)
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    projectCost: number;

    @Field(() => Int)
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    totalInvest: number;

    @Field()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    operator: string;

    @Field()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    company: string;

    @Field()
    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isPublished: boolean;
}
