import { MissionsRepo } from "../../../src/modules/missions/repo/MissionsRepo";
import { HeroStatusRepo } from "../../../src/modules/missions/repo/HeroStatusRepo";
import { MissionsService } from "../../../src/modules/missions/service/MissionsService";

describe("Ocupación de misiones", () => {
  it("marca misión ocupada cuando es exclusiva", () => {
    process.env.MISSIONS_EXCLUSIVE = "true";
    const repo = new MissionsRepo();
    const heroRepo = new HeroStatusRepo();
    const service = new MissionsService(repo, heroRepo);

    repo.lock("M-001");
    const result = service.list({ heroId: "H2", nivel: 3, dificultad: "Media" });
    const mission = result.items.find((m) => m.id === "M-001");
    expect(mission?.disponible).toBe(false);
    expect(mission?.motivo).toBe("Misión ocupada");
  });
});
