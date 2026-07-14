export const recentInquiryCookieName = "recent-inquiry";

const maxCookieValueLength = 3500;

export type RecentInquiry = {
  id: string;
  name: string;
  subject: string;
  message: string;
  status: "received";
  createdAt: string;
  messageTruncated: boolean;
};

type NewRecentInquiry = Omit<RecentInquiry, "messageTruncated">;

function encode(value: RecentInquiry) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  let binary = "";

  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }

  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

export function encodeRecentInquiry(value: NewRecentInquiry) {
  let message = value.message;
  let messageTruncated = false;

  while (true) {
    const encoded = encode({ ...value, message, messageTruncated });

    if (encoded.length <= maxCookieValueLength) {
      return encoded;
    }

    const nextLength = Math.max(0, message.length - Math.max(1, Math.ceil(message.length / 10)));
    message = message.slice(0, nextLength);
    messageTruncated = true;
  }
}

export function decodeRecentInquiry(value: string | undefined): RecentInquiry | undefined {
  if (!value) {
    return undefined;
  }

  try {
    const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("id" in parsed) ||
      typeof parsed.id !== "string" ||
      !("name" in parsed) ||
      typeof parsed.name !== "string" ||
      !("subject" in parsed) ||
      typeof parsed.subject !== "string" ||
      !("message" in parsed) ||
      typeof parsed.message !== "string" ||
      !("status" in parsed) ||
      parsed.status !== "received" ||
      !("createdAt" in parsed) ||
      typeof parsed.createdAt !== "string" ||
      Number.isNaN(Date.parse(parsed.createdAt)) ||
      !("messageTruncated" in parsed) ||
      typeof parsed.messageTruncated !== "boolean"
    ) {
      return undefined;
    }

    return parsed as RecentInquiry;
  } catch {
    return undefined;
  }
}
