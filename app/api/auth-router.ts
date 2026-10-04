
import * as cookie from "cookie";
import * as bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { Session } from "@contracts/constants";
import { getSessionCookieOptions } from "./lib/cookies";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { findUserByEmail, upsertUser } from "./queries/users";
import { signSessionToken } from "./kimi/session";


function setSessionCookie(
  ctx: { req: { headers: Headers }; resHeaders: Headers },
  token: string,
) {
  const opts = getSessionCookieOptions(ctx.req.headers);

  ctx.resHeaders.append(
    "set-cookie",
    cookie.serialize(Session.cookieName, token, {
      httpOnly: opts.httpOnly,
      path: opts.path,
      sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
      secure: opts.secure,
      maxAge: Math.floor(Session.maxAgeMs / 1000),
    }),
  );
}

const emailSchema = z.string().trim().email().max(320);

export const authRouter = createRouter({
  me: authedQuery.query(({ ctx }) => {
    // Never return password hashes to the browser.
    const { passwordHash: _passwordHash, ...safeUser } = ctx.user;
    return safeUser;
  }),

  register: publicQuery
    .input(
      z.object({
        name: z.string().trim().min(2).max(255),
        email: emailSchema,
        password: z.string().min(8).max(72),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const email = input.email.toLowerCase();
      const existing = await findUserByEmail(email);

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "An account with this email already exists.",
        });
      }

      const passwordHash = await bcrypt.hash(input.password, 12);
      const unionId = `local_${randomUUID()}`;

      await upsertUser({
        unionId,
        name: input.name,
        email,
        passwordHash,
      });

      const token = await signSessionToken({
        unionId,
        clientId: "local",
      });

      setSessionCookie(ctx, token);

      return { success: true };
    }),

  login: publicQuery
    .input(
      z.object({
        email: emailSchema,
        password: z.string().min(1).max(72),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await findUserByEmail(input.email.toLowerCase());

      // Use the same message for unknown emails and incorrect passwords.
      if (
        !user ||
        !user.passwordHash ||
        !(await bcrypt.compare(input.password, user.passwordHash))
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password.",
        });
      }

      const token = await signSessionToken({
        unionId: user.unionId,
        clientId: "local",
      });

      setSessionCookie(ctx, token);

      return { success: true };
    }),

  logout: authedQuery.mutation(async ({ ctx }) => {
    const opts = getSessionCookieOptions(ctx.req.headers);

    ctx.resHeaders.append(
      "set-cookie",
      cookie.serialize(Session.cookieName, "", {
        httpOnly: opts.httpOnly,
        path: opts.path,
        sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
        secure: opts.secure,
        maxAge: 0,
      }),
    );

    return { success: true };
  }),
});