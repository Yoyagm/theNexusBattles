import { Router } from "express";
import { MissionsRepo } from "../repo/MissionsRepo";
import { HeroStatusRepo } from "../repo/HeroStatusRepo";
import { MissionsService } from "../service/MissionsService";
import { MissionsController } from "../controller/MissionsController";

export const createMissionsRouter = (
  missionsRepo: MissionsRepo,
  heroStatusRepo: HeroStatusRepo
) => {
  const router = Router();
  const service = new MissionsService(missionsRepo, heroStatusRepo);
  const controller = new MissionsController(service);

  router.get("/missions", controller.list);

  return router;
};
