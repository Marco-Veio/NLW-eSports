import request from "supertest";

import app from "../../src/app";

import { createGames } from "../utils/create-games";
import { clearDatabase } from "../utils/clear-database";

describe("Games list tests", () => {
  beforeAll(async () => await clearDatabase());

  afterAll(async () => await clearDatabase());

  it("should return an empty list when there's no game", async () => {
    const response = await request(app).get("/games");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return a list of games", async () => {
    await createGames();
    const response = await request(app).get("/games");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          bannerUrl: expect.any(String),
          _count: expect.objectContaining({
            ads: expect.any(Number),
          }),
        }),
      ])
    );
  });
});
