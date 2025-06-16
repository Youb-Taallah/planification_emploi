import { Seance, TDConcernes, TPConcernes } from "./entities";

export type SeanceWithTds = {
  seance: Seance;
  tds: TDConcernes[];
  tps: TPConcernes[];
};


