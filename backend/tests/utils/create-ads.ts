import { PrismaClient } from "@prisma/client";

import { createGames } from "./create-games";

const prisma = new PrismaClient();

export async function createAds() {
  const games = await createGames();

  const adsData = [
    {
      gameId: games[0].id,
      name: "John Doe",
      yearsPlaying: 3,
      discord: "JohnDoe#1234",
      weekDays: "0,1",
      hoursStart: 600,
      hoursEnd: 720,
      useVoiceChannel: true,
    },
    {
      gameId: games[0].id,
      name: "Jane Doe",
      yearsPlaying: 3,
      discord: "JaneDoe#1234",
      weekDays: "0,1",
      hoursStart: 600,
      hoursEnd: 720,
      useVoiceChannel: true,
    },
    {
      gameId: games[1].id,
      name: "John Doe",
      yearsPlaying: 3,
      discord: "JohnDoe#1234",
      weekDays: "0,1",
      hoursStart: 600,
      hoursEnd: 720,
      useVoiceChannel: true,
    },
  ];

  const ads = await Promise.all(
    adsData.map((ad) => prisma.ad.create({ data: ad }))
  );

  return { games, ads };
}
