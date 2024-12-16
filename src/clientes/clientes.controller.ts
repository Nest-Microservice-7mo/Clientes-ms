import { Controller, ParseIntPipe } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  //@Post()
  @MessagePattern({cmd: 'create_cliente'})
  create(@Payload() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  //@Get()
  @MessagePattern({cmd: 'find_all_clientes'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.clientesService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({cmd: 'find_one_cliente'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.clientesService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({cmd: 'update_cliente'})
  update(@Payload() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(updateClienteDto.id, updateClienteDto);
  }

  //@Delete(':id')
  @MessagePattern({cmd: 'delete_cliente'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.clientesService.remove(id);
  }
}
