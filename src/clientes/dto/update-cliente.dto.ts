import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) 
{
    @IsNumber()
    @IsPositive()
    id: number;
}
