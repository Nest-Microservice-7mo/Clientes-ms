import { IsString } from "class-validator";

export class CreateClienteDto {
    @IsString()
    public nombreCliente: string;

    @IsString()
    public apellidoCliente: string;

    @IsString()
    public passwordCliente: string;

    @IsString()
    public telefonoCliente: string;

    @IsString()
    public correoCliente: string;
}
