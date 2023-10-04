import { SeasonalEvents } from "./save-game";

export type ServerInfo = {
    JWT_SECRET: string;
    currentEvent: SeasonalEvents;
    version: number;
}