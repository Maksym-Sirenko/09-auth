// lib/constants.ts

export const ALL_NOTES = 'all';

export const TAGS = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
] as const;

export type NoteTag = (typeof TAGS)[number];

export const VERSEL_URL = 'https://09-auth-mu-ashen.vercel.app/';

export const IMAGE_URL =
  'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const PER_PAGE = 12;
