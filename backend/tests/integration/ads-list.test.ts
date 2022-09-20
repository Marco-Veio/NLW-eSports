import request from "supertest";
import { Game } from "@prisma/client";

import app from "../../src/app";

import { createAds } from "../utils/create-ads";
import { clearDatabase } from "../utils/clear-database";

let games = [] as Game[];

describe("Ads list tests", () => {
  beforeAll(async () => {
    ({ games } = await createAds());
  });

  afterAll(async () => await clearDatabase());

  it("should return an empty list when passing an invalid gameId", async () => {
    const response = await request(app).get("/games/invalid-game-id/ads");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return an empty list when there's no ad to the selected game", async () => {
    const response = await request(app).get(`/games/${games[2].id}/ads`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return a list of ads", async () => {
    const response = await request(app).get(`/games/${games[0].id}/ads`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          yearsPlaying: expect.any(Number),
          weekDays: expect.arrayContaining([expect.any(String)]),
          hoursStart: expect.any(String),
          hoursEnd: expect.any(String),
          useVoiceChannel: expect.any(Boolean),
        }),
      ])
    );
  });
});
