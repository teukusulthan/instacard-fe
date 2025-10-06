import type { Metadata } from "next";

import { ReduxProvider } from "@/providers/ReduxProvider";

export const metadata: Metadata = {
  title: "Instacard",
  description: "Manage your links easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
