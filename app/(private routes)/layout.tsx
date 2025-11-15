// app/(private routes)/layout.tsx

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub - Profile',
};

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
