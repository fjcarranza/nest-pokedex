import { IsPositive, Min, MinLength, IsString, IsInt, IsOptional } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsPositive()
    offset?: number;
}