import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PokemonsModule } from './pokemons/pokemons.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    PokemonsModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
