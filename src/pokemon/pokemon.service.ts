import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  private defaultLimit: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit=configService.get<number>('defaultLimit');
    console.log({default: configService.get<number>('defaultLimit')});
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1,
      })
      .select('-__v');
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    // MongoID
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // Name

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with id, name or no "${term}" not found`,
      );
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase().trim();
      try {
        await pokemon.updateOne(updatePokemonDto);
      } catch (error) {
        this.handleException(error);
      }
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } else {
      throw new NotFoundException(
        `Pokemon with id, name or no "${term}" not found`,
      );
    }
  }

  async remove(id: string) {
    //const pokemon=await this.findOne(id);
    //await pokemon.deleteOne()
    //const resultado = await this.pokemonModel.findByIdAndDelete(id); siempre me devuelve un 200 por mas que no encontro el pokemon
    //const resultado = await this.pokemonModel.deleteMany({});  ->  OJO Borra todo el contenido de la base OJO
    const resultado = await this.pokemonModel.deleteOne({ _id: id });
    if (!(resultado.deletedCount === 1)) {
      throw new BadRequestException(`Pokemon with id: "${id}" not exist`);
    }
    const mensaje = `Se Elimino el Pokemon con id: ${id}.`;
    return { Message: mensaje };
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon Exists en DB ${JSON.stringify(error.keyValue)} `,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Pokemon - Check server logs`,
    );
  }
}
