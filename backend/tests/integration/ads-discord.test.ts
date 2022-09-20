import request from "supertest";
import { Ad, Game } from "@prisma/client";

import app from "../../src/app";

import { createAds } from "../utils/create-ads";
import { clearDatabase } from "../utils/clear-database";

let ads = [] as Ad[];

describe("Ad discord tests", () => {
  beforeAll(async () => {
    ({ ads } = await createAds());
  });

  afterAll(async () => await clearDatabase());

  it("should return an empty list when passing an invalid adId", async () => {
    const response = await request(app).get("/ads/invalid-ad-id/discord");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ NotFoundError: "No Ad found" });
  });

  it("should return a discord name and tag", async () => {
    const response = await request(app).get(`/ads/${ads[0].id}/discord`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        discord: expect.any(String),
      })
    );
  });
});
