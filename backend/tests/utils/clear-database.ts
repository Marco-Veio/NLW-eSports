import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function clearDatabase() {
  return Promise.all([prisma.ad.deleteMany(), prisma.game.deleteMany()]).catch(
    () => {}
  );
}
