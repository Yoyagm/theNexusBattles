import { MissionsRepo } from "../../../src/modules/missions/repo/MissionsRepo";
import { HeroStatusRepo } from "../../../src/modules/missions/repo/HeroStatusRepo";
import { MissionsService } from "../../../src/modules/missions/service/MissionsService";

describe("MissionsService", () => {
  it("combina filtros y marca disponibilidad", () => {
    const repo = new MissionsRepo();
    const heroRepo = new HeroStatusRepo();
    const service = new MissionsService(repo, heroRepo);

    const result = service.list({ heroId: "H1", nivel: 3, dificultad: "Media" });

    expect(result.items).toHaveLength(2);
    const unavailable = result.items.find((m) => m.id === "M-017");
    expect(unavailable?.disponible).toBe(false);
    expect(unavailable?.motivo).toBe("Nivel insuficiente (req ≥5)");
  });

  it("filtro por tipo reduce resultados", () => {
    const repo = new MissionsRepo();
    const heroRepo = new HeroStatusRepo();
    const service = new MissionsService(repo, heroRepo);

    const result = service.list({ heroId: "H1", nivel: 3, dificultad: "Media", tipo: "Historia" });
    expect(result.items).toHaveLength(1);
    expect(result.items[0].tipo).toBe("Historia");
  });

  it("héroe ocupado bloquea todas las misiones", () => {
    const repo = new MissionsRepo();
    const heroRepo = new HeroStatusRepo();
    heroRepo.setEstado("H1", "EN_MISION");
    const service = new MissionsService(repo, heroRepo);

    const result = service.list({ heroId: "H1", nivel: 3 });
    result.items.forEach((m) => {
      expect(m.disponible).toBe(false);
      expect(m.motivo).toBe("Héroe ocupado");
    });
  });
});
