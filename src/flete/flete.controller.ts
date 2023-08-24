import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FleteDto } from './dto/flete.dto';
import { FleteService } from './flete.service';

@Controller('flete')
export class FleteController {
  constructor(private readonly fleteService: FleteService) {}
  @Get(':access_key')
  obtenerServiciosPorEmpresa(@Param('access_key') access_key: string) {
    return this.fleteService.obtenerFletesDeEmpresaPorAccKey(access_key);
  }
  @Post()
  createFlete(@Body() fleteDto: FleteDto) {
    console.log(fleteDto);
    return this.fleteService.solicitarFlete(fleteDto);
  }
}
