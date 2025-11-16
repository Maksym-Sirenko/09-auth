// lib/utils/normalizeUser.ts
import type { User } from '@/types/user';

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function toUser(obj: Record<string, unknown>): User | null {
  const email = typeof obj.email === 'string' ? obj.email : undefined;
  const username = typeof obj.username === 'string' ? obj.username : undefined;
  const avatar = typeof obj.avatar === 'string' ? obj.avatar : undefined;

  if (!email || !username) return null;
  return { email, username, avatar };
}

/**
 * Normalize various server response shapes into a User.
 * Accepts:
 * - { user: { ... } }
 * - { data: { ... } }
 * - { email, username, avatar }
 * Throws if cannot extract a valid User.
 */
export function normalizeUserResponse(resData: unknown): User {
  if (!resData) throw new Error('Empty response');

  if (isObject(resData)) {
    // case: { user: { ... } }
    if (isObject(resData.user)) {
      const maybe = toUser(resData.user as Record<string, unknown>);
      if (maybe) return maybe;
    }

    // case: { data: { ... } }
    if (isObject(resData.data)) {
      const maybe = toUser(resData.data as Record<string, unknown>);
      if (maybe) return maybe;
    }

    // case: direct object { email, username, avatar }
    const maybe = toUser(resData as Record<string, unknown>);
    if (maybe) return maybe;
  }

  throw new Error('Could not normalize user response');
}
