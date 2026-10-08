// src/services/cookies.ts

export function getCookie(
  name: string,
): string | null {
  const prefix = `${encodeURIComponent(name)}=`;

  const cookie = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) =>
      item.startsWith(prefix),
    );

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(
    cookie.slice(prefix.length),
  );
}