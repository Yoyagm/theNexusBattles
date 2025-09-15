import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupRoomSocket } from "./infra/ws/RoomSocket";
import { roomRouter } from "./infra/http/RoomController";
import cors from "cors";
import { createMissionsRouter } from "./modules/missions/routes/missions.routes";
import { MissionsRepo } from "./modules/missions/repo/MissionsRepo";
import { HeroStatusRepo } from "./modules/missions/repo/HeroStatusRepo";

const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: ["http://localhost:4200", "http://207.248.81.78:4200"],
  methods: ["GET", "POST"],
  credentials: true
}));

const io = new Server(httpServer, {
    cors: {
    origin: ["http://localhost:4200", "http://207.248.81.78:4200"],
    methods: ["GET", "POST"],
    credentials: false
  }
});

setupRoomSocket(io);

app.use(express.json());
const missionsRepo = new MissionsRepo();
const heroStatusRepo = new HeroStatusRepo();
app.use("/api", roomRouter);
app.use("/api", createMissionsRouter(missionsRepo, heroStatusRepo));

const PORT = 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

