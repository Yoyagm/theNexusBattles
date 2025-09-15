export type HeroEstado = "LIBRE" | "EN_MISION" | "EN_BATALLA";

/**
 * Repositorio simple para el estado de los héroes.
 */
export class HeroStatusRepo {
  private estados = new Map<string, HeroEstado>();

  setEstado(heroId: string, estado: HeroEstado): void {
    this.estados.set(heroId, estado);
  }

  getEstado(heroId: string): HeroEstado {
    return this.estados.get(heroId) ?? "LIBRE";
  }
}
