import { Request, Response } from "express";
import { MissionsService } from "../service/MissionsService";

export class MissionsController {
  constructor(private service: MissionsService) {}

  list = (req: Request, res: Response): void => {
    const heroId = req.query.heroId as string;
    const nivel = req.query.nivel ? Number(req.query.nivel) : undefined;
    const dificultad = req.query.dificultad as string | undefined;
    const tipo = req.query.tipo as string | undefined;

    const result = this.service.list({ heroId, nivel, dificultad, tipo });
    res.json(result);
  };
}
