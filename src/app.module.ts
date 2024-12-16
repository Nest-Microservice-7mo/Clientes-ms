import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [ClientesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
