import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createGames() {
  const games = [
    {
      title: "League of Legends",
      bannerUrl:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lq1.jpg",
    },
    {
      title: "Counter-Strike: Global Offensive",
      bannerUrl:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lq1.jpg",
    },
    {
      title: "Dota 2",
      bannerUrl:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lq1.jpg",
    },
    {
      title: "Apex Legends",
      bannerUrl:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lq1.jpg",
    },
    {
      title: "Call of Duty: Warzone",
      bannerUrl:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lq1.jpg",
    },
    {
      title: "Valorant",
      bannerUrl:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lq1.jpg",
    },
    {
      title: "Rainbow Six: Siege",
      bannerUrl:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lq1.jpg",
    },
    {
      title: "Fortnite",
      bannerUrl:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lq1.jpg",
    },
    {
      title: "Overwatch",
      bannerUrl:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lq1.jpg",
    },
    {
      title: "Minecraft",
      bannerUrl:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lq1.jpg",
    },
    {
      title: "Grand Theft Auto V",
      bannerUrl:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lq1.jpg",
    },
    {
      title: "World of Warcraft",
      bannerUrl:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lq1.jpg",
    },
  ];

  return Promise.all(
    games.map((game) => prisma.game.create({ data: { ...game } }))
  );
}
