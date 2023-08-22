import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePokemonDto } from './dtos/create-pokemon.dto';
import { EditTodoDto } from './dtos/edit-pokemon.dto';
import { PokemonsService } from './pokemons.service';

@ApiTags('Pokemons')
@Controller('pokemons')
export class PokemonsController {
  constructor(private pokemonsService: PokemonsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAll(@Request() req) {
    return await this.pokemonsService.findAll(req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async login(@Request() req, @Body() createTodoDto: CreatePokemonDto) {
    const newTodo = {
      ...createTodoDto,
      completed: false,
      userId: req.user.id,
    };
    return await this.pokemonsService.create(newTodo);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Request() req, @Body() editTodoDto: EditTodoDto) {
    const { id } = req.params;
    const { userId } = req.user;
    const updatedTodo = {
      ...editTodoDto,
      userId,
    };
    return await this.pokemonsService.update(id, userId, updatedTodo);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Request() req) {
    const { id } = req.params;
    return await this.pokemonsService.delete(id, req.user.id);
  }
}
