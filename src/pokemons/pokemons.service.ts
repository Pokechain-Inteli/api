import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PokemonsService {
  constructor(private prismaService: PrismaService) {}
  async findAll(userId) {
    return this.prismaService.pokemon.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${data.name}`,
    );

    if (response.ok) {
      const { name, sprites, types } = await response.json();
      let type = '';
      for (let temp_type of types) {
        type = `${type} ${temp_type.name}`;
      }
      const pokemon = {
        name,
        image: sprites.front_default,
        level: 1,
        type,
        userId: data.userId,
      };
      return this.prismaService.pokemon.create({ data: pokemon });
    }
  }

  async update(id, userId, data) {
    return this.prismaService.pokemon.update({ where: { id }, data });
  }

  async delete(id, userId) {
    return this.prismaService.pokemon.delete({ where: { id } });
  }
}
