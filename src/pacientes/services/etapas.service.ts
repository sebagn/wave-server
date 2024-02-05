import { Injectable } from '@nestjs/common';
import { Etapa } from '../entities/etapa.entity';
import { CreateEtapaDTO, UpdateEtapaDTO } from '../../dtos/etapa.dtos';

@Injectable()
export class EtapasService {
  private counterId = 1;
  private etapas: Etapa[] = [
    {
      id: 1,
      pacienteId: 1,
      numeroEtapa: 1,
      diagnostico: 'Primera etapa del tratamiento',
      planTratamiento: '1 mes',
      fotos: ['url1', 'url2'],
      rx: ['url1', 'url2'],
      escaneos: ['url1', 'url2'],
      alineadoresSup: 10,
      alineadoresInf: 8,
      ipr: ['url1', 'url2'],
      attach: ['url1'],
    },
    {
      id: 2,
      pacienteId: 1,
      numeroEtapa: 1,
      diagnostico: 'Segunda etapa del tratamiento',
      planTratamiento: '2 meses',
      fotos: ['url1', 'url2'],
      rx: ['url1', 'url2'],
      escaneos: ['url1', 'url2'],
      alineadoresSup: 10,
      alineadoresInf: 8,
      ipr: ['url1', 'url2'],
      attach: ['url1'],
    },
    {
      id: 3,
      pacienteId: 1,
      numeroEtapa: 3,
      diagnostico: 'Tercera etapa del tratamiento',
      planTratamiento: '3 meses',
      fotos: ['url1', 'url2'],
      rx: ['url1', 'url2'],
      escaneos: ['url1', 'url2'],
      alineadoresSup: 10,
      alineadoresInf: 8,
      ipr: ['url1', 'url2'],
      attach: ['url1'],
    },
  ];

  public getEtapas() {
    return this.etapas;
  }

  public getEtapaById(id: number) {
    const etapa = this.etapas.find((etapa) => etapa.id === id);
    return etapa;
  }

  public addEtapa(etapa: CreateEtapaDTO) {
    this.counterId = this.counterId + 1;
    const newEtapa = {
      id: this.counterId,
      ...etapa,
    };
    this.etapas.push(newEtapa);

    return etapa;
  }

  public updateEtapa(id: number, updatedEtapa: UpdateEtapaDTO) {
    const etapaIndex = this.etapas.findIndex((etapa) => etapa.id === id);
    this.etapas[etapaIndex] = {
      ...this.etapas[etapaIndex],
      ...updatedEtapa,
    };
    return updatedEtapa;
  }

  public deleteEtapa(id: number) {
    const etapaIndex = this.etapas.findIndex((etapa) => etapa.id === id);
    this.etapas.splice(etapaIndex, 1);
    return true;
  }
}
