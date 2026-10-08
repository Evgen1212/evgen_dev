import { createHmac, timingSafeEqual } from "crypto";

/**
 * Простая серверная авторизация админ-панели:
 * пароль из env (ADMIN_PASSWORD) → HMAC-токен в httpOnly-cookie.
 * Пароль по умолчанию задан только для песочницы — в проде
 * обязательно задать ADMIN_PASSWORD.
 */
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "erriour2024";
const TOKEN_SALT = "erriour-admin-v1";

export const ADMIN_COOKIE = "erriour_admin";
export const COOKIE_MAX_AGE = 60 * 60 * 12; // 12 часов

export function expectedToken(): string {
  return createHmac("sha256", TOKEN_SALT).update(ADMIN_PASSWORD).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export function checkPassword(password: string): boolean {
  return safeEqual(password, ADMIN_PASSWORD);
}

export function isValidToken(token: string | undefined | null): boolean {
  if (!token) return false;
  return safeEqual(token, expectedToken());
}

/** Защита от брутфорса логина: 10 неудач за 10 минут на IP. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILS = 10;
const fails = new Map<string, number[]>();

export function loginThrottled(ip: string): boolean {
  const now = Date.now();
  const arr = (fails.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  fails.set(ip, arr);
  return arr.length >= MAX_FAILS;
}

export function registerFail(ip: string): void {
  const now = Date.now();
  const arr = (fails.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  fails.set(ip, arr);
}
