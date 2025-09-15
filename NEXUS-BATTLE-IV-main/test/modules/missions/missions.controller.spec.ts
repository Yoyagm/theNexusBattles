import request from "supertest";
import express from "express";
import { createMissionsRouter } from "../../../src/modules/missions/routes/missions.routes";
import { MissionsRepo } from "../../../src/modules/missions/repo/MissionsRepo";
import { HeroStatusRepo } from "../../../src/modules/missions/repo/HeroStatusRepo";

describe("MissionsController", () => {
  it("responde listado con filtros", async () => {
    const app = express();
    const missionsRepo = new MissionsRepo();
    const heroRepo = new HeroStatusRepo();
    app.use("/api", createMissionsRouter(missionsRepo, heroRepo));

    const res = await request(app)
      .get("/api/missions")
      .query({ heroId: "H1", nivel: 3, dificultad: "Media" });

    expect(res.status).toBe(200);
    expect(res.body.total).toBe(2);
    const unavailable = res.body.items.find((m: any) => m.id === "M-017");
    expect(unavailable.disponible).toBe(false);
    expect(unavailable.motivo).toBe("Nivel insuficiente (req ≥5)");
  });
});
