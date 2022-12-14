import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/games", async (_request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
    orderBy: {
      title: "asc",
    },
  });

  return response.json(games);
});

app.post("/games/:id/ads", async (request, response) => {
  const { id: gameId } = request.params;
  const {
    name,
    yearsPlaying,
    discord,
    weekDays,
    hoursStart,
    hoursEnd,
    useVoiceChannel,
  } = request.body;

  if (
    !name ||
    !yearsPlaying ||
    !discord ||
    !weekDays ||
    !hoursStart ||
    !hoursEnd ||
    !useVoiceChannel
  ) {
    return response.status(400).json({
      message: "Missing required fields",
    });
  }

  if (weekDays.some((day: number) => day < 0 || day > 6)) {
    return response.status(400).json({
      message: "Invalid week days",
    });
  }

  const hoursStartInMinutes = convertHourStringToMinutes(hoursStart);
  const hoursEndInMinutes = convertHourStringToMinutes(hoursEnd);

  if (hoursStartInMinutes > hoursEndInMinutes) {
    return response.status(400).json({
      message: "Invalid hours",
    });
  }

  return await prisma.ad
    .create({
      data: {
        gameId,
        name,
        yearsPlaying,
        discord,
        weekDays: weekDays.join(","),
        hoursStart: hoursStartInMinutes,
        hoursEnd: hoursEndInMinutes,
        useVoiceChannel,
      },
    })
    .then((ad) => {
      return response.status(201).json(ad);
    })
    .catch((err) => {
      return response.status(400).json({
        message: err.code,
      });
    });
});

app.get("/games/:id/ads", async (request, response) => {
  const { id: gameId } = request.params;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hoursEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response.json(
    ads.map((ad) => ({
      ...ad,
      weekDays: ad.weekDays.split(","),
      hoursStart: convertMinutesToHourString(ad.hoursStart),
      hoursEnd: convertMinutesToHourString(ad.hoursEnd),
    }))
  );
});

app.get("/ads/:id/discord", async (request, response) => {
  const { id: adId } = request.params;

  return await prisma.ad
    .findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id: adId,
      },
    })
    .then((ad) => response.json({ discord: ad.discord }))
    .catch((err) => response.status(404).json({ [err.name]: "No Ad found" }));
});

export default app;
