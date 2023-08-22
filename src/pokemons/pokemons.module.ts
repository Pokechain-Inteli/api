import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [PokemonsService, PokemonsService],
  controllers: [PokemonsController],
  imports: [PrismaModule, AuthModule],
})
export class PokemonsModule {}
