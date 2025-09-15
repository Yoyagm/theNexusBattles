import { MissionDifficulty, MissionType } from "./MissionType";

/**
 * Representa una misión disponible en el tablón.
 * Objetivo, jefe final y experiencia base conforme a la sección 1.1.6 "Cómo se juega".
 * La probabilidad de Máster se basa en la Tabla 9 de épicas.
 */
export interface Mission {
  id: string;
  nombre: string;
  nivelRecomendado: { min: number; max: number };
  dificultad: MissionDifficulty;
  tipo: string; // ver EPCC sobre valores canónicos
  xpBase: number; // referencia 1.1.6 para XP
  objetivo: string; // 1.1.6 Objetivo de misión
  jefeFinal: string; // 1.1.6 Jefe final
  probMaestro?: number; // Tabla 9 Probabilidad de Máster en una misión
  requisitos?: { minNivel?: number; claseRequerida?: string };
}

export interface MissionWithAvailability extends Mission {
  disponible: boolean;
  motivo?: string;
}
