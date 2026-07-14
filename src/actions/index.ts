import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { encodeRecentInquiry, recentInquiryCookieName } from "../lib/recent-inquiry";

export const server = {
  sendInquiry: defineAction({
    accept: "form",
    input: z.object({
      locale: z.enum(["en", "ja"]),
      name: z.string().trim().min(1).max(50),
      subject: z.string().trim().min(1).max(100),
      message: z.string().trim().min(1).max(1000),
    }),
    handler: async (input, context) => {
      const inquiry = {
        id: crypto.randomUUID(),
        ...input,
        createdAt: new Date(),
      };

      context.cookies.set(
        recentInquiryCookieName,
        encodeRecentInquiry({
          id: inquiry.id,
          name: inquiry.name,
          subject: inquiry.subject,
          message: inquiry.message,
          status: "received",
          createdAt: inquiry.createdAt.toISOString(),
        }),
        {
          httpOnly: true,
          sameSite: "lax",
          secure: context.url.protocol === "https:",
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        },
      );

      console.info("Inquiry received", inquiry);

      return inquiry;
    },
  }),
};
