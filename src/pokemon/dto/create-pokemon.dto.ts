import { IsPositive, Min, MinLength, IsString, IsInt } from "class-validator";

export class CreatePokemonDto {
    //isInt, isPositive, min 1
    @IsInt()
    @IsPositive()
    @Min(1)
    
    no: number;

    //isString, Minlenth 1
    @MinLength(1)
    @IsString()
    name:string;

}
