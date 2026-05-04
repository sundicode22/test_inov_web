import "server-only";

import { API_BASE_URL } from "@/lib/api-client";
import type { UserMe } from "@/types/api";

export async function fetchUserMe(
  accessToken: string,
): Promise<UserMe | null> {
  try {
    const res = await fetch(`${API_BASE_URL}user/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as UserMe;
  } catch {
    return null;
  }
}
