import { HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ClientesService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Cliente Service')

  onModuleInit() {
    this.$connect();
    this.logger.log('Base de Datos Conectada');
  }

  create(createClienteDto: CreateClienteDto) {
    return this.cliente.create({
      data: createClienteDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.cliente.count({where:{estado:true}});
    const lastPage = Math.ceil(totalPages / limit);

    if(page > lastPage) {
      return {
        message: `La página ${page} no existe`,
        meta: {
          total: totalPages,
          page: page,
          lastPage: lastPage
        }
      }
    }

    return {
      data: await this.cliente.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {estado: true}
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      }
    }
  }

  async findOne(id: number) {
    const cliente = await this.cliente.findFirst({where:{id, estado:true}})
    if(!cliente) {
      throw new RpcException({
        message: `Cliente con ID #${id} no encontrado`,
        status: HttpStatus.BAD_REQUEST
      });
    }
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    await this.findOne(id);
    const { id:__, ...data } = updateClienteDto;
    const cliente = await this.cliente.update({
      where:{id},
      data: data
    });
    return cliente;
  }

  async remove(id: number) {
    await this.findOne(id);
    const cliente = await this.cliente.update({
      where: {id},
      data: {estado:false}
    });
    return cliente;
  }
}
