import { PrismaClient } from "@prisma/client";

const g = globalThis as unknown as { __portfolioPrisma?: PrismaClient };

export const db =
  g.__portfolioPrisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") g.__portfolioPrisma = db;
