import { Mission } from "../domain/Mission";
import missionsSeed from "../seeds/missions.seed.json" assert { type: "json" };

export interface MissionFilters {
  dificultad?: string;
  tipo?: string;
}

/**
 * Repositorio en memoria de misiones, pensado para extraerse a microservicio.
 */
export class MissionsRepo {
  private missions: Mission[] = missionsSeed as Mission[];
  private locked: Set<string> = new Set();

  list(filters: MissionFilters = {}): Mission[] {
    return this.missions.filter((m) => {
      if (filters.dificultad && m.dificultad !== filters.dificultad) return false;
      if (filters.tipo && m.tipo !== filters.tipo) return false;
      return true;
    });
  }

  isLocked(id: string): boolean {
    return this.locked.has(id);
  }

  lock(id: string): void {
    this.locked.add(id);
  }

  unlock(id: string): void {
    this.locked.delete(id);
  }
}
