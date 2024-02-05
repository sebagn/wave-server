export class Etapa {
  id: number;
  pacienteId: number;
  numeroEtapa: number;
  diagnostico: string;
  planTratamiento: string;
  fotos: string[];
  rx: string[];
  escaneos: string[];
  alineadoresSup: number;
  alineadoresInf: number;
  ipr: string[];
  attach: string[];
  video: string;
}
