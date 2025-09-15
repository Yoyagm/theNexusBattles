import { MissionWithAvailability } from "../domain/Mission";
import { MissionsRepo } from "../repo/MissionsRepo";
import { HeroStatusRepo, HeroEstado } from "../repo/HeroStatusRepo";

export interface ListMissionsParams {
  heroId: string;
  nivel?: number;
  dificultad?: string;
  tipo?: string;
}

interface MissionListResponse {
  items: MissionWithAvailability[];
  total: number;
}

export class MissionsService {
  constructor(
    private missionsRepo: MissionsRepo,
    private heroStatusRepo: HeroStatusRepo
  ) {}

  list(params: ListMissionsParams): MissionListResponse {
    const { heroId, nivel, dificultad, tipo } = params;
    const missions = this.missionsRepo.list({ dificultad, tipo });
    const estadoHeroe = this.heroStatusRepo.getEstado(heroId);

    const items = missions.map((mission) => {
      let disponible = true;
      let motivo: string | undefined;

      if (
        process.env.MISSIONS_EXCLUSIVE === "true" &&
        this.missionsRepo.isLocked(mission.id)
      ) {
        disponible = false;
        motivo = "Misión ocupada";
      } else if (estadoHeroe === "EN_MISION" || estadoHeroe === "EN_BATALLA") {
        disponible = false;
        motivo = "Héroe ocupado";
      } else if (nivel !== undefined) {
        const reqNivel = mission.requisitos?.minNivel ?? mission.nivelRecomendado.min;
        if (nivel < reqNivel) {
          disponible = false;
          motivo = `Nivel insuficiente (req ≥${reqNivel})`;
        }
      }

      return {
        ...mission,
        disponible,
        ...(motivo ? { motivo } : {}),
      };
    });

    return { items, total: items.length };
  }
}
