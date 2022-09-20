import request from "supertest";
import { Game } from "@prisma/client";

import app from "../../src/app";

import { createGames } from "../utils/create-games";
import { clearDatabase } from "../utils/clear-database";

let games = [] as Game[];

describe("Ads creation tests", () => {
  beforeEach(async () => {
    games = await createGames();
  });

  afterAll(async () => await clearDatabase());

  it("should create an ad", async () => {
    const response = await request(app)
      .post(`/games/${games[0].id}/ads`)
      .send({
        name: "John Doe",
        yearsPlaying: 3,
        discord: "JohnDoe#1234",
        weekDays: [0, 1],
        hoursStart: "10:00",
        hoursEnd: "12:00",
        useVoiceChannel: true,
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: "John Doe",
        yearsPlaying: 3,
        discord: "JohnDoe#1234",
        weekDays: "0,1",
        hoursStart: 600,
        hoursEnd: 720,
        useVoiceChannel: true,
      })
    );
  });

  it("should not create an ad with invalid week days", async () => {
    const response = await request(app)
      .post(`/games/${games[0].id}/ads`)
      .send({
        name: "John Doe",
        yearsPlaying: 3,
        discord: "JohnDoe#1234",
        weekDays: [0, 1, 7],
        hoursStart: "10:00",
        hoursEnd: "12:00",
        useVoiceChannel: true,
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Invalid week days",
      })
    );
  });

  it("should not create an ad with invalid hours", async () => {
    const response = await request(app)
      .post(`/games/${games[0].id}/ads`)
      .send({
        name: "John Doe",
        yearsPlaying: 3,
        discord: "JohnDoe#1234",
        weekDays: [0, 1],
        hoursStart: "10:00",
        hoursEnd: "09:00",
        useVoiceChannel: true,
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Invalid hours",
      })
    );
  });

  it("should not create an ad with invalid game id", async () => {
    const response = await request(app)
      .post(`/games/invalid-game-id/ads`)
      .send({
        name: "John Doe",
        yearsPlaying: 3,
        discord: "JohnDoe#1234",
        weekDays: [0, 1],
        hoursStart: "09:00",
        hoursEnd: "10:00",
        useVoiceChannel: true,
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "P2003",
      })
    );
  });

  it("should not create an ad with a parameter missing", async () => {
    const response = await request(app)
      .post(`/games/${games[0].id}/ads`)
      .send({
        name: "John Doe",
        yearsPlaying: 3,
        discord: "JohnDoe#1234",
        weekDays: [0, 1],
        hoursStart: "09:00",
        hoursEnd: "10:00",
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Missing required fields",
      })
    );
  });
});
